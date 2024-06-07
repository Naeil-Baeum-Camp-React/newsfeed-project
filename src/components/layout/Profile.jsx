import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';

function Profile() {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState('');
  const [nickName, setNickName] = useState('');
  const [userInformation, setUserInformation] = useState('');
  const [blogNameModify, setBlogNameModify] = useState('');
  const [gitHubUrlLinks, setGitHubUrlLinks] = useState('');

  useEffect(() => {
    supabase
      .from('USERS')
      .select('*')
      .eq('id', userData.userId)
      .then((response) => {
        if (!response.error) {
          setUserImage(response.data[0].profile_image);
          setNickName(response.data[0].nickname);
          setUserInformation(response.data[0].information);
          setBlogNameModify(response.data[0].blog_name);
          setGitHubUrlLinks(response.data[0].git_hub_url);
        }
      });
  }, [userData.userId]);
  return (
    <Wrapper>
      {/* <BlogTitle>{blogNameModify}</BlogTitle> */}
      <ProfileSettings onClick={() => navigate("/ProfileDetailPage")}></ProfileSettings>
      <ProfileImage src={userImage} />
      <ProfileNickName>{nickName}</ProfileNickName>
      <ProfileInformation>{userInformation}</ProfileInformation>
      <GigHubLink>{gitHubUrlLinks}</GigHubLink>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  position: absolute;
  width: 180px;
  height: 570px;
  left: 26px;
  top: 110px;

  background: #ffffff;
  box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`
// const BlogTitle = styled.h1`
//   /* 블로그 제목 */

//   position: absolute;
//   width: 79px;
//   height: 19px;
//   left: 97px;
//   top: 50px;

//   font-family: 'Inter';
//   font-style: normal;
//   font-weight: 700;
//   font-size: 16px;
//   line-height: 19px;

//   color: #000000;
// `

const ProfileSettings = styled.img`
  /* 설정 img */

  position: absolute;
  width: 15px;
  height: 15px;
  left: 153px;
  top: 8px;
  border-radius: 3px;
  border: none;
`;
const ProfileImage = styled.img`
  /* 이미지 */

  box-sizing: border-box;

  position: absolute;
  width: 140px;
  height: 138px;
  left: 20px;
  top: 26px;

  border: 2px solid #e0e0e0;
  border-radius: 10px;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;

const ProfileNickName = styled.div`
  /* 닉네임 */

  box-sizing: border-box;

  position: absolute;
  width: 140px;
  height: 40px;
  left: 20px;
  top: 174px;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;
const ProfileInformation = styled.div`
  /* 프로필 기본사항 */

  box-sizing: border-box;

  position: absolute;
  width: 140px;
  height: 242px;
  left: 20px;
  top: 224px;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;

const GigHubLink = styled.div`
  /* 블로그명 수정 */

  box-sizing: border-box;

  position: absolute;
  width: 74px;
  height: 54px;
  left: 53px;
  top: 491px;

  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;

export default Profile;
