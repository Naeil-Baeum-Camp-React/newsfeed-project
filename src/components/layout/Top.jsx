import styled from 'styled-components';

function Top() {
  return (
    <TopWrapper>
      <LeftWrapper>
        <LeftContainer>
          <Logo>
            <LogoText>
              B
            </LogoText>
          </Logo>
          <BlogName>
            블로그 이름
          </BlogName>
        </LeftContainer>
      </LeftWrapper>
      <RightContainer>
        <LogoutDiv>
          로그아웃
        </LogoutDiv>
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

    background: #FFFFFF;
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
    color: #FFFFFF;
`;

const Logo = styled.div`
    /* Rectangle 276 */
    position: absolute;
    width: 30px;
    height: 30px;
    background: #3AA6B9;
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

    background: #FFFFFF;
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

    color: #3A3E41;
`;

export default Top;