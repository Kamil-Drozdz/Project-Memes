import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import RegistrationForm from './RegistrationForm';
import PasswordResetForm from './PasswordResetForm';
import { withLanguage } from '../../components/HOC/withLanguage';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = ({ texts }) => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState('username@example.com');
  const [password, setPassword] = useState('passwd');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}security/token`, {
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
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-[83vh] items-center justify-center">
      {showPasswordReset ? (
        <PasswordResetForm setShowPasswordReset={setShowPasswordReset} />
      ) : showRegistration ? (
        <RegistrationForm setShowRegistration={setShowRegistration} />
      ) : (
        <form className="rounded-lg bg-gray-700 p-4 md:absolute" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <label>
            <input className="mt-4 w-full max-w-[60vw]  rounded px-2 focus:border-gray-600" autoComplete="username" placeholder="Nick or Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <br />
          <label>
            <input className="mt-4 w-full  max-w-[60vw] rounded px-2" autoComplete="current-password" placeholder=" Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <br />
          <button className="mt-4 w-full  max-w-[60vw] rounded-lg bg-red-700 p-2 px-2 text-white disabled:opacity-60" type="submit" disabled={!email || !password}>
            {texts.logIn}
          </button>
          <div className="flex w-full flex-col  justify-between sm:flex-row">
            <div className="mr-8 cursor-pointer text-gray-400" onClick={() => setShowPasswordReset(true)}>
              {texts.forgetPassword}
            </div>
            <div className="cursor-pointer text-white" onClick={() => setShowRegistration(true)}>
              {texts.register}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default withLanguage(LoginForm);
