import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import defaultAvartar from '../../asset/default-profile.jpg';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';
import { blobToFile, downloadAvartar, getAvartarUrl, getUserData } from '../../utils/superBaseFunc';
import { uploadUserDataResolver } from '../../validation/userSchema';

function SetUserData() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [imgFile, setImgFile] = useState(null);
  const [imgDefault, setimgDefault] = useState(null);
  const [validErrors, setValidErrors] = useState({});
  const [uploadError, setUploadError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [prevUserData, setPrevUserData] = useState(null);

  const handleUploadAvartar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    setValidErrors({});
    setCreateError(null);
    setUploadError(null);

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    // 유효성 검사
    const errors = uploadUserDataResolver(formDataObj);
    if (Object.keys(errors).length !== 0) {
      return setValidErrors(errors);
    }

    // 이미지 먼저 저장
    const uploadUserResult = await supabase.storage
      .from('avatars')
      .upload(userData.userId, formDataObj['profile_image']);

    // 저장한 url 받기
    if (uploadUserResult.error) {
      return setUploadError(uploadUserResult.error);
    }
    const urlPath = uploadUserResult.data.path;

    // 수퍼 베이스에 유저 데이터 저장하기
    const { data, error } = await supabase
      .from('USERS')
      .insert({
        profile_image: urlPath,
        blog_name: formDataObj['blog_name'],
        nickname: formDataObj['nickname'],
      })
      .select();

    if (error) {
      setCreateError(error);
    }

    if (data) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!userData.isLogedIn) {
      return navigate('/login');
    }
  }, []);

  useEffect(() => {
    async function getUserFunc(id) {
      const userData = await getUserData(id);
      const file = await downloadAvartar(id);
      const url = getAvartarUrl(id);
      const convertFile = blobToFile(file, `${userData[0]?.id}.png`);
      console.log('convertFile :', convertFile);
      setimgDefault(convertFile);
      setImgFile(url.publicUrl);
      setPrevUserData(userData);
    }
    if (userData?.userId) {
      getUserFunc(userData.userId);
    }
  }, [userData]);
  return (
    <form onSubmit={handleSumbit}>
      {createError && <h1>{createError}</h1>}
      <input name="nickname" type="text" defaultValue={prevUserData ? prevUserData[0].nickname : ''} />
      {validErrors['nickname'] && validErrors['nickname'].map((msg) => <span key={msg}>{msg}</span>)}

      {!prevUserData && (
        <>
          <input name="blog_name" type="text" />
          {validErrors['blog_name'] && validErrors['blog_name'].map((msg) => <span key={msg}>{msg}</span>)}
        </>
      )}

      <input
        name="profile_image"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleUploadAvartar}
      />
      {validErrors['profile_image'] && validErrors['profile_image'].map((msg) => <span key={msg}>{msg}</span>)}
      {uploadError && <span>{uploadError}</span>}
      <img src={imgFile ? imgFile : defaultAvartar} />
      <button type="submit">등록하기</button>
    </form>
  );
}

export default SetUserData;
