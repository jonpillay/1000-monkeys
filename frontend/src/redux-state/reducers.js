import { combineReducers } from "@reduxjs/toolkit";
import storyBookReducer from '../components/story-book/storyBookSlice'
import SysInfoReducer from "../components/app/SysInfoSlice";

const rootReducer = combineReducers({
  storyBook: storyBookReducer,
  sysInfo: SysInfoReducer,
});

export default rootReducer;