import { createSlice } from "@reduxjs/toolkit";

const storyBookSlice = createSlice({
  name: 'storyBook',
  initialState: {
    chapterImages: [],
    chapterTexts: [],
    renderChapter: 0,
  },
  reducers: {
    addChapter: {
      reducer(state, action) {
      state.chapterImages = state.chapterImages.push(action.payload.chapterImage)
      state.chapterTexts = state.chapterTexts.push(action.payload.chapterText)
    },
    prepare(chapterImage, chapterText) {
      return {
        payload: {
          chapterImage,
          chapterText,
        }
      }
    }
    },
    nextPage: (state) => {
      state.renderChapter = state.renderChapter + 1
    },
    previousPage: (state) => {
      state.renderChapter = state.renderChapter - 1
    },
  },
});

export const selectAllChapterImages = (state) => state.chapterImages;
export const selectAllChapterTexts = (state) => state.chapterTexts;
export const selectRenderChapter = (state) => state.renderChapter;

export const { addChapter, nextPage, previousPage } = storyBookSlice.actions;
export default storyBookSlice.reducer;