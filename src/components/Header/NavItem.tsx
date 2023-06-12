import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { NavItemContainerProps } from './NavItemContainer';

interface NavItemProps extends NavItemContainerProps {
  active: boolean;
}
export const NavItem: React.FC<NavItemProps> = ({ to, text, icon, active }) => {
  return (
    <Link to={to} className={` p-2 text-white rounded border-b-4 border-gray-800 hover:border-orange-700 hover:bg-orange-500 hover:text-black md:mr-3 ${active ? '  !text-black !border-orange-700 bg-orange-500 ' : ''}`}>
      <FontAwesomeIcon className="mr-5" icon={icon} />
      {text}
    </Link>
  );
};
