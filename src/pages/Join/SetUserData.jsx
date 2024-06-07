import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import defaultAvartar from '../../asset/default-profile.jpg';
import { useUser } from '../../contexts/login.context';
import {
  getAvartarUrl,
  getUserData,
  updateAvartar,
  updateUserDate,
  uploadAvartar,
  uploadUserDate,
} from '../../utils/superBaseFunc';
import { reuploadUserDataResolver, uploadUserDataResolver } from '../../validation/userSchema';
import { StButtonBox, StLoginContainer, StTitle, SterrorUl } from '../Login/LoginStyle';

// const uploadFileDownloadUrlFunc = async(userId, imageFile) => {
//   const uploadUserResult = await uploadAvartar(userData.userId, formDataObj['profile_image']);
// }
function SetUserData() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const imgRef = useRef(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrlForSave, setImgUrlForSave] = useState(null);
  const [validErrors, setValidErrors] = useState({});
  const [uploadError, setUploadError] = useState(null);
  const [createError, setCreateError] = useState(null); // 유저 객체 데이터 생성 오류
  const [prevUserData, setPrevUserData] = useState(null);

  const handleUploadAvartar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  const handleClickImage = () => {
    imgRef.current.click();
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    setValidErrors({});
    setCreateError(null);
    setUploadError(null);

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    let urlPath;
    if (!imgFile) {
      const errors = reuploadUserDataResolver(formDataObj);
      if (Object.keys(errors).length !== 0) {
        return setValidErrors(errors);
      }
      urlPath = imgUrlForSave;
    }

    if (imgFile) {
      // 유효성 검사
      const errors = uploadUserDataResolver(formDataObj);
      if (Object.keys(errors).length !== 0) {
        return setValidErrors(errors);
      }

      // 이미지 먼저 저장
      let uploadUserResult;
      if (imgUrlForSave) {
        // 업데이트면?
        uploadUserResult = await updateAvartar(userData.userId, formDataObj['profile_image']);
      } else {
        // 새로 생성
        uploadUserResult = await uploadAvartar(userData.userId, formDataObj['profile_image']);
      }
      // 저장한 url 받기
      if (uploadUserResult.error) {
        return setUploadError(uploadUserResult.error);
      }
      urlPath = getAvartarUrl(userData.userId);
    }

    // 수퍼 베이스에 유저 데이터 저장하기
    let data, error;
    if (!imgUrlForSave) {
      // 유저 데이터 업로드
      ({ data, error } = await uploadUserDate({
        profile_image: urlPath,
        blog_name: formDataObj['blog_name'],
        nickname: formDataObj['nickname'],
      }));
    } else {
      // 유저 데이터 업데이트
      error = await updateUserDate({
        profile_image: urlPath,
        blog_name: formDataObj['blog_name'],
        nickname: formDataObj['nickname'],
        id: userData.userId,
      });
    }

    if (error) {
      setCreateError(error);
    }

    // 변경 완료.
    if (data) {
      navigate('/');
    }
  };

  // 로그인이 되어있는 경우만
  useEffect(() => {
    if (!userData.isLogedIn) {
      return navigate('/login');
    }
  }, []);

  useEffect(() => {
    async function getUserFunc(id) {
      const userData = await getUserData(id);
      if (userData && userData.length !== 0) {
        const url = getAvartarUrl(id);
        setImgUrlForSave(url);
        setPrevUserData(userData);
      }
    }
    // 로그인이 되어 있으면
    if (userData?.userId) {
      getUserFunc(userData.userId);
    }
  }, [userData]);
  return (
    <StCustomLoginContainer>
      <StTitle>회원 정보</StTitle>
      <StUserDataForm onSubmit={handleSumbit}>
        <StUserImage
          src={imgFile ? imgFile : imgUrlForSave ? imgUrlForSave : defaultAvartar}
          onClick={handleClickImage}
        />
        <StUserDataContainer>
          <StInputDiv>
            <label>닉네임</label>
            <SterrorUl>
              {validErrors['nickname'] && validErrors['nickname'].map((msg) => <li key={msg}>{msg}</li>)}
            </SterrorUl>
            <StInput name="nickname" type="text" defaultValue={prevUserData ? prevUserData[0]?.nickname : ''} />
          </StInputDiv>

          <StInputDiv>
            <label>블로그명</label>
            <SterrorUl>
              {validErrors['blog_name'] && validErrors['blog_name'].map((msg) => <li key={msg}>{msg}</li>)}
            </SterrorUl>
            <StInput name="blog_name" type="text" defaultValue={prevUserData ? prevUserData[0]?.blog_name : ''} />
          </StInputDiv>

          <StFileInput
            name="profile_image"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={imgRef}
            onChange={handleUploadAvartar}
          />
          <SterrorUl>
            {validErrors['profile_image'] && validErrors['profile_image'].map((msg) => <li key={msg}>{msg}</li>)}
            {uploadError && <li>프로필 수정 실패!</li>}
          </SterrorUl>

          <StJoinButton type="submit">등록하기</StJoinButton>
        </StUserDataContainer>
      </StUserDataForm>
    </StCustomLoginContainer>
  );
}

export default SetUserData;

const StFileInput = styled.input`
  visibility: hidden;
`;
const StCustomLoginContainer = styled(StLoginContainer)`
  gap: 60px;
  flex-grow: 1;
  display: flex;
  justify-content: center;

  align-items: center;
`;
const StUserDataForm = styled.form`
  display: flex;
  width: 700px;
  gap: 20px;
`;
const StUserImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 3px 2px rgba(255, 69, 97, 0.74);
    -webkit-box-shadow: 0px 0px 3px 2px rgba(255, 69, 97, 0.74);
    -moz-box-shadow: 0px 0px 3px 2px rgba(255, 69, 97, 0.74);
  }
`;
const StUserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
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
export const StJoinButton = styled(StButtonBox)`
  cursor: pointer;
  color: white;
  background-color: #ff6077;
  border: none;
  &:hover {
    background: #ff3553;
  }
  img {
    filter: invert(100%);
  }
`;
