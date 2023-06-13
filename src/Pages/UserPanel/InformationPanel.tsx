interface InformationPanelProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  userData: {
    nickname: string | null;
    email: string | null;
  };
  handleUserDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InformationPanel: React.FC<InformationPanelProps> = ({ handleSubmit, userData, handleUserDataChange }) => {
  return (
    <div className="min-w-[30vw] p-4 border-black border-[1px]  bg-gray-300 rounded-xl flex flex-col justify-start items-center shadow-md">
      <div className="w-full mb-4">
        <p className="font-bold text-2xl">Informacje</p>
        <p className="text-sm text-gray-500">sprawdz informacje które Ciebie interesują</p>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-start w-full flex-col space-y-4">
        <div className="flex w-full  flex-col items-start ">
          <label htmlFor="nickname" className="text-lg font-semibold">
            Nickname :
          </label>
          <input id="nickname" name="nickname" value={userData.nickname || ''} onChange={handleUserDataChange} className="border-[1px] border-gray-900 p-2 rounded-md" type="text" placeholder="Twój nick" />
        </div>
        <div className="flex flex-col  items-start justify-start">
          <label htmlFor="email" className="text-lg font-semibold">
            Email :
          </label>
          <input id="email" name="email" value={userData.email || ''} onChange={handleUserDataChange} className="border-[1px] border-gray-900 p-2 rounded-md" type="text" placeholder="Twój email" />
        </div>
        <button className="w-fit p-2 font-bold bg-orange-500 hover:bg-orange-400 transition-colors duration-300 ease-in-out rounded-lg" type="submit">
          Aktualizuj
        </button>
      </form>
    </div>
  );
};

export default InformationPanel;
