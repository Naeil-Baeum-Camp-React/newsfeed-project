import { produce } from 'immer';
import { createContext, useContext, useEffect, useState } from 'react';
import { getDataToLocal, setDataToLocal } from '../utils/storageFunc';

const initialState = {
  isLogedIn: false,
  userId: '',
  access_token: '',
};

const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const storedUserData = getDataToLocal('userData');
    return storedUserData ? storedUserData : initialState;
  });

  useEffect(() => {
    setDataToLocal('userData', userData);
  }, [userData]);

  const value = {
    userData,
    login: () => {
      setUserData((prevState) =>
        produce(prevState, (draft) => {
          draft.isLogedIn = true;
        })
      );
    },
    logout: () => {
      setUserData((prevState) =>
        produce(prevState, (draft) => {
          draft.isLogedIn = false;
          draft.userId = '';
          draft.access_token = '';
        })
      );
      localStorage.removeItem('userData');
    },
    accessUpdate: ({ id, access_token }) => {
      setUserData((prevState) =>
        produce(prevState, (draft) => {
          draft.userId = id;
          draft.access_token = access_token;
        })
      );

      setDataToLocal('userData', {
        id,
        access_token,
        isLogedIn: true,
      });
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
