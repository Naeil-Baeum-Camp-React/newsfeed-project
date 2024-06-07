import Top from './Top.jsx';
import MenuBar from './MenuBar.jsx';
import Profile from './Profile.jsx';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <LayoutWrapper>
      <Top />
      <MenuBar />
      <Contents>
        <Outlet />
      </Contents>
      <Profile />
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
    /* Group 6 */

  position: absolute;
  width: 1200px;
  height: 800px;


`;

const Contents = styled.div`
    /* Rectangle 279 */

  box-sizing: border-box;

  position: absolute;
  width: 1140px;
  height: 750px;

  border: 1px dashed #FFFFFF;
  border-radius: 20px;

    overflow: auto; /* 스크롤 추가 */
`;
export default Layout;