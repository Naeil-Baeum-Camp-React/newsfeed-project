import styled from 'styled-components';

function Profile() {
  return (
    <Wrapper>
      <Setting></Setting>
      <Img>
        <form action="">
          <input type="file" />
        </form>
      </Img>
      <Nickname></Nickname>
      <ProfileDetails></ProfileDetails>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    position: absolute;
    width: 180px;
    height: 570px;
    left: 26px;
    top: 110px;

    background: #FFFFFF;
    box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

`

const Setting = styled.button`
  /* 설정 img */

  position: absolute;
  width: 15px;
  height: 15px;
  left: 153px;
  top: 8px;

  background: url(image.png);
`

const Img = styled.div`
  /* 이미지 */

  box-sizing: border-box;

  position: absolute;
  width: 140px;
  height: 138px;
  left: 20px;
  top: 26px;

  border: 2px solid #E0E0E0;
  border-radius: 10px;

`
const Nickname = styled.textarea`
  /* 닉네임 */

  box-sizing: border-box;

  position: absolute;
  width: 140px;
  height: 40px;
  left: 20px;
  top: 174px;

  border: 2px solid #E0E0E0;
  border-radius: 10px;

`

const ProfileDetails = styled.textarea`
  /* 프로필 기본사항 */

  box-sizing: border-box;

  position: absolute;
  width: 140px;
  height: 168px;
  left: 20px;
  top: 224px;

  border: 2px solid #E0E0E0;
  border-radius: 10px;
`

export default Profile;