import styled from 'styled-components';

import { useEffect, useState } from 'react';
import supabase from './config/supabase.js';
import { useUser } from './contexts/login.context.jsx';
import Router from './shared/Router.jsx';

function App() {
  const [session, setSession] = useState(null);
  const { login, accessUpdate } = useUser();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        login();
        accessUpdate({
          id: session.user.id,
          access_token: session.access_token,
        });
      }
    });

    return () => subscription.unsubscribe();
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
