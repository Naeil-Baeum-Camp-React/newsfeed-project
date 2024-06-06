import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogLayout from '../components/layout/BlogLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import JoinPage from '../pages/Join/JoinPage.jsx';
import SetUserData from '../pages/Join/SetUserData.jsx';
import LoginMainPage from '../pages/Login/LoginMainPage.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import PostCreatingPage from '../pages/post/PostCreatingPage.jsx';
import PostDetailPage from '../pages/post/PostDetailPage.jsx';
import PostsPage from '../pages/post/PostsPage.jsx';
import BlogListPage from '../pages/blog/BlogListPage.jsx';
import FollowPage from '../pages/follow/FollowPage.jsx';
import { AuthDefaultLayout } from '../styles/StyleComponents.jsx';
// import PostInserting from '../pages/PostInserting.jsx';
import ProfileDetailPage from '../pages/profile/ProfileDetailPage.jsx';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProfileDetailPage" element={<ProfileDetailPage />} />
        
        <Route element={<AuthDefaultLayout />}>
          <Route path="/login" element={<LoginMainPage />} />
          <Route path="/login/email" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/join/info" element={<SetUserData />} />
          <Route />
        </Route>

        <Route path="/" element={<BlogLayout />}>
          <Route path=":userId/blog/posts" element={<PostsPage />} />
          <Route path=":userId/blog/posts/:postId" element={<PostDetailPage />} />
          <Route path=":userId/blog/posts/create" element={<PostCreatingPage />} />
          <Route path=":userId/following" element={<FollowPage />} />
          <Route path=":userId/blogs" element={<BlogListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
