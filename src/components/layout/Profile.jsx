import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import settingsIcon from '../../asset/gear.svg';
import github from '../../asset/github.svg';
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
      <Link to="/ProfileDetailPage">
        <ProfileBox>
          <ProfileSettings src={settingsIcon} />
          <span>프로필 수정하기</span>
        </ProfileBox>
      </Link>
      <Margin></Margin>
      <ProfileImage src={userImage} />
      <ProfileNickName>{nickName}</ProfileNickName>
      <ProfileInformation $isExist={userInformation}>
        {userInformation ? userInformation : '소개글을 작성해주세요.'}
      </ProfileInformation>
      <GigHubLink $github={gitHubUrlLinks} disabled={gitHubUrlLinks} href={gitHubUrlLinks} target="_blank">
        <GigHubImg src={github} />
        깃허브 링크 &rarr;
      </GigHubLink>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 570px;
  left: 26px;
  top: 110px;

  background: #ffffff;
  box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const ProfileBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-top: 10px;
  span {
    color: #646464;
  }
`;
const ProfileSettings = styled.img`
  /* 설정 img */
  width: 18px;
  height: 18px;
  border: none;
  margin-bottom: 4px;
  filter: invert(70%);
`;

const ProfileImage = styled.img`
  /* 이미지 */
  width: 160px;
  height: 160px;

  margin-top: 50px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  margin: 0 auto;
  object-fit: cover;
`;

const ProfileNickName = styled.div`
  /* 닉네임 */
  width: 160px;
  padding: 6px 0 3px 0;
  justify-content: center;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  margin-top: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;
const ProfileInformation = styled.div`
  /* 프로필 기본사항 */
  color: ${(props) => (props.$isExist ? 'black' : '#aaaaaa')};
  width: 160px;
  height: 200px;
  margin-top: 15px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;

const GigHubImg = styled.img`
  width: 20px;
  height: 20px;
  filter: invert(100%);
`;
const GigHubLink = styled.a`
  cursor: pointer;
  width: 160px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin-top: 20px;
  box-sizing: border-box;
  color: white;
  background: black;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => (props.$github ? 'black' : '#838383')};
  cursor: ${(props) => (props.$github ? 'pointer' : 'not-allowed')};
`;
const Margin = styled.div`
  height: 25px;
`;
export default Profile;
