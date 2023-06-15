import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NavItemContainerProps {
  to: string;
  text: string;
  icon: IconDefinition;
}
export const NavItemContainer: React.FC<NavItemContainerProps> = ({ to, text, icon }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return <NavItem {...{ to, text, icon, active }} />;
};
