const PostInputLayout = () => {
  return (
    <div className="PostWrapper">
      <h1>제목입니다.</h1>
      <div className="postHeaderContainer">
        <input className="PostTitle" />
      </div>
      <hr className="PostTitleLine" />
      <div className="PostContentsContainer">
        <textarea className="PostContents" />
      </div>
      <h1>내용입니다</h1>
      <div className="PostButtonWrapper">
        <button className="저장/수정/수정완료">버튼1 : 저장/수정/수정완료</button>
        <button className="취소/삭제/수정취소">버튼2 : 취소/삭제/수정취소</button>
      </div>
    </div>
  );
};

export default PostInputLayout;
