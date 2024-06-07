import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import defaultImage from '../../../asset/default-profile.jpg';

function UserBlogList({ userBlogList }) {
  const navigate = useNavigate();

  const moveTargetUserBlog = (targetUserId) => {
    navigate(`/${targetUserId}/blog/posts`);
  };

  return (
    <UserBlogListContainer>
      {userBlogList.map((follow) => {
        return (
          <UserBox key={follow.id} onClick={() => moveTargetUserBlog(follow.id)}>
            <UserProfile src={follow.profileImage ? follow.profileImage : defaultImage}></UserProfile>
            <UserBlogName>{follow.blogName}</UserBlogName>
            <FollowerCount>팔로워 :{follow.followersCount}</FollowerCount>
          </UserBox>
        );
      })}
    </UserBlogListContainer>
  );
}

const UserBlogListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;

const UserBox = styled.div`
  padding: 10px 0;
  width: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: all 0.3s ease;
  }
`;

const UserProfile = styled.img`
  width: 220px;
  height: 220px;
  background: #d9d9d9;
  border-radius: 5px;
  margin-bottom: 5px;
  object-fit: cover;
`;

const UserBlogName = styled.div`
  /* 블로그명 */
  width: 100px;
  height: 19px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  color: #000000;
`;

const FollowerCount = styled.div`
  width: 100px;
  height: 19px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
`;

export default UserBlogList;
