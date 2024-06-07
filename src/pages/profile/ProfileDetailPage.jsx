import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';
import { useModal } from '../../contexts/popup.context.jsx';
import { updateAvartar } from '../../utils/superBaseFunc.jsx';

function ProfileDetailPage() {
  const { openModal } = useModal();
  const { userData } = useUser();
  const fileInput = useRef();

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
  }, []);

  const handlerSaveBtn = () => {
    supabase
      .from('USERS')
      .update({
        profile_image: userImage,
        nickname: nickName,
        information: userInformation,
        blog_name: blogNameModify,
        git_hub_url: gitHubUrlLinks,
      })
      .select()
      .eq('id', userData.userId)
      .then((response) => {
        if (!response.error) {
          alert('저장 되었습니다!');
          navigate(`/${userData.userId}/blog/posts`);
        } else {
          openModal('저장 실패', '저장에 실패했습니다.');
        }
      });
  };

  const imageUpload = (e) => {
    const file = e.target.files[0];
    updateAvartar(userData.userId, file);
    setUserImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Wrapper>
        <Text>BLAR</Text>
        <Border></Border>
        <Title>유저 상세 정보</Title>
        <ImageContent>
          <Image src={userImage} onClick={() => fileInput.current.click()}></Image>
          <InfoContainer>
            <input type="file" ref={fileInput} onChange={(e) => imageUpload(e)} hidden />

            <InputContainer>
              <label htmlFor="nickName">닉네임</label>
              <NickName
                id="nickName"
                placeholder="닉네임을 입력해 주세요"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="userInformation">소개말</label>
              <ProfileInformation
                id="userInformation"
                placeholder="소개말을 입력해 주세요"
                value={userInformation}
                onChange={(e) => setUserInformation(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="blogName">닉네임</label>
              <BlogName
                id="blogName"
                placeholder="블로그 이름을 작성해 주세요"
                value={blogNameModify}
                onChange={(e) => setBlogNameModify(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="gitHubUrl">깃허브 링크</label>
              <GigHubUrlLink
                id="gitHubUrl"
                placeholder="url을 입력해 주세요"
                value={gitHubUrlLinks}
                onChange={(e) => setGitHubUrlLinks(e.target.value)}
              />
            </InputContainer>
          </InfoContainer>
        </ImageContent>
        <ButtonContainer>
          <SaveButton onClick={handlerSaveBtn}>저장</SaveButton>
          <CancelButton onClick={() => navigate(`/${userData.userId}/blog/posts`)}>취소</CancelButton>
        </ButtonContainer>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  background: #ffffff;
  box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const Text = styled.p`
  /* logo */

  position: absolute;
  width: 54px;
  height: 24px;
  left: calc(50% - 54px / 2);
  top: 20px;

  font-family: 'Istok Web';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  text-align: center;

  color: #3a3e41;
`;

const Border = styled.p`
  /* Line 2 */

  position: absolute;
  width: 1056px;
  height: 0px;
  left: 23px;
  top: 60px;

  border: 1px solid #ffffff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 55px;
`;
const ImageContent = styled.div`
  display: flex;
`;
const Image = styled.img`
  /* 이미지 */

  box-sizing: border-box;

  width: 300px;
  height: 300px;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  margin-left: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const CommonInput = styled.input`
  width: 300px;
  height: 40px;
`;
const NickName = styled(CommonInput)`
  /* 닉네임 */

  box-sizing: border-box;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;
const ProfileInformation = styled.textarea`
  /* 프로필 기본사항 */
  width: 300px;
  height: 65px;
  box-sizing: border-box;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;
const BlogName = styled(CommonInput)`
  /* 블로그명 수정 */

  box-sizing: border-box;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;

const GigHubUrlLink = styled(CommonInput)`
  /* gitHub url 링크 */

  box-sizing: border-box;

  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;

const CommonButton = styled.button`
  width: 200px;
  height: 40px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition-duration: 250ms;
`;
const SaveButton = styled(CommonButton)`
  /* 저장 버튼 */
  &:hover {
    background-color: #ff6078;
    color: white;
  }
  background-color: #ffd4db;
  box-sizing: border-box;
`;

const CancelButton = styled(CommonButton)`
  /* 취소 버튼*/
  &:hover {
    background-color: #5b5b5b;
    color: white;
  }
  background-color: #e0e0e0;
  box-sizing: border-box;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;
`;

export default ProfileDetailPage;
