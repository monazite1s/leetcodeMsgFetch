import fs from "fs";
import axios from "axios";

let data;
axios({
  method: "get",
  url: "https://static.leetcode.cn/cn-frontendx-assets/production/_next/static/chunks/1583-07c082bb195d1570.js",
}).then(function (response) {
  let htmlContent = response.data;
  console.log(htmlContent);
  fs.mkdir("acatorJS", { recursive: true }, (err) => {
    if (err) {
      return;
    }

    // 将数据保存到文件
    fs.writeFile(
      `acatorJS/test.js`,
      JSON.stringify(htmlContent, null, 2),
      (err) => {
        if (err) {
          return;
        }
      }
    );
  });
});
