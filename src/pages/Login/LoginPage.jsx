import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';

function LoginPage() {
  const { userData } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const { error } = await supabase.auth.signInWithPassword({
      email: formDataObj.email,
      password: formDataObj.password,
    });
    if (error) {
      alert('로그인에 실패했습니다!');
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
        <input name="password" type="password" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
