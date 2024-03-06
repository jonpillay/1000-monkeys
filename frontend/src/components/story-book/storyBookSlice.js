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
        state.chapterImages.push(action.payload.chapterImage)
        state.chapterTexts.push(action.payload.chapterText)
      },
      prepare(chapterImage, chapterText) {
        return {
          payload: {
            chapterImage,
            chapterText,
          }
        }
      },
    },
    loadIntoCreate: {
      reducer(state, action) {
        state.chapterImages = action.payload.chapterImages
        state.chapterTexts = action.payload.chapterTexts
        state.renderChapter = action.payload.chapterImages.length - 1
      },
      prepare(chapterImages, chapterTexts) {
        return {
          payload: {
            chapterImages,
            chapterTexts,
          }
        }
      }
    },
    nextPage: (state) => {
      state.renderChapter += 1
    },
    previousPage: (state) => {
      state.renderChapter -= 1
    },
    turnToPage: (state, action) => {
      state.renderChapter = action.payload
    },
    turnToLastPage: (state) => {
      state.renderChapter = state.chapterImages.length-1
    },
    resetStoryBookSlice: (state) => {
      state.chapterImages = []
      state.chapterTexts = []
      state.renderChapter = 0
    }
  },
});

export const selectAllChapterImages = (state) => state.storyBook.chapterImages;
export const selectAllChapterTexts = (state) => state.storyBook.chapterTexts;
export const selectRenderChapter = (state) => state.storyBook.renderChapter;

// export const storyBook = (state) => state.storyBook;

export const { addChapter, nextPage, previousPage, turnToPage, turnToLastPage, loadIntoCreate, resetStoryBookSlice } = storyBookSlice.actions;
export default storyBookSlice.reducer;