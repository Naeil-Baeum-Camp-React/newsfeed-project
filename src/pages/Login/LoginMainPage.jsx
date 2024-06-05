import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';

import { useEffect } from 'react';
import { useUser } from '../../contexts/login.context';

function LoginMainPage() {
  const navigate = useNavigate();
  const { login, userData } = useUser();
  async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (!error) {
      login();
    }
  }
  useEffect(() => {
    if (userData.isLogedIn) {
      return navigate('/');
    }
  }, [userData]);
  return (
    <div>
      <h1>로그인</h1>
      <div>
        <Link to="/login/email">이메일로 로그인</Link>
        <button onClick={signInWithGithub}>깃허브로 로그인</button>
      </div>
      <div>
        <h5>블라블라가 처음이신가요?</h5>
        <Link to="/join">회원가입</Link>
      </div>
    </div>
  );
}

export default LoginMainPage;
