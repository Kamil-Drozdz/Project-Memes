import { FooterContainer } from '../components/Footer/FooterContainer';
import HeaderContainer from '../components/Header/HeaderContainer';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HeaderContainer />
      {children}
      <FooterContainer />
    </>
  );
};
