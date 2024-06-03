import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';

let CREATE_USER_MESSAGE;

function JoinPage() {
  const { userData } = useUser();
  const [confirmEmail, setConfirmEmail] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.email, formDataObj.password);
    const { data, error } = await supabase.auth.signUp({
      email: formDataObj.email,
      password: formDataObj.password,
    });
    if (data) {
      // 로그인 입력 이메일을 요청해야함.
      setConfirmEmail(data.user.email);
    }
    if (error) {
      setConfirmEmail(false);
    }
  };
  switch (confirmEmail) {
    case null:
      // 초기값
      CREATE_USER_MESSAGE = '';
      break;
    case false:
      // 인증실패
      CREATE_USER_MESSAGE = '잘못된 입력입니다.';
      break;
    default:
      CREATE_USER_MESSAGE = '이메일 인증으로 로그인을 완료해주세요.';
  }

  if (userData.isLogedIn) {
    return navigate('/');
  }

  return (
    <div>
      <div>{!confirmEmail && CREATE_USER_MESSAGE}</div>
      {!confirmEmail ? (
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" />
          <input name="password" type="password" />
          <input name="password2" type="password" />
          <button type="submit">가입</button>
        </form>
      ) : (
        <div>
          <h3>{CREATE_USER_MESSAGE}</h3>
          <h4>{confirmEmail}</h4>
        </div>
      )}
    </div>
  );
}

export default JoinPage;
