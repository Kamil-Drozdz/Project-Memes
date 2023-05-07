import Cookies from 'js-cookie';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    email: null,
    password: null,
    roles: null,
    userId: null,
    userNick: null,
    token: Cookies.get('token') || null
  });

  useEffect(() => {
    if (auth.token) {
      const getUser = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}users/users/1`, {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });
          if (!response.ok) {
            throw new Error('User not found');
          }
          const data = await response.json();
          const email = data.email;
          const userNick = data.displayName;
          const roles = data.roles;
          const userId = data.id;
          setAuth({ ...auth, roles, userId, userNick, email });
          navigate('/');
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      getUser();
    }
  }, [auth.token, setAuth]);

  return <AuthContext.Provider value={{ isLoading, auth, setAuth }}>{children}</AuthContext.Provider>;
};
