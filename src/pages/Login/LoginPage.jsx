import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';

import styled from 'styled-components';
import { useUser } from '../../contexts/login.context';
import { useModal } from '../../contexts/popup.context';
import { loginResolver } from '../../validation/userSchema';
import { StJoinButton, StLoginContainer, StTitle, SterrorUl } from './LoginStyle';

function LoginPage() {
  const [messsages, setMessages] = useState(null);
  const { userData, login } = useUser();
  const navigate = useNavigate();
  const { openModal } = useModal();

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
      openModal('로그인 실패', '입력한 정보를 다시 확인해주세요.');
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
    <StCustomLoginContainer>
      <StLoginForm onSubmit={handleSubmit}>
        <StTitle>이메일 로그인</StTitle>

        <StInputSection>
          <StInputDiv>
            <label htmlFor="email">이메일</label>
            <SterrorUl>
              {messsages &&
                messsages['email'] &&
                messsages['email'].map((messsage) => <li key={messsage}>{messsage}</li>)}
            </SterrorUl>
            <StInput id="email" name="email" type="email" />
          </StInputDiv>

          <StInputDiv>
            <label htmlFor="password">비밀번호</label>
            <SterrorUl>
              {messsages &&
                messsages['password'] &&
                messsages['password'].map((messsage) => <li key={messsage}>{messsage}</li>)}
            </SterrorUl>
            <StInput id="password" name="password" type="password" />
          </StInputDiv>
        </StInputSection>

        <StJoinDiv>
          <StJoinButton type="submit">로그인</StJoinButton>
          <Link to="/join">회원가입 &rarr;</Link>
        </StJoinDiv>
      </StLoginForm>
    </StCustomLoginContainer>
  );
}

export default LoginPage;

const StCustomLoginContainer = styled(StLoginContainer)`
  gap: 50px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StInputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const StInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
  font-size: 20px;
`;
const StInput = styled.input`
  /* flex-grow: 1; */
  height: 55px;
  width: 450px;
  box-sizing: border-box;
  gap: 10px;
  padding: 0 10px;
  border:3px solid #ededed;
  border-radius: 10px;
  font-size: 20px;
`;
const StJoinDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  a {
      color:#000;
      margin-top: 10px;
      font-weight: 500;
      &:hover {
        text-decoration: underline;
        text-underline-offset : 5px;
        color:#3AA6B9;
      }
    }
`;
