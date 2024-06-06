import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';

import { useEffect } from 'react';
import { useUser } from '../../contexts/login.context';

import styled from 'styled-components';
import gitImage from '../../asset/github.svg';
import { setDataToLocal } from '../../utils/storageFunc';
import { StLoginContainer, StTitle } from './LoginStyle';

function LoginMainPage() {
  const navigate = useNavigate();
  const { login, userData } = useUser();
  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    setDataToLocal('github', data);
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
    <StLoginContainer>
      <StTitle>로그인</StTitle>
      <StButtonContainer>
        <StGithubBox onClick={signInWithGithub}>
          <img src={gitImage} alt="깃허브 이미지" />
          <span>깃허브 로그인</span>
        </StGithubBox>
        <Link to="/login/email">
          <StEmailBox>
            <img src={gitImage} alt="깃허브 이미지" />
            <span>이메일로 로그인</span>
          </StEmailBox>
        </Link>
      </StButtonContainer>
      <div>
        <h5>블라블라가 처음이신가요?</h5>
        <Link to="/join">회원가입</Link>
      </div>
    </StLoginContainer>
  );
}

export default LoginMainPage;

const StButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const StButtonBox = styled.div`
  width: 450px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  border-radius: 10px;
  img {
    height: 30px;
    width: 30px;
    margin-bottom: 5px;
  }
`;
const StEmailBox = styled(StButtonBox)``;
const StGithubBox = styled(StButtonBox)`
  cursor: pointer;
  color: white;
  background-color: black;
  img {
    filter: invert(100%);
  }
`;
