import supabase from '../config/supabase';
import { useState } from 'react';
import styled from 'styled-components';
const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('POSTS').insert({ title, contents: content }).select().throwOnError();
  };

  return (
    <form>
      <PostTitle placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <PostContent placeholder="블라블라" value={content} onChange={(e) => setContent(e.target.value)} />
      <ButtonWrapper>
        <SaveButton onClick={handleSave}>저장</SaveButton>
        <CancelButton>취소</CancelButton>
      </ButtonWrapper>
    </form>
  );
};

export default Post;

const PostTitle = styled.input`
  width: 700px;
  min-height: 50px;
  border: 1px solid #d2dade;
  border-radius: 10px;
  margin: 25px;
  font-size: 20pt;
`;

const PostContent = styled.textarea`
  width: 700px;
  min-height: 300px;
  border: 1px solid #d2dade;
  border-radius: 10px;
  background-color: #ffffff;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  width: 700px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-left: 10px;
`;

const SaveButton = styled.button`
  width: 100px;
  color: blue;
`;

const CancelButton = styled.button`
  width: 100px;
  color: red;
`;
