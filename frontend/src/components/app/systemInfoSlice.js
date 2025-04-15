import { createSlice } from "@reduxjs/toolkit";

const systemInfoSlice = createSlice({

  name: 'systemInfoSlice',

  initialState: {
    warnings: 0,
    AiEngineVer: null,
    characters: [],
    genres: [],
    artStyles: [],
    releaseLog: [],
    sysInfoExpiry: null
  },
  reducers: {
    initiliseSystemInfo: {
      reducer(state, action) {
        state.AiEngineVer = action.payload.AiEngineVer
        state.characters = action.payload.characters
        state.genres = action.payload.genres
        state.artStyles = action.payload.artStyles
        state.releaseLog = action.payload.releaseLog
        state.sysInfoExpiry = Date.now() + 12 * 60 * 60 * 1000;
      },
      prepare(AiEngineVer, characters, genres, artStyles, releaseLog) {
        return {
          payload: {
            AiEngineVer,
            characters,
            genres,
            artStyles,
            releaseLog
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
export const selectSysInfoExpiry = (state) => state.systemInfo.sysInfoExpiry;
export const selectAllReleaseLog = (state) => state.systemInfo.releaseLog;


export const { initiliseSystemInfo, issueMultiWarnings, issueWarning, resetWarnings } = systemInfoSlice.actions;
export default systemInfoSlice.reducer;