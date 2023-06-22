import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../Pages/Login/PrivateRoute';
import Unauthorized from './Unauthorized';
import Missing from './Missing';
import { MainLayout } from '../Layouts/MainLayout';
import GenerateMem from '../Pages/GenerateMeme/GenerateMem';
import { useAuth } from '../hooks/useAuth';
import { FadeLoader } from 'react-spinners';
import MemeLoaderContainer from '../Pages/Home/BrowsingMemes/MemeLoaderContainer';
import SortContainer from '../Pages/Sort/SortContainer';
import LoginFormContainer from '../Pages/Login/LoginFormContainer';
import UserPanelContainer from '../Pages/UserPanel/UserPanelContainer';
import MemeInteractionContainer from '../Pages/MemeInteraction/MemeInteractionContainer';

const ROLES = {
  User: 'ROLE_USER',
  Admin: 'ROLE_SUPER_USER'
};

//fixed max size with infinity scroll div set, which extends the page, temporarily solves the problem with the scroll on x
export const atLayout = (Component: React.ComponentType<any>) => {
  return (
    <div className={` max-h-full min-h-screen max-w-screen bg-gray-600  `}>
      <MainLayout>
        <Component />
      </MainLayout>
    </div>
  );
};

export const App = () => {
  const { isLoading } = useAuth();

  return (
    <div>
      {isLoading ? (
        <div className=" flex max-h-full min-h-screen w-screen flex-col items-center justify-center bg-gray-600">
          <FadeLoader color="#f97316" />
          <p>Checking...</p>
        </div>
      ) : (
        <Routes>
          {/*Role user*/}
          <Route element={<PrivateRoute allowedRoles={ROLES.User} />}>
            <Route path="sort" element={atLayout(SortContainer)} />
            <Route path="generatemem" element={atLayout(GenerateMem)} />
            <Route path="profile" element={atLayout(UserPanelContainer)} />
          </Route>
          {/* Without roles */}
          <Route path="/login" element={atLayout(LoginFormContainer)} />
          <Route path="/meme/:id" element={atLayout(MemeInteractionContainer)} />
          <Route path="unauthorized" element={atLayout(Unauthorized)} />
          <Route path="*" element={atLayout(Missing)} />
          <Route path="/" element={atLayout(MemeLoaderContainer)} />
        </Routes>
      )}
    </div>
  );
};
