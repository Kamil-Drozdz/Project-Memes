import moment from 'moment';
import UserPanel from './UserPanel';
import { useSelector } from 'react-redux';
import 'moment/dist/locale/pl';
import { useState } from 'react';
import { RootState } from '../../store/authSlice';

const UserPanelContainer = () => {
  const { userNick, email, lastLogin, userId, token } = useSelector((state: RootState) => state.auth);
  const language = useSelector((state: RootState) => state.auth);
  const [activePanel, setActivePanel] = useState('information');
  moment.locale(`${language}`);
  const lastLoggedIn = moment(lastLogin).fromNow();
  const [userData, setUserData] = useState({
    userNick: userNick,
    email: email,
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
      const response = await fetch(`${process.env.VITE_APP_API_BASE_URL}users/users/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(filteredData)
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return <UserPanel {...{ lastLoggedIn,userNick, email, userData, handleUserDataChange, handleSubmit, activePanel, setActivePanel }} />;
};

export default UserPanelContainer;
