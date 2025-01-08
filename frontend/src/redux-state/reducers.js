import { combineReducers } from "@reduxjs/toolkit";
import storyBookReducer from '../components/CreateStoryPageParts/story-book-create/storyBookSlice'
import storyBookSysInfoReducer from "../components/Pages/create-stories-page/storyBookSysInfoSlice";
import systemInfoReducer from "../components/app/systemInfoSlice"

const rootReducer = combineReducers({
  storyBook: storyBookReducer,
  storyBookSysInfo: storyBookSysInfoReducer,
  systemInfo: systemInfoReducer
});

export default rootReducer;