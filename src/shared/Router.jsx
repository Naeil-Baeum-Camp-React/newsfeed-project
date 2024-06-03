import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SupabaseExample from '../pages/SupabaseExample.jsx';
import Layout from '../components/layout/Layout.jsx';
import PostsList from '../pages/PostsList.jsx';
import Post from '../pages/Post.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/:userId/blog" element={<Post />}></Route>
          <Route path="/supabase" element={<SupabaseExample />} />
          <Route path="/blog/:userId" element={<PostsList />} />
          {/*   레이아웃이 필요한 페이지는 supabase와 같이 이 안에 Route 를 넣어주세요 로그인 관련 Route는 밖에 빼주세요.*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
