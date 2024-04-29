import axios from "axios";
import { url, headers, cookies } from "./getAxiosParms.js";

let apiQuery = {
  query: `
          query userProfileCalendar($userSlug: String!, $year: Int) {
            userCalendar(userSlug: $userSlug, year: $year) {
              streak
              totalActiveDays
              submissionCalendar
              activeYears
              monthlyMedals {
                name
                obtainDate
                category
                config {
                  icon
                  iconGif
                  iconGifBackground
                }
                progress
                id
                year
                month
              }
              recentStreak
            }
          }
        `,
  variables: {
    userSlug: "",
  },
  operationName: "userProfileCalendar",
};

// interface Calendar {
//   [date: string]: number;
// }

// export type TableItem = {
//   id: number,
//   name: string,
//   username: string,
//   realname: string,
//   canlendar: Calendar,
//   recentAcSubmissions: object,
// };

//请求
let submissionCalendar;
export async function getUserProfileCanlendarData(username) {
  apiQuery.variables.userSlug = username;
  await axios
    .post(url, apiQuery, {
      headers,
      cookies,
    })
    .then((res) => {
      console.log(res.data.data);
      submissionCalendar = res.data.data?.userCalendar.submissionCalendar;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return submissionCalendar ? JSON.parse(submissionCalendar) : null;
}
