import { createSlice } from "@reduxjs/toolkit";

const storyBookSlice = createSlice({
  name: 'storyBook',
  initialState: {
    chapterImages: [],
    chapterTexts: [],
    renderChapter: 0,
  },
  reducers: {
    addChapter: (state, action) => {
      state.chapterImages = state.chapterImages.concat(action.payload.chapterImage)
      state.chapterTexts = state.chapterTexts.concat(action.payload.chapterText)
    },
    nextPage: (state) => {
      state.renderChapter = state.renderChapter + 1
    },
    previousPage: (state) => {
      state.renderChapter = state.renderChapter - 1
    },
  },
});

export const { addChapter, nextPage, previousPage } = storyBookSlice.actions;
export default storyBookSlice.reducer;