import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../config/supabase.js';
import { useEffect, useState } from 'react';
import formatDate, { DATE_FORMATS } from '../utils/dateFormatUtils.js';

function PostDetailPage() {
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
          console.error(error.message);
          alert('오류가 발생했습니다.');
          navigate('/userId/blog/posts');
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
      console.error(error.message);
      alert('게시글 업데이트에 실패했습니다.');
      navigate('/:userId/blog/posts');
    }

    setPost(...data);
    setIsEditing(false);
    alert('게시글의 수정이 완료되었습니다.');
    navigate(`/${userId}/blog/posts`);
  };

  const handleDeletePost = async () => {
    if (window.confirm('정말로 게시글을 삭제하시겠습니까?')) {
      const { error } = await supabase.from('POSTS').delete().eq('id', postId);
      console.log(error);
      if (error) {
        console.error(error.message);
        alert('게시글 삭제에 실패했습니다.');
      } else {
        alert('게시글이 삭제되었습니다.');
        navigate(`/${userId}/blog/posts`);
      }
    }
  };

  return (
    <PostWrapper>
      <PostHeaderContainer>
        {isEditing ? (
          <input placeholder={post.title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <PostTitle>{post.title}</PostTitle>
        )}
        <PostCreatedAt> {post.created_at}</PostCreatedAt>
        <PostTitleLine />
      </PostHeaderContainer>
      <PostContentsContainer>
        {isEditing ? (
          <textarea placeholder={post.contents} onChange={(e) => setContent(e.target.value)} />
        ) : (
          post.contents
        )}
      </PostContentsContainer>
      <div>
        <button
          onClick={() => {
            isEditing ? handleTogglePost() : setIsEditing(true);
          }}
        >
          수정
        </button>
        <button onClick={handleDeletePost}>삭제</button>
      </div>
    </PostWrapper>
  );
}

const PostWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 50px;
`;
const PostHeaderContainer = styled.div`
  width: 487px;
  height: 100px;
`;
const PostTitle = styled.p`
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

const PostContentsContainer = styled.div`
  width: 500px;
  background: #ffffff;
  word-wrap: break-word;
`;

export default PostDetailPage;
