import styled from 'styled-components';

function UserBlogList({userList}) {
  return (
    <UserBlogListContainer>
      {
        userList.map(follow => {
          return  (
            <UserBox key={follow.id}>
              <UserProfile $imageUrl={follow.profileImage}></UserProfile>
              <UserBlogName>{follow.blogName}</UserBlogName>
              <FollowerCount>팔로워 :{follow.followersCount}</FollowerCount>
            </UserBox>
          )
        })
      }
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
`;

const UserBox = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;

const UserProfile = styled.image`
    width: 150px;
    height: 150px;
    background: #D9D9D9;
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