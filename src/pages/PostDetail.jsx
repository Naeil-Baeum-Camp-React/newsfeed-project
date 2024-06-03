import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../config/supabase.js';
import { useEffect, useState } from 'react';
import formatDate, { DATE_FORMATS } from '../utils/dateFormatUtils.js';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from('POSTS')
      .select('*')
      .eq('id', postId)
      .then((response) => {
        const {data, error} = response;
        if (error){
          console.error(error.message);
          alert("오류가 발생했습니다.");
          navigate("/userId/posts")
        }

        const dbPost = data.find(dbData => dbData.id === postId);
        setPost({
          ...dbPost,
          created_at: formatDate(new Date(dbPost.created_at), DATE_FORMATS.KOREAN),
        });
      });

  }, [postId]);

  return (
    <PostWrapper>
      <PostHeaderContainer>
        <PostTitle>
          {post.title}
        </PostTitle>
        <PostCreatedAt>  {post.created_at}</PostCreatedAt>
        <PostTitleLine />
      </PostHeaderContainer>
      <PostContentsContainer>
        {post.contents}
      </PostContentsContainer>
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
    border: 1px solid #3AA6B9;
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
    background: #FFFFFF;
    word-wrap: break-word;
`;

export default PostDetail;