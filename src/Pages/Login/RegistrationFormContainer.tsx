import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { withLanguage } from '../../HOC/withLanguage';
import RegistrationForm from './RegistrationForm';

export interface RegistrationFormProps {
  setShowRegistration: (value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error: string;
  isLoading: boolean;
  email: string;
  setEmail: (value: string) => void;
  user: string;
  setUser: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  texts: {
    email: string;
    password: string;
    confirmPassword: string;
    back: string;
    register: string;
    userNick: string;
  };
}

const RegistrationFormContainer: React.FC<RegistrationFormProps> = ({ setShowRegistration, texts }) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!password || password.length < 8 || !/[^A-Za-z0-9]/.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one special character');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.VITE_APP_API_BASE_URL}users/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, email, password })
      });
      if (!response.ok) {
        throw new Error('Fail register try again');
      }
      const { token } = await response.json();
      Cookies.set('token', token);
      navigate('/login');
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };
  return <RegistrationForm {...{ texts, handleSubmit, error, isLoading, setShowRegistration, email, setEmail, user, setUser, password, setPassword, confirmPassword, setConfirmPassword }} />;
};

export default withLanguage(RegistrationFormContainer);
