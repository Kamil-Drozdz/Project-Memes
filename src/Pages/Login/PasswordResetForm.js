import { withLanguage } from '../../components/HOC/withLanguage';

function PasswordResetForm({ texts, setShowPasswordReset }) {
  return (
    <form className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8">
      <h2 className="mb-4 text-lg font-bold text-white">{texts.remindPassword}</h2>
      <div className="relative z-0 mb-6 w-full">
        <input type="email" name="floating_email" id="floating_email" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" placeholder=" " required />
        <label htmlFor="floating_email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
          {texts.email}
        </label>
      </div>
      <button type="submit" className="mt-2 w-full rounded bg-red-700 p-2 text-white">
        {texts.sendPassword}
      </button>
      <button type="button" className="mt-2 cursor-pointer text-white" onClick={() => setShowPasswordReset(false)}>
        {texts.back}
      </button>
    </form>
  );
}

export default withLanguage(PasswordResetForm);
