import { produce } from 'immer';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';
import { userResolver } from '../../util/userSchema';

const VALIDATION = 'form-validation';
const CREATE_FAIL = 'create-fail';
const CREATE_SUCCESS = 'create-success';

function submitResultReducer(state, action) {
  switch (action.type) {
    case CREATE_FAIL:
      return produce(state, (draft) => {
        draft.message = '중복되는 이메일입니다.';
      });

    case CREATE_SUCCESS:
      return produce(state, (draft) => {
        draft.message = '이메일 인증으로 로그인을 완료해주세요.';
        draft.email = action.payolad.email;
      });

    case VALIDATION:
      return produce(state, (draft) => {
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
  console.log('submitStatus :', submitStatus);
  const { userData } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    const errors = userResolver(formDataObj);
    if (Object.keys(errors).length !== 0) {
      dispatch({
        type: VALIDATION,
        payolad: errors,
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formDataObj.email,
      password: formDataObj.password,
    });
    console.log(data, error);
    if (data.user) {
      // 로그인 입력 이메일을 요청해야함.
      dispatch({
        type: CREATE_SUCCESS,
        payolad: data.user.email,
      });
    } else {
      dispatch({
        type: CREATE_FAIL,
      });
    }
  };

  if (userData.isLogedIn) {
    return navigate('/');
  }

  return (
    <div>
      {!submitStatus.email ? (
        <>
          <h3>{Object.keys(submitStatus.vaildMessage).length !== 0 && submitStatus.message}</h3>
          <form onSubmit={handleSubmit}>
            <input name="email" type="email" />
            {submitStatus.vaildMessage['email'] &&
              submitStatus.vaildMessage['email'].map((msg) => <span key={msg}>{msg}</span>)}
            <input name="password" type="password" />
            {submitStatus.vaildMessage['password'] &&
              submitStatus.vaildMessage['password'].map((msg) => <span key={msg}>{msg}</span>)}
            <input name="password2" type="password" />
            {submitStatus.vaildMessage['password2'] &&
              submitStatus.vaildMessage['password2'].map((msg) => <span key={msg}>{msg}</span>)}
            <button type="submit">가입</button>
          </form>
        </>
      ) : (
        <div>
          <h3>{submitStatus.message}</h3>
          <h4>{submitStatus.email}</h4>
        </div>
      )}
    </div>
  );
}

export default JoinPage;
