import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';

import { useEffect } from 'react';
import { useUser } from '../../contexts/login.context';

import styled from 'styled-components';
import emailImage from '../../asset/email.svg';
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
    <StCustomLoginContainer>
      <StTitle>로그인</StTitle>
      <StButtonContainer>
        <StGithubBox onClick={signInWithGithub}>
          <img src={gitImage} alt="깃허브 이미지" />
          <span>깃허브 로그인</span>
        </StGithubBox>
        <Link to="/login/email">
          <StEmailBox>
            <img src={emailImage} alt="깃허브 이미지" />
            <span>이메일로 로그인</span>
          </StEmailBox>
        </Link>
      </StButtonContainer>
      <StJoinBox>
        <h5>블라블라가 처음이신가요?</h5>
        <Link to="/join">
          <StJoinButton>회원가입</StJoinButton>
        </Link>
      </StJoinBox>
    </StCustomLoginContainer>
  );
}

export default LoginMainPage;
const StCustomLoginContainer = styled(StLoginContainer)`
  gap: 50px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const StEmailBox = styled(StButtonBox)`
  cursor: pointer;
  color: white;
  background: #95a5a6;
  img {
    filter: invert(100%);
  }
  &:hover {
    background: #677474;
  }
`;
const StGithubBox = styled(StButtonBox)`
  cursor: pointer;
  color: white;
  background-color: black;
  &:hover {
    background: #363636;
  }
  img {
    filter: invert(100%);
  }
`;
const StJoinBox = styled(StButtonContainer)``;
const StJoinButton = styled(StButtonBox)`
  cursor: pointer;
  color: white;
  background-color: #ff6077;
  &:hover {
    background: #ff3553;
  }
  img {
    filter: invert(100%);
  }
`;
