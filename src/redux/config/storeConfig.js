import { configureStore } from '@reduxjs/toolkit';
import posts from '../slices/postsSlice.js';

const store = configureStore({
  reducer: { posts },
});

export default store;