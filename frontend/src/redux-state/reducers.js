import { combineReducers } from "@reduxjs/toolkit";
import storyBookReducer from '../components/CreateStoryPageParts/story-book-create/storyBookSlice'
import storyBookSysInfoReducer from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

const rootReducer = combineReducers({
  storyBook: storyBookReducer,
  storyBookSysInfo: storyBookSysInfoReducer,
});

export default rootReducer;