import styled from 'styled-components';
const Post = () => {
  return (
    <>
      <PostTitle placeholder="제목" />
      <PostBox>
        <p>블라블라 왈라왈라</p>
      </PostBox>
      <div>
        <SaveButton>저장</SaveButton>
        <CancelButton>취소</CancelButton>
      </div>
    </>
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

const PostBox = styled.div`
  width: 700px;
  min-height: 300px;
  border: 1px solid #d2dade;
  border-radius: 10px;
  margin: auto;
  padding: 5px;
`;

const SaveButton = styled.button`
  width: 100px;
  color: blue;
`;

const CancelButton = styled.button`
  width: 100px;
  color: red;
`;
