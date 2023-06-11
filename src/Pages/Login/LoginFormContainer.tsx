import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../hooks/useAuth';
import { withLanguage } from '../../HOC/withLanguage';
import LoginForm from './LoginForm';
import { AuthContextType } from '../../context/AuthProvider';

interface LoginFormContainerProps {
  texts: {
    email: string;
    password: string;
    logIn: string;
    logInTest: string;
    forgetPassword: string;
    register: string;
  };
}

const LoginFormContainer: React.FC<LoginFormContainerProps> = ({ texts }) => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth() as AuthContextType;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}security/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('login error, correct the data');
      }
      const { token, user } = await response.json();
      const userNick = user.displayName;
      const roles = user?.roles;
      const userId = user?.id;
      setAuth({ email, password, roles, userId, userNick, token });
      Cookies.set('token', token);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm texts={texts} showPasswordReset={showPasswordReset} setShowPasswordReset={setShowPasswordReset} showRegistration={showRegistration} setShowRegistration={setShowRegistration} handleSubmit={handleSubmit} error={error} isLoading={isLoading} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />;
};

export default withLanguage(LoginFormContainer);
