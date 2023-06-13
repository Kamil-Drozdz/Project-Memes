import { AiOutlineRight } from 'react-icons/ai';

interface ListItemProps {
  Icon: React.ElementType;
  title: string;
  onClick?: () => void;
  activePanel: string;
  panelName?: string;
}

export const ListItem: React.FC<ListItemProps> = ({ Icon, title, onClick, activePanel, panelName }) => {
  return (
    <li onClick={onClick} className={`flex target cursor-pointer border-b-[1px] ${activePanel === panelName ? '!border-black !text-black ' : ''} border-gray-400 hover:border-black  hover:text-black w-full p-2 justify-between items-center`}>
      <Icon size={24} />
      <p>{title}</p>
      <AiOutlineRight className="icon" />
    </li>
  );
};
