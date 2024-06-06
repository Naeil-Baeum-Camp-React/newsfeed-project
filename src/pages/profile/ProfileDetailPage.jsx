import styled from 'styled-components';
import { useUser } from '../../contexts/login.context';
import { useEffect, useRef, useState } from 'react';
import supabase from '../../config/supabase';
import { useNavigate } from 'react-router-dom';
import { updateAvartar } from '../../utils/superBaseFunc.jsx';

function ProfileDetailPage() {

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
      .then(response => {
        debugger
        if (!response.error) {
          setUserImage(response.data[0].profile_image);
          setNickName(response.data[0].nickname);
          setUserInformation(response.data[0].information);
          setBlogNameModify(response.data[0].blog_name);
          setGitHubUrlLinks(response.data[0].git_hub_url);

          console.log(response.data);
        }
      });
  }, []);

  const handlerSaveBtn = () => {
    supabase
      .from('USERS')
      .update(
        {
          profile_image: userImage,
          nickname: nickName,
          information: userInformation,
          blog_name: blogNameModify,
          git_hub_url: gitHubUrlLinks,
        },
      )
      .select()
      .eq('id', userData.userId)
      .then(response => {
        if (!response.error) {
          alert('저장 되었습니다!');
        } else {
          alert('저장에 실패 했습니다.');
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
        <Logo><Text>BLAR</Text></Logo>
        <Border></Border>
        <Image src={userImage} onClick={() => fileInput.current.click()}></Image>
        <input type="file" ref={fileInput} onChange={(e) => imageUpload(e)} />
        <NickName value={nickName} onChange={(e) => setNickName(e.target.value)}></NickName>
        <ProfileBasics value={userInformation} onChange={(e) => setUserInformation(e.target.value)}></ProfileBasics>
        <BlogName value={blogNameModify} onChange={(e) => setBlogNameModify(e.target.value)}></BlogName>
        <GigHubUrlLink value={gitHubUrlLinks} onChange={(e) => setGitHubUrlLinks(e.target.value)}></GigHubUrlLink>
        <SaveButton onClick={handlerSaveBtn}>저장</SaveButton>
        <CancelButton onClick={() => navigate(`/${userData.userId}/blog/posts`)}>취소</CancelButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
    /* Frame 2 */

    position: absolute;
    width: 1056px;
    height: 664px;
    left: 26px;
    top: 16px;

    background: #FFFFFF;
    box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

`;
const Logo = styled.h1`
    /* Frame 5 */

    box-sizing: border-box;

    position: absolute;
    width: 70px;
    height: 30px;
    left: calc(50% - 70px / 2 - 2px);
    top: 23px;

    background: #FFFFFF;
    border: 2px solid #3A3E41;
    border-radius: 30px;

`;
const Text = styled.p`
    /* logo */

    position: absolute;
    width: 54px;
    height: 24px;
    left: calc(50% - 54px / 2);
    top: 2px;

    font-family: 'Istok Web';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    text-align: center;

    color: #3A3E41;
`;

const Border = styled.p`
    /* Line 2 */

    position: absolute;
    width: 1056px;
    height: 0px;
    left: 23px;
    top: 60px;

    border: 1px solid #FFFFFF;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);

`;

const Image = styled.img`
    /* 이미지 */

    box-sizing: border-box;

    position: absolute;
    width: 140px;
    height: 138px;
    left: 449px;
    top: 111px;

    border: 2px solid #E0E0E0;
    border-radius: 10px;

`;
const NickName = styled.input`
    /* 닉네임 */

    box-sizing: border-box;

    position: absolute;
    width: 140px;
    height: 40px;
    left: 449px;
    top: 255px;

    border: 2px solid #E0E0E0;
    border-radius: 10px;

`;
const ProfileBasics = styled.textarea`
    /* 프로필 기본사항 */

    box-sizing: border-box;

    position: absolute;
    width: 140px;
    height: 168px;
    left: 449px;
    top: 301px;

    border: 2px solid #E0E0E0;
    border-radius: 10px;

`;
const BlogName = styled.input`
    /* 블로그명 수정 */

    box-sizing: border-box;

    position: absolute;
    width: 140px;
    height: 40px;
    left: 449px;
    top: 472px;

    border: 2px solid #E0E0E0;
    border-radius: 10px;
`;


const GigHubUrlLink = styled.input`
    /* gitHub url 링크 */

    box-sizing: border-box;

    position: absolute;
    width: 140px;
    height: 40px;
    left: 449px;
    top: 517px;

    border: 2px solid #E0E0E0;
    border-radius: 10px;

`;

const SaveButton = styled.button`
    /* 저장 버튼 */

    box-sizing: border-box;

    position: absolute;
    width: 68px;
    height: 34px;
    left: 449px;
    top: 561px;

    border: 2px solid #E0E0E0;
    border-radius: 10px;
`;

const CancelButton = styled.button`
    /* 취소 버튼*/

    box-sizing: border-box;

    position: absolute;
    width: 68px;
    height: 34px;
    left: 521px;
    top: 561px;

    border: 2px solid #E0E0E0;
    border-radius: 10px;


`;
export default ProfileDetailPage;