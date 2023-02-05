import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sort from '../Pages/Sort/Sort';
import LoginForm from '../Pages/Login/LoginForm';
import { PrivateRoute } from '../Pages/Login/PrivateRoute';
import Unauthorized from './Unauthorized';
import Missing from './Missing';
import BrowsingMemes from '../Pages/Home/BrowsingMemes';
import { MainLayout } from '../Layouts//MainLayout';
import GenerateMem from '../Pages/GenerateMem/GenerateMem';

const ROLES = {
  User: 'ROLE_USER',
  Admin: 'ROLE_SUPER_USER'
};
function atLayout(Component) {
  return (
    <div className="h-screen w-screen bg-gray-600">
      <MainLayout>
        <Component />
      </MainLayout>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      {/* Without roles */}
      <Route path="login" element={atLayout(LoginForm)} />
      <Route path="unauthorized" element={atLayout(Unauthorized)} />
      <Route path="*" element={atLayout(Missing)} />
      <Route path="/" element={atLayout(BrowsingMemes)} />
      {/*Role user*/}
      <Route element={<PrivateRoute allowedRoles={ROLES.User} />}>
        <Route path="sort" element={atLayout(Sort)} />
        <Route path="generatemem" element={atLayout(GenerateMem)} />
      </Route>
    </Routes>
  );
}
