interface PasswordPanelProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  userData: {
    password: string | null;
    confirmPassword: string | null;
    currentPassword: string | null;
  };
  handleUserDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordPanel: React.FC<PasswordPanelProps> = ({ handleSubmit, userData, handleUserDataChange }) => {
  return (
    <div className="min-w-[20vw] min-h-[20vw] p-4 border-black border-[1px]  bg-gray-300 rounded-xl flex flex-col justify-center items-center shadow-md">
      <div className="w-full h-full">
        <div className="w-full mb-4">
          <p className="font-bold text-2xl">Zaktualizuj hasło</p>
          <p className="text-sm text-gray-500">dla swojego bezpieczeństwa zmień hasło co jakiś czas</p>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-start w-full flex-col space-y-4">
          <div className="flex w-full  flex-col items-start ">
            <label htmlFor="currentPassword" className="text-lg font-semibold">
              Aktualne hasło
            </label>
            <input id="currentPassword" name="currentPassword" value={userData.currentPassword || ''} onChange={handleUserDataChange} className="border-[1px] border-gray-900 p-2 rounded-md" type="text" placeholder="Twój nick" />
          </div>
          <div className="flex flex-col  items-start justify-start">
            <label htmlFor="password" className="text-lg font-semibold">
              Nowe hasło :
            </label>
            <input id="password" name="password" value={userData.password || ''} onChange={handleUserDataChange} className="border-[1px] border-gray-900 p-2 rounded-md" type="text" placeholder="Twój email" />
          </div>
          <div className="flex flex-col  items-start justify-start">
            <label htmlFor="confirmPassword" className="text-lg font-semibold">
              Potwierdz hasło:
            </label>
            <input id="confirmPassword" name="confirmPassword" value={userData.confirmPassword || ''} onChange={handleUserDataChange} className="border-[1px] border-gray-900 p-2 rounded-md" type="text" placeholder="Twój email" />
          </div>
          <button className="w-fit p-2 font-bold bg-orange-500 hover:bg-orange-400 transition-colors duration-300 ease-in-out rounded-lg" type="submit">
            Aktualizuj
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPanel;
