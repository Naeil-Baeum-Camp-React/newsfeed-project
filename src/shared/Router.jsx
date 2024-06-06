import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogLayout from '../components/layout/BlogLayout.jsx';
import JoinPage from '../pages/Join/JoinPage.jsx';
import LoginMainPage from '../pages/Login/LoginMainPage.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import PostDetailPage from '../pages/PostDetailPage.jsx';
import PostsPage from '../pages/PostsPage.jsx';
import { AuthDefaultLayout } from '../styles/StyleComponents.jsx';
import FollowPage from '../pages/follow/FollowPage.jsx';
import BlogListPage from '../pages/blog/BlogListPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import PostInserting from '../pages/PostInserting.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<AuthDefaultLayout />}>
          <Route path="/login" element={<LoginMainPage />}></Route>
          <Route path="/login/email" element={<LoginPage />}></Route>
          <Route path="/join" element={<JoinPage />}></Route>
        </Route>

        <Route path="/" element={<BlogLayout />}>
          <Route path=":userId/blog/posts" element={<PostsPage />} />
          <Route path=":userId/blog/posts/:postId" element={<PostDetailPage />} />
          <Route path=":userId/blog/posts/insert" element={<PostInserting />}></Route>
          <Route path=":userId/following" element={<FollowPage />} />
          <Route path=":userId/blogs" element={<BlogListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
