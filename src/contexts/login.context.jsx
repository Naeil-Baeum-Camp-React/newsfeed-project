import { produce } from 'immer';
import { createContext, useContext, useState } from 'react';

const initialState = {
  isLogedIn: false,
  userId: '',
  access_token: '',
};

const UserContext = createContext(initialState);
export function UserProvider({ children }) {
  const [userData, setUserData] = useState(initialState);
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
        })
      );
    },
    accessUpdate: ({ id, access_token }) => {
      setUserData((prevState) =>
        produce(prevState, (draft) => {
          draft.userId = id;
          draft.access_token = access_token;
        })
      );
    },
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
