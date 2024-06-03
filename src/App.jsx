import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import supabase from './config/supabase.js';
import { login_user } from './redux/reducers/user.reducer.js';
import Router from './shared/Router.jsx';
import { getDataToLocal, setDataToLocal } from './util/storageFunc.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = getDataToLocal('user');
    async function getUserFunc() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    }
    async function init() {
      if (userData && userData.isLogin) {
        dispatch({
          type: login_user,
          payload: userData.userObj,
        });
      } else {
        try {
          const user = await getUserFunc();
          console.log('user :', user);
          dispatch({
            type: login_user,
            payload: {
              type: login_user,
              payload: {
                email: user.email,
                id: user.id,
              },
            },
          });
          setDataToLocal('user', { isLogin: true, userObj: user });
        } catch (e) {
          setDataToLocal('user', {
            isLogin: false,
            userObj: {},
          });
        }
      }
    }
    init();
  }, []);
  return (
    <AppWrapper>
      <DottedLine>
        <Router />
      </DottedLine>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 1150px;
  height: 750px;
  border: 1px solid #ffffff;
  border-radius: 10px;
`;

const DottedLine = styled.div`
  position: absolute;
  width: 1113px;
  height: 710px;
  left: calc(50% - 1113px / 2 - 0.5px);
  top: calc(50% - 710px / 2);

  border: 1px dashed #ffffff;
  border-radius: 10px;
`;

export default App;
