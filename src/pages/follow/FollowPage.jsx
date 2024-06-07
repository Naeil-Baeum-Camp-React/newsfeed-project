import styled from 'styled-components';
import Search from '../../components/common/Search.jsx';
import UserBlogList from '../../components/app/user/UserBlogList.jsx';
import supabase from '../../config/supabase.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FollowPage() {
  const {userId} = useParams();
  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    fetchFollowList();
  });

  const fetchFollowList = (searchKeyword = '') => {
      supabase.rpc('fetch_user_follows', {
        param: userId,
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
        <UserBlogList userBlogList={followList} />
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

export default FollowPage;
