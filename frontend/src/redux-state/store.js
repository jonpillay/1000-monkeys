import { configureStore } from '@reduxjs/toolkit';

import storyBookReducer from '../components/story-book/storyBookSlice' 

export const store = configureStore({
  reducer: {
    storyBookReducer,
  }
})