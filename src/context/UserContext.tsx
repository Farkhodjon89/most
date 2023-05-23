import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { createContext, FC, useContext, useEffect, useState } from 'react';

import { LinearLoader } from '../components/Loaders';
import { axiosClient } from '../pages/_app';

type UserContextType = {
  me: any;
  userId: number;
  refetch: () => void;
  login: (token: string) => void;
  logout: () => void;
  enableRedirect: boolean;
  setEnableRedirect: (value: boolean) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const useSession = () => useContext(UserContext);

const UserProvider: FC<any> = ({ children }) => {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [enableRedirect, setEnableRedirect] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [, getMe] = useAxios({ url: '/auth/me', method: 'POST' }, { manual: true });

  useEffect(() => {
    const token = localStorage.getItem('mostLoginToken');
    if (token) {
      axiosClient
        .post(`/auth/me`)
        .then(({ data }) => {
          setLoading(false);
          setMe(data.data.user);
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string, redirectPath = '/seller/profile') => {
    localStorage.setItem('mostLoginToken', token);
    getMe()
      .then(({ data }) => {
        console.log('data', data);
        if (redirectPath !== '/seller/profile') {
          setEnableRedirect(false);
        }
        setMe(data.data.user);
        router.push(redirectPath);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setMe(null);
    localStorage.removeItem('mostLoginToken');
    router.push('/').finally(() => setEnableRedirect(true));
  };

  const handleRefetech = () => {
    getMe()
      .then(({ data }) => {
        setMe(data.data.user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // console.log('loading', loading, me);
  if (loading) {
    return <LinearLoader progress={!loading} />;
  }

  let finalUser = null;
  let userId = null;
  let companyId = null;
  if (me) {
    finalUser = me;
    userId = me.id;
    companyId = me.companies[0].id;
  }

  return (
    <UserContext.Provider
      value={{
        me: finalUser,
        userId,
        companyId,
        refetch: handleRefetech,
        login,
        logout,
        enableRedirect,
        setEnableRedirect,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
