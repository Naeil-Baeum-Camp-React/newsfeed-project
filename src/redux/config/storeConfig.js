import { configureStore } from '@reduxjs/toolkit';
import blog from '../slices/blogSlice.js';

const store = configureStore({
  reducer: { blog },
});

export default store;
