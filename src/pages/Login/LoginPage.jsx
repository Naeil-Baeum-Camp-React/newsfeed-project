import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';

import { useUser } from '../../contexts/login.context';
import { loginResolver } from '../../util/userSchema';

function LoginPage() {
  const [messsages, setMessages] = useState(null);
  const { userData, login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    const errors = loginResolver(formDataObj);
    if (Object.keys(errors).length !== 0) {
      return setMessages(errors);
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: formDataObj.email,
      password: formDataObj.password,
    });
    if (error) {
      alert('로그인에 실패했습니다!');
      setMessages(null);
    } else {
      login();
    }
  };

  useEffect(() => {
    if (userData.isLogedIn) {
      return navigate('/');
    }
  }, [userData]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" />
        {messsages && messsages['email'] && messsages['email'].map((messsage) => <li key={messsage}>{messsage}</li>)}
        <input name="password" type="password" />
        {messsages &&
          messsages['password'] &&
          messsages['password'].map((messsage) => <li key={messsage}>{messsage}</li>)}
        <button type="submit">로그인</button>
        <Link to="/join">회원가입</Link>
      </form>
    </div>
  );
}

export default LoginPage;
