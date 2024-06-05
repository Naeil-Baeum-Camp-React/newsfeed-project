import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import JoinPage from '../pages/Join/JoinPage.jsx';
import LoginMainPage from '../pages/Login/LoginMainPage.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import PostDetailPage from '../pages/PostDetailPage.jsx';
import PostsPage from '../pages/PostsPage.jsx';
import SupabaseExample from '../pages/SupabaseExample.jsx';
import { AuthDefaultLayout } from '../styles/StyleComponents.jsx';
import FollowPage from '../pages/follow/FollowPage.jsx';
import BlogListPage from '../pages/blog/BlogListPage.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthDefaultLayout />}>
          <Route path="/login" element={<LoginMainPage />}></Route>
          <Route path="/login/email" element={<LoginPage />}></Route>
          <Route path="/join" element={<JoinPage />}></Route>
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path=":userId/blog/posts" element={<PostsPage />} />
          <Route path=":userId/blog/posts/:postId" element={<PostDetailPage />} />
          <Route path=":userId/following" element={<FollowPage />} />
          <Route path=":userId/all-blog" element={<BlogListPage />} />
          {/*   레이아웃이 필요한 페이지는 supabase와 같이 이 안에 Route 를 넣어주세요 로그인 관련 Route는 밖에 빼주세요.*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
