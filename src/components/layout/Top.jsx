import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../config/supabase';
import { useUser } from '../../contexts/login.context';
import { useModal } from '../../contexts/popup.context';

function Top() {
  const { logout, userData } = useUser();
  const { userId } = useParams();
  const [followCount, setFollowCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [blogName, setBlogName] = useState('');
  const { openModal } = useModal();

  const handleClickLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      openModal('로그인 실패', '입력한 정보를 다시 확인해주세요.');
    }
    return logout();
  };

  useEffect(() => {
    supabase
      .from('FOLLOW')
      .select('*')
      .eq('user_id', userData.userId)
      .eq('following_user_id', userId)
      .then((response) => {
        setIsFollowing(!response.error && response.data.length > 0);
      });
  });

  useEffect(() => {
    supabase
      .from('USERS')
      .select('*')
      .eq('id', userId)
      .then((response) => {
        if (!response.error) {
          setBlogName(response.data[0].blog_name);
          setFollowCount(response.data[0].followers_count);
        }
      });
  });

  const handleFollow = () => {
    if (isFollowing) deleteFollow();
    else createFollow();
  };

  const createFollow = () => {
    supabase
      .from('FOLLOW')
      .insert([{ following_user_id: userId, user_id: userData.userId }])
      .select()
      .then((response) => {
        if (!response.error) {
          updateIncrementUserFollowingCount();
        }
      });
  };

  const updateIncrementUserFollowingCount = () => {
    supabase.rpc('increment_followers_count', { param: userId }).then((response) => {
      if (!response.error) {
        setIsFollowing(true);
      }
    });
  };

  const updateDecrementUserFollowingCount = () => {
    supabase.rpc('decrement_followers_count', { param: userId }).then((response) => {
      if (!response.error) {
        setIsFollowing(false);
      }
    });
  };

  const deleteFollow = () => {
    supabase
      .from('FOLLOW')
      .delete()
      .eq('user_id', userData.userId)
      .eq('following_user_id', userId)
      .then((response) => {
        if (!response.error) {
          updateDecrementUserFollowingCount();
        }
      });
  };

  return (
    <TopWrapper>
      <LeftWrapper>
        <LeftContainer>
          <Follower>팔로워 : {followCount}</Follower>
          {userData.userId !== userId ? (
            <FollowButton onClick={handleFollow}>{isFollowing ? '언팔로우' : '팔로우'}</FollowButton>
          ) : (
            ''
          )}
        </LeftContainer>
      </LeftWrapper>
      <RightContainer>
        <BlogNameWrapper>
          <Logo>
            <LogoText>B</LogoText>
          </Logo>
          <BlogName>{blogName}</BlogName>
        </BlogNameWrapper>
        <LogoutDiv
          onClick={async () => {
            await handleClickLogout();
          }}
        >
          로그아웃
        </LogoutDiv>
      </RightContainer>
    </TopWrapper>
  );
}

const Follower = styled.div`
  margin-left: 30px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
`;

const TopWrapper = styled.div`
  /* 로그인 후 */
  position: absolute;
  width: 1062px;
  height: 80px;

  filter: drop-shadow(5px 3px 3px rgba(0, 0, 0, 0.15));
`;

const LeftWrapper = styled.div`
  /* Rectangle 261 */

  position: absolute;
  width: 194px;
  height: 80px;
  left: 26px;
  top: 18px;

  background: #ffffff;
  border-radius: 10px 20px 0px 10px;
`;

const LeftContainer = styled.div`
  position: absolute;
  left: 27px;
  top: 23px;
`;

const LogoText = styled.p`
  position: absolute;
  width: 14px;
  height: 17px;
  left: 10px;
  top: 5px;

  font-family: 'Istok Web';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  color: #ffffff;
`;

const Logo = styled.div`
  /* Rectangle 276 */
  position: absolute;
  width: 30px;
  height: 30px;
  background: #3aa6b9;
  border-radius: 10px;
`;

const BlogName = styled.p`
  position: absolute;
  width: 200px;
  height: 19px;
  left: 37px;
  top: 7px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
`;

const RightContainer = styled.div`
  /* Rectangle 262 */
  position: absolute;
  width: 868px;
  height: 80px;
  left: 220px;
  top: 18px;

  background: #ffffff;
  border-radius: 20px 10px 10px 0px;
`;

const LogoutDiv = styled.div`
  border: none;
  position: absolute;
  width: 70px;
  height: 30px;
  top: 30px;
  left: 700px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 19px;

  color: #3a3e41;
`;

const FollowButton = styled.button`
  position: absolute;
  box-sizing: border-box;
  width: 70px;
  height: 20px;
  left: 31px;
  top: 28px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.3s ease;
    border-color: royalblue;
  }
`;

const BlogNameWrapper = styled.div`
  position: absolute;
  left: 300px;
  top: 25px;

  &:hover {
    cursor: pointer;
  }
`;

export default Top;
