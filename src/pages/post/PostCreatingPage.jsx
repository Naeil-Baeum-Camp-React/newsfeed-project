import supabase from '../../config/supabase.js';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
const PostCreatingPage = () => {
  const [post, setPost] = useState({
    id: '',
    title: '',
    contents: '',
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('POSTS').insert({ title, contents: content }).select().throwOnError();
    if (error) {
      console.error(error.message);
      alert('게시글 생성에 실패했습니다.');
      navigate(`/${userId}/blog/posts`);
    } else {
      setPost(...data);
      alert('게시글이 생성되었습니다.');
      navigate(`/${userId}/blog/posts`);
    }
  };

  return (
    <PostWrapper>
      <PostTitle placeholder="게시글의 제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
      <PostContent
        placeholder="게시글의 내용을 입력해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ButtonWrapper>
        <PostSaveButton onClick={handleCreatePost}>저장</PostSaveButton>
        <PostCancelButton onClick={() => navigate(`/${userId}/blog/posts`)}>취소</PostCancelButton>
      </ButtonWrapper>
    </PostWrapper>
  );
};

export default PostCreatingPage;

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
