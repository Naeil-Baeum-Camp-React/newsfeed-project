import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import defaultAvartar from '../../asset/default-profile.jpg';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';
import { getUserData } from '../../utils/superBaseFunc';
import { uploadUserDataResolver } from '../../validation/userSchema';

function SetUserData() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [imgFile, setImgFile] = useState(null);
  const [validErrors, setValidErrors] = useState({});
  const [uploadError, setUploadError] = useState(null);
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
    e.prevetDefault();
    setValidErrors({});

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    // 유효성 검사
    const errors = uploadUserDataResolver(formDataObj);
    if (Object.keys(errors).length !== 0) {
      return setValidErrors(errors);
    }

    // 이미지 먼저 저장
    const { imgData, imgError } = await supabase.storage
      .from('avatars')
      .upload(userData.userId, formDataObj['profile_image'], {
        cacheControl: '3600',
        upsert: false,
      });

    // 저장한 url 받기
    if (imgError) {
      return setUploadError(imgError);
    }
    const urlPath = imgData.path;

    // 수퍼 베이스에 유저 데이터 저장하기
    const { data, error } = await supabase
      .from('USERS')
      .insert({
        profile_image: urlPath,
        blog_name: formDataObj['blog_name'],
        nickname: formDataObj['nickname'],
      })
      .select();

    console.log('유저 데이터', data, error);
  };

  useEffect(() => {
    if (!userData.isLogedIn) {
      return navigate('/login');
    }
  }, [userData]);

  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      setPrevUserData(userData);
    })();
  }, []);
  return (
    <form onSubmit={handleSumbit}>
      <input name="nickname" type="text" />
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
