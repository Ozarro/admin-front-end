import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issues: [],
};

/**
 * Issue Slice
 */
const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setIssues(state, action) {
      state.issues = action.payload;
    },
  },
});

/**
 * Exports
 */
export const { setIssues } = issueSlice.actions;
export default issueSlice.reducer;
