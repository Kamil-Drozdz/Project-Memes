import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import moment from 'moment';
import UserPanel from './UserPanel';
import 'moment/dist/locale/pl';
import { useState } from 'react';

const UserPanelContainer = () => {
  const { auth } = useAuth();
  const { language } = useLanguage();
  const [activePanel, setActivePanel] = useState('information');
  moment.locale(`${language}`);
  const lastLogin = moment(auth.lastLogin).fromNow();
  const [userData, setUserData] = useState({
    userNick: auth.userNick,
    email: auth.email,
    currentPassword: '',
    password: '',
    confirmPassword: ''
  });

  const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let filteredData = {};
    if (activePanel === 'information') {
      filteredData = {
        userNick: userData.userNick,
        email: userData.email
      };
    } else if (activePanel === 'password') {
      filteredData = {
        currentPassword: userData.currentPassword,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      };
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}users/users/${auth.userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify(filteredData)
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return <UserPanel  {...{ auth, lastLogin, userData, handleUserDataChange, handleSubmit, activePanel, setActivePanel }} />;
};

export default UserPanelContainer;
