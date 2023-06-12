import PasswordResetForm from './PasswordResetForm';
import { PulseLoader } from 'react-spinners';
import { FormEvent } from 'react';
import RegistrationFormContainer from './RegistrationFormContainer';

interface LoginFormProps {
  texts: {
    password: string;
    email: string;
    logIn: string;
    logInTest: string;
    forgetPassword: string;
    register: string;
  };
  setShowPasswordReset: (value: boolean) => void;
  setShowRegistration: (value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  password: string;
  email: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  showPasswordReset: boolean;
  error: string;
  showRegistration: boolean;
}
const LoginForm: React.FC<LoginFormProps> = ({ texts, showPasswordReset, setShowPasswordReset, showRegistration, setShowRegistration, handleSubmit, error, isLoading, email, setEmail, password, setPassword }) => {
  return (
    <div className="flex h-[92vh] items-center justify-center md:h-[86vh]">
      {showPasswordReset ? (
        <PasswordResetForm setShowPasswordReset={setShowPasswordReset} />
      ) : showRegistration ? (
        <RegistrationFormContainer setShowRegistration={setShowRegistration} />
      ) : (
        <form className="relative w-[70vw] rounded-lg bg-gray-800 p-4 md:absolute md:w-[20vw]" onSubmit={handleSubmit}>
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
          <button
            className="-right-14 my-2 w-full rounded-lg bg-orange-500 p-2 font-bold"
            onClick={() => {
              setEmail('username@example.com');
              setPassword('passwd');
            }}
          >
            {texts.logInTest}
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

export default LoginForm;
