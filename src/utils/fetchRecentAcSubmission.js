import axios from "axios";
import { url, headers, cookies } from "./getAxiosParms.js";

let apiQuery = {
  query: `
    query recentAcSubmissions($userSlug: String!) {
        recentACSubmissions(userSlug: $userSlug) {
          submissionId
            submitTime
            question
            {
              title
              translatedTitle
              titleSlug
              questionFrontendId
            }
        }
      }
    `,
  variables: {
    userSlug: "",
  },
};

// interface question {
//   title: string;
//   translatedTitle: string;
//   titleSlug: string;
//   questionFrontendId: string;
// }

// export type recentAcSubmissionsData = {
//   submissionId: number,
//   submitTime: number,
//   question: question,
// };

//请求
let recentACSubmissions;

export async function getRecentAcSubmission(username) {
  apiQuery.variables.userSlug = username;
  await axios
    .post(url, apiQuery, {
      headers,
      cookies,
    })
    .then((res) => {
      // console.log(res.data.data.recentACSubmissions);
      recentACSubmissions = res.data.data.recentACSubmissions;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return recentACSubmissions;
}
