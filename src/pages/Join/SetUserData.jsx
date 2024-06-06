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
    console.log('imgFile :', imgFile);
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
      console.log('업데이트 레츠고!');
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
    if (imgUrlForSave) {
      if (data) {
        navigate('/');
      }
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
    <form onSubmit={handleSumbit}>
      <img src={imgFile ? imgFile : imgUrlForSave ? imgUrlForSave : defaultAvartar} onClick={handleClickImage} />
      <input name="nickname" type="text" defaultValue={prevUserData ? prevUserData[0]?.nickname : ''} />
      {validErrors['nickname'] && validErrors['nickname'].map((msg) => <span key={msg}>{msg}</span>)}
      <input name="blog_name" type="text" defaultValue={prevUserData ? prevUserData[0]?.blog_name : ''} />
      {validErrors['blog_name'] && validErrors['blog_name'].map((msg) => <span key={msg}>{msg}</span>)}
      <StFileInput
        name="profile_image"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={imgRef}
        onChange={handleUploadAvartar}
      />
      {validErrors['profile_image'] && validErrors['profile_image'].map((msg) => <span key={msg}>{msg}</span>)}
      {uploadError && <span>프로필 수정 실패!</span>}

      <button type="submit">등록하기</button>
    </form>
  );
}

export default SetUserData;

const StFileInput = styled.input`
  visibility: hidden;
`;
