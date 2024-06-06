import { createSlice } from '@reduxjs/toolkit';
import formatDate, { DATE_FORMATS } from '../../utils/dateFormatUtils.js';

const initialState = {
  posts: [],
};

const blogSlice = createSlice({
  name: 'blog', // 이 모듈의 이름
  initialState, // 이 모듈의 초기상태 값
  reducers: {
    // 이 모듈의 Reducer 로직
    fetchPosts: (state, action) => {
      state.posts = action.payload.map((post) => {
        return {
          id: post.id,
          contents: post.contents,
          createdAt: formatDate(new Date(post.created_at), DATE_FORMATS.KOREAN),
          title: post.title,
        };
      });
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { fetchPosts } = blogSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default blogSlice.reducer;
