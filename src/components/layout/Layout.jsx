import Top from './Top.jsx';
import MenuBar from './MenuBar.jsx';
import Profile from './Profile.jsx';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Post from '../../pages/Post.jsx';

function Layout() {
  return (
    <LayoutWrapper>
      <Top />
      <MenuBar />
      <Contents>
        <Post />
        <Outlet />
      </Contents>
      <Profile />
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  position: absolute;
  width: 1100px;
  height: 700px;
  left: calc(50% - 1100px / 2 - 0.5px);
  top: 5px;

  //background: #FFF6F8;
  background: #f8f1f3;
  border-radius: 10px;
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
