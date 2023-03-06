import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import RegistrationForm from './RegistrationForm';
import PasswordResetForm from './PasswordResetForm';
import { withLanguage } from '../../components/HOC/withLanguage';
import { PulseLoader } from 'react-spinners';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = ({ texts }) => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState('username@example.com');
  const [password, setPassword] = useState('passwd');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      navigate('/homepage');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[92vh] items-center justify-center md:h-[86vh]">
      {showPasswordReset ? (
        <PasswordResetForm setShowPasswordReset={setShowPasswordReset} />
      ) : showRegistration ? (
        <RegistrationForm setShowRegistration={setShowRegistration} />
      ) : (
        <form className="w-[70vw] rounded-lg bg-gray-800 p-4 md:absolute md:w-[20vw]" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className=" relative z-0 mb-6 mt-4 w-full">
            <input name="floating_email" id="floating_email" className="peer block w-full appearance-none border-0 border-b-2 border-gray-100 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" placeholder=" " autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <label htmlFor="floating_email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
              {texts.email}
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full">
            <input type="password" name="floating_password" id="floating_password" className="peer block w-full appearance-none border-0 border-b-2 border-gray-100 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" placeholder=" " value={password} onChange={(event) => setPassword(event.target.value)} />
            <label htmlFor="floating_password" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform rounded-none text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
              {texts.password}
            </label>
          </div>
          <button className="my-2 w-full rounded-lg bg-red-700 p-2  text-white disabled:opacity-60" type="submit" disabled={!email || !password}>
            {isLoading ? <PulseLoader color="#fbffff" /> : `${texts.logIn}`}
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
