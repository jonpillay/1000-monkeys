import { createSlice } from "@reduxjs/toolkit";

const systemInfoSlice = createSlice({

  name: 'systemInfoSlice',

  initialState: {
    warnings: 0
  },
  reducers: {
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
  },
})

export const selectAllWarnings = (state) => state.systemInfo.warnings;

export const { issueMultiWarnings, issueWarning } = systemInfoSlice.actions;
export default systemInfoSlice.reducer;