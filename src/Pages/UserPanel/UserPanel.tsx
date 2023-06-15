import { FcReddit } from 'react-icons/fc';
import { HiDownload } from 'react-icons/hi';
import { RiUserSettingsLine } from 'react-icons/ri';
import { BiLock, BiUserCircle } from 'react-icons/bi';
import './UserPanel.css';
import { ListItem } from './ListItem';
import InformationPanel from './InformationPanel';
import PasswordPanel from './PasswordPanel';

interface UserPanelProps {
  auth: {
    userNick: string | null;
    email: string | null;
    lastLogin: string | null;
  };
  userData: {
    userNick: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    currentPassword: string | null;
  };
  activePanel: string;
  panelName?: string;
  setActivePanel: (value: string) => void;
  lastLogin: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUserDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ auth, lastLogin, userData, handleSubmit, handleUserDataChange, activePanel, setActivePanel }) => {
  return (
    <div className="md:h-[83vh] w-3/4  h-screen flex flex-col md:flex-row mx-auto justify-evenly  items-center">
      <div>
        <div className="min-w-[20vw] p-4 border-black border-[1px]  bg-gray-300 rounded-xl flex flex-col justify-center items-center shadow-md">
          <div className="relative -mt-24 mb-2">
            <FcReddit size="144" className=" rounded-full bg-gray-400 outline-4 outline outline-white" />
            <HiDownload size="24" color="white" className="absolute bottom-0 right-5 outline-2 outline outline-white rounded-full bg-black" />
          </div>
          <p className=" font-bold">{auth.userNick}</p>
          <p className="text-sm text-gray-900">ostatnie logowanie {lastLogin}</p>
          <p className="text-sm text-gray-700">{auth.email}</p>
        </div>
        <ul className="min-w-[20vw] p-4  mt-8 border-black border-[1px]  bg-gray-300  rounded-xl flex flex-col justify-center items-center shadow-md">
          <ListItem
            activePanel={activePanel}
            Icon={RiUserSettingsLine}
            title="Informacje"
            panelName="information"
            onClick={() => {
              setActivePanel('information');
            }}
          />
          <ListItem
            activePanel={activePanel}
            Icon={BiLock}
            title="Hasło"
            panelName="password"
            onClick={() => {
              setActivePanel('password');
            }}
          />
          <ListItem panelName="profile" activePanel={activePanel} Icon={BiUserCircle} title="Profil" />
        </ul>
      </div>
      {activePanel === 'information' && <InformationPanel {...{ handleSubmit, userData, handleUserDataChange }} />}
      {activePanel === 'password' && <PasswordPanel {...{ handleSubmit, userData, handleUserDataChange }} />}
    </div>
  );
};

export default UserPanel;
