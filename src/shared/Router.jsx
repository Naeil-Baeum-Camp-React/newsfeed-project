import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import JoinPage from '../pages/Join/JoinPage.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import PostDetail from '../pages/PostDetail.jsx';
import Posts from '../pages/Posts.jsx';
import SupabaseExample from '../pages/SupabaseExample.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/supabase" element={<SupabaseExample />} />
          <Route path=":userId/posts" element={<Posts />} />
          <Route path=":userId/posts/:postId" element={<PostDetail />} />
          {/*   레이아웃이 필요한 페이지는 supabase와 같이 이 안에 Route 를 넣어주세요 로그인 관련 Route는 밖에 빼주세요.*/}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/join" element={<JoinPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
