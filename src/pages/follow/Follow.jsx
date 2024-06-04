import styled from 'styled-components';
import Search from '../../components/common/Search.jsx';
import UserBlogList from '../../components/app/user/UserBlogList.jsx';
import { useUser } from '../../contexts/login.context.jsx';
import supabase from '../../config/supabase.js';
import { useEffect, useRef, useState } from 'react';

function Follow() {
  const { userData } = useUser();
  const [followList, setFollowList] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchFollowList();
  }, []);

  const fetchFollowList = (searchKeyword = '') => {
      supabase.rpc('fetch_user_follows', {
        param: userData.userId,
        keyword: searchKeyword,
      }).then(response => {
          if (!response.error){
            setFollowList(response.data?.map(follow => {
              return {
                id: follow.user_id,
                profileImage: follow.profile_image,
                blogName: follow.blog_name,
                followersCount: follow.followers_count,
              };
            }));
          }
      });
  };

  const search = (searchKeyword) => {
    fetchFollowList(searchKeyword);
  };

  return (
    <FollowingWrapper>
      <SearchWrapper>
        <Search search={search} />
      </SearchWrapper>
      <UserBlogListWrapper>
        <UserBlogList followList={followList} />
      </UserBlogListWrapper>
    </FollowingWrapper>
  );
}

const FollowingWrapper = styled.div`
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

export default Follow;
