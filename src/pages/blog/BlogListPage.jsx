import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../../config/supabase.js';
import Search from '../../components/common/Search.jsx';
import UserBlogList from '../../components/app/user/UserBlogList.jsx';
import styled from 'styled-components';

function BlogListPage() {
  const { userId } = useParams();
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetchUserBlogList();
  }, []);

  const fetchUserBlogList = (searchKeyword = '') => {
    supabase
      .from('USERS')
      .select('*')
      .order('created_at', { ascending: false })
      .ilike('blog_name', `%${searchKeyword}%`)
      .then(response => {
        if (!response.error) {
          setBlogList(response.data?.map(user => {
            return {
              id: user.id,
              profileImage: user.profile_image,
              blogName: user.blog_name,
              followersCount: user.followers_count,
            };
          }));
        }
      });
  };

  const search = (searchKeyword) => {
    fetchUserBlogList(searchKeyword);
  };

  return (
    <BlogListWrapper>
      <SearchWrapper>
        <Search search={search} />
      </SearchWrapper>
      <UserBlogListWrapper>
        <UserBlogList userBlogList={blogList} />
      </UserBlogListWrapper>
    </BlogListWrapper>
  );
}

const BlogListWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UserBlogListWrapper = styled.div`
    width: 100%;
`;

const SearchWrapper = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
`;

export default BlogListPage;