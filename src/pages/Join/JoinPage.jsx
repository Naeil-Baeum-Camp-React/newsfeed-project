import { produce } from 'immer';
import { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';
import { joinResolver } from '../../validation/userSchema';
import { StJoinButton, StLoginContainer, StTitle, SterrorUl } from '../Login/LoginStyle';

const VALIDATION = 'form-validation';
const CREATE_FAIL = 'create-fail';
const CREATE_SUCCESS = 'create-success';

function submitResultReducer(state, action) {
  switch (action.type) {
    case CREATE_FAIL:
      return produce(state, (draft) => {
        draft.vaildMessage = {};
        draft.message = '중복되는 이메일입니다.';
      });

    case CREATE_SUCCESS:
      return produce(state, (draft) => {
        draft.message = '이메일 인증으로 로그인을 완료해주세요.';
        draft.email = action.payolad.email;
        draft.vaildMessage = {};
      });

    case VALIDATION:
      return produce(state, (draft) => {
        draft.message = null;
        draft.vaildMessage = action.payolad;
      });
  }
}

function JoinPage() {
  const [submitStatus, dispatch] = useReducer(submitResultReducer, {
    message: null,
    email: null,
    vaildMessage: {},
  });
  const { userData } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    const errors = joinResolver(formDataObj);
    if (Object.keys(errors).length !== 0) {
      return dispatch({
        type: VALIDATION,
        payolad: errors,
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email: formDataObj.email,
      password: formDataObj.password,
    });
    if (data.user) {
      // 로그인 입력 이메일을 요청해야함.
      dispatch({
        type: CREATE_SUCCESS,
        payolad: data.user.email,
      });
      return navigate('/join/info');
    } else {
      console.log('여기');
      dispatch({
        type: CREATE_FAIL,
      });
    }
  };

  useEffect(() => {
    if (userData.isLogedIn) {
      return navigate('/');
    }
  }, [userData]);

  return (
    <StCustomLoginContainer>
      <StTitle>회원가입</StTitle>
      <StJoinForm onSubmit={handleSubmit}>
        <StInputDiv>
          <label htmlFor="email">이메일</label>
          <SterrorUl>
            {submitStatus.vaildMessage['email'] &&
              submitStatus.vaildMessage['email'].map((msg) => <li key={msg}>{msg}</li>)}
          </SterrorUl>
          <StInput id="email" name="email" type="email" />
        </StInputDiv>

        <StInputDiv>
          <label htmlFor="password">비밀번호</label>
          <SterrorUl>
            {submitStatus.vaildMessage['password'] &&
              submitStatus.vaildMessage['password'].map((msg) => <li key={msg}>{msg}</li>)}
          </SterrorUl>
          <StInput id="password" name="password" type="password" />
        </StInputDiv>

        <StInputDiv>
          <label htmlFor="password2">비밀번호 확인</label>
          <SterrorUl>
            {submitStatus.vaildMessage['password2'] &&
              submitStatus.vaildMessage['password2'].map((msg) => <li key={msg}>{msg}</li>)}
          </SterrorUl>
          <StInput id="password2" name="password2" type="password" />
        </StInputDiv>

        <StJoinDiv>
          <StJoinButton type="submit">회원가입</StJoinButton>
          <Link to="/login">로그인 &rarr;</Link>
        </StJoinDiv>
      </StJoinForm>
    </StCustomLoginContainer>
  );
}

export default JoinPage;

const StCustomLoginContainer = styled(StLoginContainer)`
  gap: 20px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StJoinForm = styled.form`
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
  border-radius: 10px;
  font-size: 20px;
`;
const StJoinDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  gap: 8px;
  a {
    margin-top: 10px;
    font-weight: 500;
  }
`;
