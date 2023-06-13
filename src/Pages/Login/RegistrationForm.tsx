import { PulseLoader } from 'react-spinners';
import { RegistrationFormProps } from './RegistrationFormContainer';
const RegistrationForm: React.FC<RegistrationFormProps> = ({ texts, handleSubmit, error, isLoading, setShowRegistration, user, setUser, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
  return (
    <form className=" w rounded-lg bg-gray-800 p-4" onSubmit={handleSubmit}>
      {error && <p className="mb-8 w-48 text-sm text-red-500 ">{error}</p>}
      <div className="relative z-0 w-full mb-6">
        <input type="text" name="floating_text" id="floating_text" className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required value={user} onChange={(event) => setUser(event.target.value)} />
        <label htmlFor="floating_text" className="peer-focus:font-medium absolute text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {texts.userNick}
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full">
        <input type="email" name="floating_email" id="floating_email" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" placeholder=" " required value={email} onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="floating_email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
          {texts.email}
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full">
        <input type="password" name="floating_password" id="floating_password" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" placeholder=" " required value={password} onChange={(event) => setPassword(event.target.value)} />
        <label htmlFor="floating_password" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
          {texts.password}
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full">
        <input type="password" name="floating_password_confirm" id="floating_password_confirm" className="peer block w-full appearance-none border-0 border-b-2 border-gray-100 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" placeholder=" " required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        <label htmlFor="floating_password_confirm" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
          {texts.confirmPassword}
        </label>
      </div>
      <button className="mx-[5%] mt-4 w-[90%] rounded-lg bg-red-600 p-2 text-white disabled:opacity-60" type="submit" disabled={!email || !password || !confirmPassword}>
        {isLoading ? <PulseLoader color="#fbffff" className="px-2" /> : `${texts.register}`}
      </button>

      <button type="button" className="mt-2 cursor-pointer text-white" onClick={() => setShowRegistration(false)}>
        {texts.back}
      </button>
    </form>
  );
};

export default RegistrationForm;
