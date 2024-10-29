import { combineReducers } from "@reduxjs/toolkit";
import storyBookReducer from '../components/story-book/storyBookSlice'
import storyBookSysInfoReducer from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

const rootReducer = combineReducers({
  storyBook: storyBookReducer,
  storyBookSysInfo: storyBookSysInfoReducer,
});

export default rootReducer;