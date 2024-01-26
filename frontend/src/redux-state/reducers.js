import { combineReducers } from "@reduxjs/toolkit";
import storyBookReducer from '../components/story-book/storyBookSlice'

const rootReducer = combineReducers({
  storyBook: storyBookReducer,
});

export default rootReducer;