import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../hooks/useAuth';
import { withLanguage } from '../../HOC/withLanguage';
import LoginForm from './LoginForm';


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
  const { setAuth } = useAuth();

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
      const lastLogin = user?.lastLogin;
      setAuth({ email, password, roles, userId, lastLogin, userNick, token });
      Cookies.set('token', token);
      navigate('/');
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm {...{ texts, showPasswordReset, setShowPasswordReset, showRegistration, setShowRegistration, handleSubmit, error, isLoading, email, setEmail, password, setPassword }} />;
};

export default withLanguage(LoginFormContainer);
