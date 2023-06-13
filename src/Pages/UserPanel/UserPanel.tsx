import { FcDownload, FcReddit } from 'react-icons/fc';
import { RiUserSettingsLine } from 'react-icons/Ri';
import { BiLock, BiUserCircle } from 'react-icons/bi';
import './UserPanel.css';
import { ListItem } from './ListItem';
import InformationPanel from './InformationPanel';

interface UserPanelProps {
  auth: {
    userNick: string | null;
    email: string | null;
    lastLogin: string | null;
  };
  userData: {
    nickname: string | null;
    email: string | null;
  };
  activePanel: string;
  setActivePanel: (value: string) => void;
  lastLogin: string;

  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUserDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ auth, lastLogin, userData, handleSubmit, handleUserDataChange, activePanel, setActivePanel }) => {
  return (
    <div className="md:h-[83vh]  h-screen flex flex-col md:flex-row w-screen justify-evenly  items-center">
      <div>
        <div className="min-w-[20vw] p-4 border-black border-[1px]  bg-gray-300 rounded-xl flex flex-col justify-center items-center shadow-md">
          <div className="relative -mt-24 mb-2">
            <FcReddit size="144" className=" rounded-full bg-gray-400 outline-4 outline outline-white" />
            <FcDownload size="24" className="absolute bottom-0 right-5 outline-2 outline outline-white rounded-full bg-black" />
          </div>
          <p className=" font-bold">{auth.userNick}</p>
          <p className="text-sm text-gray-900">ostatnie logowanie {lastLogin}</p>
          <p className="text-sm text-gray-700">{auth.email}</p>
        </div>
        <ul className="min-w-[20vw] p-4  mt-8 border-black border-[1px]  bg-gray-300  rounded-xl flex flex-col justify-center items-center shadow-md">
          <ListItem
            Icon={RiUserSettingsLine}
            title="Informacje"
            onClick={() => {
              setActivePanel('information');
            }}
          />
          <ListItem
            Icon={BiLock}
            title="Hasło"
            onClick={() => {
              setActivePanel('password');
            }}
          />
          <ListItem Icon={BiUserCircle} title="Profil" />
        </ul>
      </div>
      {activePanel === 'information' && <InformationPanel {...{ handleSubmit, userData, handleUserDataChange }} />}
    </div>
  );
};

export default UserPanel;
