import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectAllIssues = createDraftSafeSelector(
  (state) => state.issue,
  (issue) => issue.issues
);
