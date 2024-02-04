import { createSlice } from "@reduxjs/toolkit";

const sysInfoSlice = createSlice({
  name: 'storyBookSysInfo',
  initialState: {
    storyInProgress: false,
    character: null,
    genre: null,
    artStyle: null,
  },
  reducers: {
    initialiseStory: {
      reducer(state, action) {
        console.log("made it here in the sysInfo slice")
        state.storyInProgress = true
        state.character = action.payload.character
        state.genre = action.payload.genre
        state.artStyle = action.payload.artStyle
      },
      prepare(character, genre, artStyle) {
        return {
          payload: {
            character,
            genre,
            artStyle
          }
        }
      },
    },
    reset: (state) => {
      state.storyInProgress = false
      state.character = null
      state.genre = null
      state.artStyle = null
    }
  },
});

export const storyInProgress = (state) => state.storyBookSysInfo.storyInProgress;
export const selectCharacter = (state) => state.storyBookSysInfo.character;
export const selectGenre = (state) => state.storyBookSysInfo.genre;
export const selectArtStyle = (state) => state.storyBookSysInfo.artStyle;


// export const storyBook = (state) => state.storyBook;

export const { initialiseStory, reset } = sysInfoSlice.actions;
export default sysInfoSlice.reducer;