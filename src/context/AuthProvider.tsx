import Cookies from 'js-cookie';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthContextType {
  isLoading: boolean;
  auth: {
    email: string | null;
    password: string | null;
    roles: string | null;
    userId: string | null;
    lastLogin: string | null;
    userNick: string | null;
    token: string | null;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      email: string | null;
      password: string | null;
      roles: string | null;
      userId: string | null;
      lastLogin: string | null;
      userNick: string | null;
      token: string | null;
    }>
  >;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthContextType['auth']>({
    email: null,
    password: null,
    roles: null,
    userId: null,
    lastLogin: null,
    userNick: null,
    token: Cookies.get('token') || null
  });

  useEffect(() => {
    if (auth.token) {
      const getUser = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}users/users/1`, {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });
          if (!response.ok) {
            throw new Error('User not found');
          }
          const data = await response.json();
          const email = data.email;
          const lastLogin = data.lastLogin;
          const userNick = data.displayName;
          const roles = data.roles;
          const userId = data.id;

          setAuth({ ...auth, roles, userId, userNick, email, lastLogin });
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
