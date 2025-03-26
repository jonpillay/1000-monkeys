import { createSlice } from "@reduxjs/toolkit";

const systemInfoSlice = createSlice({

  name: 'systemInfoSlice',

  initialState: {
    warnings: 0,
    AiEngineVer: [],
    characters: [],
    genres: [],
    artStyles: []
  },
  reducers: {
    initiliseSystemInfo: {
      reducer(state, action) {
        state.AiEngineVer = action.payload.AiEngineVer
        state.characters = action.payload.characters
        state.genres = action.payload.genres
        state.artStyles = action.payload.artStyles
      },
      prepare(AiEngineVer, characters, genres, artStyles) {
        return {
          payload: {
            AiEngineVer,
            characters,
            genres,
            artStyles
          }
        }
      }
    },
    issueMultiWarnings: {
      reducer(state, action) {
        state.warnings = state.warnings + action.payload.warningAmount
      },
      prepare(warningAmount) {
        return {
          payload: {
            warningAmount
          }
        } 
      }
    },
    issueWarning: (state) => {
      state.warnings += 1;
    },
    resetWarnings: (state) => {
      state.warnings = 0;
    },
  },
})

export const selectAllWarnings = (state) => state.systemInfo.warnings;
export const selectAllCharacters = (state) => state.systemInfo.characters;
export const selectAllGenres = (state) => state.systemInfo.genres;
export const selectAllArtStyles = (state) => state.systemInfo.artStyles;
export const selectAiEngineVer = (state) => state.systemInfo.AiEngineVer;


export const { initiliseSystemInfo, issueMultiWarnings, issueWarning, resetWarnings } = systemInfoSlice.actions;
export default systemInfoSlice.reducer;