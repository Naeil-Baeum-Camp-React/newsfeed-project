import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MenuBar from './MenuBar.jsx';
import Profile from './Profile.jsx';
import Top from './Top.jsx';

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
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  position: absolute;
  width: 800px;
  height: 570px;
  left: 220px;
  top: 110px;

  background: #ffffff;
  box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: auto; /* 스크롤 추가 */
`;
export default Layout;
