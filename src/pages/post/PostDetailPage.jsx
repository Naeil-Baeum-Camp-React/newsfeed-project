import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../config/supabase.js';
import { useUser } from '../../contexts/login.context.jsx';
import formatDate, { DATE_FORMATS } from '../../utils/dateFormatUtils.js';

function PostDetailPage() {
  const { userData } = useUser();
  const { postId, userId } = useParams();

  const [post, setPost] = useState({
    id: postId,
    title: '',
    contents: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from('POSTS')
      .select('*')
      .eq('id', postId)
      .then((response) => {
        const { data, error } = response;
        if (error) {
          alert('오류가 발생했습니다.');
          navigate(`/${userId}/blog/posts`);
        }

        const dbPost = data.find((dbData) => dbData.id === postId);
        setPost({
          ...dbPost,
          created_at: formatDate(new Date(dbPost.created_at), DATE_FORMATS.KOREAN),
        });
      });
  }, [postId]);

  const handleTogglePost = async () => {
    const { data, error } = await supabase
      .from('POSTS')
      .update({
        title: title,
        contents: content,
      })
      .eq('id', postId)
      .select();
    if (error) {
      alert('게시글 업데이트에 실패했습니다.');
      navigate(`/${userId}/blog/posts`);
    }

    setPost(...data);
    setIsEditing(false);
    alert('게시글의 수정이 완료되었습니다.');
    navigate(`/${userId}/blog/posts`);
  };

  const handleDeletePost = async () => {
    if (window.confirm('정말로 게시글을 삭제하시겠습니까?')) {
      const { error } = await supabase.from('POSTS').delete().eq('id', postId);
      if (error) {
        alert('게시글 삭제에 실패했습니다.');
        navigate(`/${userId}/blog/posts`);
      }
      alert('게시글이 삭제되었습니다.');
      navigate(`/${userId}/blog/posts`);
    }
  };

  return (
    <>
      <PostWrapper>
        <PostHeaderContainer>
          {isEditing ? (
            <PostTitle placeholder={post.title} onChange={(e) => setTitle(e.target.value)} />
          ) : (
            <PostTitleP>{post.title}</PostTitleP>
          )}
          <PostCreatedAt> {post.created_at}</PostCreatedAt>
          <PostTitleLine />
        </PostHeaderContainer>
        {isEditing ? (
          <PostContent placeholder={post.contents} onChange={(e) => setContent(e.target.value)} />
        ) : (
          <PostContentP>{post.contents}</PostContentP>
        )}
        <ButtonWrapper>
          {userData.userId !== userId ? (
            ''
          ) : (
            <PostSaveButton
              onClick={() => {
                isEditing ? handleTogglePost() : setIsEditing(true);
              }}
            >
              {isEditing ? '수정 완료' : '수정'}
            </PostSaveButton>
          )}
          {userData.userId !== userId ? (
            ''
          ) : isEditing ? (
            <PostCancelButton onClick={() => navigate(`/${userId}/blog/posts`)}>수정 취소</PostCancelButton>
          ) : (
            <PostCancelButton onClick={handleDeletePost}>삭제</PostCancelButton>
          )}
        </ButtonWrapper>
      </PostWrapper>
    </>
  );
}

export default PostDetailPage;

const PostWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 50px;
  gap: 30px;
`;
const PostHeaderContainer = styled.div`
  width: 100%;
  min-height: 100px;
`;

const PostTitle = styled.input`
  width: 90%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  color: #000000;
  border: 1px solid #d2dade;
  border-radius: 10px;
  margin: 0 auto;
`;
const PostTitleP = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  color: #000000;
`;

const PostTitleLine = styled.div`
  width: 50px;
  margin: 0 auto;
  border: 1px solid #3aa6b9;
`;

const PostCreatedAt = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  line-height: 50px;
  text-align: center;
`;

const PostContent = styled.textarea`
  width: 90%;
  min-height: 200px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #000000;
  border: 1px solid #d2dade;
  border-radius: 10px;
  background-color: #ffffff;
`;

const PostContentP = styled.p`
  width: 90%;
  min-height: 200px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #000000;
  background-color: #ffffff;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const PostSaveButton = styled.button`
  min-width: 100px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  background-color: #3aa6b9;
  border: 1px solid #3aa6b9;
  border-radius: 10px;
  color: white;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: all 0.1s ease;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;
const PostCancelButton = styled.button`
  min-width: 100px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  background-color: white;
  border: 1px solid #3aa6b9;
  border-radius: 10px;
  color: #3aa6b9;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: all 0.1s ease;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;
