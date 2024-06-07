import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../../contexts/login.context.jsx';
import MenuBar from './MenuBar.jsx';
import Profile from './Profile.jsx';
import Top from './Top.jsx';

function BlogLayout() {
  const { userData } = useUser();
  const navigate = useNavigate();

  if (!userData.isLogedIn) {
    navigate('/login');
  }

  return (
    <BlogLayoutWrapper>
      <Top />
      <MenuBar />
      <Contents>
        <Outlet />
        <MarginBottom />
      </Contents>
      <Profile />
    </BlogLayoutWrapper>
  );
}

const BlogLayoutWrapper = styled.div`
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
const MarginBottom = styled.div`
  height: 30px;
`;
export default BlogLayout;
