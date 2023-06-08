import Header from '../components/Header';
import { FooterContainer } from '../components/Footer/FooterContainer';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <FooterContainer />
    </>
  );
};
