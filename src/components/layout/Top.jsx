import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';

function Top() {
  const { logout, userData } = useUser();
  const navigate = useNavigate();
  const handleClickLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('로그인 실패');
    }
    return logout();
  };
  return (
    <TopWrapper>
      <LeftWrapper>
        <LeftContainer>
          <Logo>
            <LogoText>B</LogoText>
          </Logo>
          <BlogName>블로그 이름</BlogName>
        </LeftContainer>
      </LeftWrapper>
      <RightContainer>
        {userData.isLogedIn ? (
          <LogoutDiv
            onClick={async () => {
              await handleClickLogout();
            }}
          >
            로그아웃
          </LogoutDiv>
        ) : (
          <LogoutDiv onClick={() => navigate('/login')}>로그인</LogoutDiv>
        )}
      </RightContainer>
    </TopWrapper>
  );
}

const TopWrapper = styled.div`
  /* 로그인 후 */
  position: absolute;
  width: 1062px;
  height: 80px;

  filter: drop-shadow(5px 3px 3px rgba(0, 0, 0, 0.15));
`;

const LeftWrapper = styled.div`
  /* Rectangle 261 */

  position: absolute;
  width: 194px;
  height: 80px;
  left: 26px;
  top: 18px;

  background: #ffffff;
  border-radius: 10px 20px 0px 10px;
`;

const LeftContainer = styled.div`
  position: absolute;
  left: 27px;
  top: 23px;
`;

const LogoText = styled.p`
  position: absolute;
  width: 14px;
  height: 17px;
  left: 10px;
  top: 5px;

  font-family: 'Istok Web';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  color: #ffffff;
`;

const Logo = styled.div`
  /* Rectangle 276 */
  position: absolute;
  width: 30px;
  height: 30px;
  background: #3aa6b9;
  border-radius: 10px;
`;

const BlogName = styled.p`
  position: absolute;
  width: 79px;
  height: 19px;
  left: 37px;
  top: 7px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
`;

const RightContainer = styled.div`
  /* Rectangle 262 */

  position: absolute;
  width: 868px;
  height: 80px;
  left: 220px;
  top: 18px;

  background: #ffffff;
  border-radius: 20px 10px 10px 0px;
`;

const LogoutDiv = styled.div`
  border: none;
  position: absolute;
  width: 70px;
  height: 30px;
  top: 30px;
  left: 700px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 19px;

  color: #3a3e41;
`;

export default Top;
