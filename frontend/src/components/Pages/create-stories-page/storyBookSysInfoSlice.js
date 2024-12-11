import { createSlice } from "@reduxjs/toolkit";

const storyBookSysInfoSlice = createSlice({
  name: 'storyBookSysInfo',
  initialState: {
    userToken: null,
    firstChapter: false,
    storyInProgress: false,
    character: null,
    genre: null,
    artStyle: null,
    GPTPromptHistory: [],
    SDPromptHistory: [],
    storyInSync: null,
    mongoID: null,
  },
  reducers: {
    setUserToken: {
      reducer(state, action) {
        state.userToken = action.payload.userToken
      },
      prepare(userToken) {
        return {
          payload: {
            userToken
          }
        }
      }
    },
    initialiseStory: {
      reducer(state, action) {
        state.firstChapter = true
        state.character = action.payload.character
        state.genre = action.payload.genre
        state.artStyle = action.payload.artStyle
        state.GPTPromptHistory.push(action.payload.GPTPrompt)
      },
      prepare(character, genre, artStyle, GPTPrompt) {
        return {
          payload: {
            character,
            genre,
            artStyle,
            GPTPrompt,
          }
        }
      },
    },
    initialiseStoryFromDB: {
      reducer(state, action) {
        state.firstChapter = false
        state.storyInProgress = true
        state.storyInSync = true
        state.character = action.payload.character
        state.genre = action.payload.genre
        state.artStyle = action.payload.artStyle
        state.GPTPromptHistory = action.payload.GPTPrompt
        state.mongoID = action.payload.mongoID
        state.SDPromptHistory = action.payload.SDPromptHistory
      },
      prepare(character, genre, artStyle, GPTPrompt, mongoID, SDPromptHistory) {
        return {
          payload: {
            character,
            genre,
            artStyle,
            GPTPrompt,
            mongoID,
            SDPromptHistory
          }
        }
      },
    },
    pushGPTPrompt: {
      reducer(state, action) {
        state.GPTPromptHistory.push(action.payload.GPTPrompt)
      },
      prepare(GPTPrompt) {
        return {
          payload: {
            GPTPrompt
          }
        }
      }
    },
    pushSDPrompt: {
      reducer(state, action) {
        state.SDPromptHistory.push(action.payload.SDPrompt)
      },
      prepare(SDPrompt) {
        return {
          payload: {
            SDPrompt
          }
        }
      }
    },
    setFirstChapter: {
      reducer(state, action) {
        state.firstChapter = action.payload.firstChapterBool
      },
      prepare(firstChapterBool) {
        return {
          payload: {
            firstChapterBool
          }
        }
      }
    },
    setStoryInProgress: {
      reducer(state, action) {
        state.storyInProgress = action.payload.inProgressBool
    },
      prepare(inProgressBool) {
        return {
          payload: {
            inProgressBool
          }
        }
      }
    },
    setStoryInSync: (state, action) => {
      state.storyInSync = action.payload
    },
    setMongoID: {
      reducer(state, action) {
        state.mongoID = action.payload.mongoID
      },
      prepare(mongoID) {
        return {
          payload: {
            mongoID
          }
        }
      }
    },
    refreshChapterPrep: (state) => {
      state.GPTPromptHistory.pop()
    },
    resetSysInfo: (state) => {
      state.userToken = null
      state.storyInProgress = false
      state.firstChapter = true
      state.character = null
      state.genre = null
      state.artStyle = null
      state.GPTPromptHistory = []
      state.SDPromptHistory = []
      state.mongoID = null
    },
    resetStorySysInfo: (state) => {
      state.storyInProgress = false
      state.firstChapter = true
      state.character = null
      state.genre = null
      state.artStyle = null
      state.GPTPromptHistory = []
      state.SDPromptHistory = []
      state.mongoID = null
    }
  },
});

export const selectUserToken = (state) => state.storyBookSysInfo.userToken;
export const selectStoryInProgress = (state) => state.storyBookSysInfo.storyInProgress;
export const selectFirstChapter = (state) => state.storyBookSysInfo.firstChapter;
export const selectCharacter = (state) => state.storyBookSysInfo.character;
export const selectGenre = (state) => state.storyBookSysInfo.genre;
export const selectGPTPromptHistory = (state) => state.storyBookSysInfo.GPTPromptHistory;
export const selectSDPromptHistory = (state) => state.storyBookSysInfo.SDPromptHistory;
export const selectArtStyle = (state) => state.storyBookSysInfo.artStyle;
export const selectStoryInSync = (state) => state.storyBookSysInfo.storyInSync;
export const selectMongoID = (state) => state.storyBookSysInfo.mongoID;


export const { setUserToken, initialiseStory, initialiseStoryFromDB, pushGPTPrompt, pushSDPrompt, setStoryInSync, setFirstChapter, setStoryInProgress, setMongoID, refreshChapterPrep, resetSysInfo, resetStorySysInfo } = storyBookSysInfoSlice.actions;
export default storyBookSysInfoSlice.reducer;