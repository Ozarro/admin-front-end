import { setIssues } from ".";
import api, { registerAccessToken } from "./../../api";

export default class userThunk {
  static getAllIssues() {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.issue.get.senderIssues();
      if (res.status === 200) {
        const issues = data.filter((issue) => {
          const [date, val] = issue.createdAt.split("T");
          const [time, x] = val.split(".");
          issue.createdDate = date;
          issue.createdTime = time;
          return issue;
        });
        dispatch(setIssues(issues));
      }
      return res;
    };
  }

  static newSenderIssue(issueData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.issue.post.createIssue(issueData);
      return res;
    };
  }
}
