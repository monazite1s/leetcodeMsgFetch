import fs from "fs";
import { getRecentAcSubmission } from "./fetchRecentAcSubmission.js";
import { getUserProfileCanlendarData } from "./fetchUserProfileCalendar.js";

let usernameList = [
  { name: "张佩瑶", username: "zzzwr", realname: "zzzwr" },
  { name: "石彦鸣", username: "Assassin", realname: "assassin-eu" },
  { name: "郭世杰", username: "派小星", realname: "zen-mccarthykti" },
  { name: "温贺惠", username: "晚上好", realname: "wan-shang-hao-r" },
  { name: "胡杨", username: "川", realname: "youthful-rosalindwfu" },
  { name: "张扬", username: "Nifty Brown7XP", realname: "nifty-brown7xp" },
  { name: "江雨晴", username: "秋赤音", realname: "wonderful-stonebrakerqig" },
  { name: "杜家兴", username: "Cranky RamanK0x", realname: "cranky-ramank0x" },
  { name: "张子源", username: "CODEZhang", realname: "codezang" },
  { name: "冯科璇", username: "Baicsc", realname: "elastic-satoshiwbw" },
  {
    name: "乔佳琪",
    username: "Serene 6ermainhYB",
    realname: "serene-6ermainhyb",
  },
  {
    name: "翟金宇",
    username: "翟金鱼-fish-lico",
    realname: "clever-svvansonqbe",
  },
  { name: "于卿功", username: "DokiDoki", realname: "angry-svvansonwyz" },
  { name: "孙嘉宇", username: "枕眠", realname: "AcytaH61rn" },
  { name: "常彦杰", username: "Jsama", realname: "jsama-3" },
  { name: "师浩然", username: "朝飞.", realname: "zhao-fei-x" },
  { name: "吴思彤", username: "元气", realname: "i3lissful-haslettovc" },
  { name: "裴润涵", username: "反求诸己", realname: "fan-qiu-zhu-ji-b" },
  { name: "张逸翔", username: "一⭐", realname: "yJ8BIIZHLH" },
  {
    name: "杨晓晨",
    username: "上课还睡就不改名",
    realname: "shang-ke-huan-shui-jiu-bu-gai-ming",
  },
  { name: "秦皓天", username: "朝阳", realname: "zhao-yang-scn" },
  { name: "张世杰", username: "Zhangshijie", realname: "peaceful-nashdwg" },
  { name: "张凯宁", username: "lll", realname: "lll-d6" },
  // { name: "孙麟", username: "Nifty Snyderaje", realname: "nifty-snyderaje" },
  { name: "马德康", username: "madekang", realname: "Charming-Leakeyypc" },
  { name: "郭雅倩", username: "郭雅倩sugar", realname: "xuan-xiao-mf" },
  { name: "任吉瑞", username: "俈", realname: "fryZpRBnWq" },
  { name: "杨凯杰", username: "缅甸腰王", realname: "mian-dian-yao-wang" },
  { name: "王凌霄", username: "找不到裤裤", realname: "focused-kirchubo" },
  { name: "张韶卿", username: "zhangsq", realname: "benbener" },
  { name: "张艺凡", username: "percccccccs", realname: "percccccccs" },
  { name: "成亚楠", username: "chengnnn", realname: "happy-vvilburi3l" },
];

// type userDataType = {
//   id: number,
//   name: string,
//   username: string,
//   realname: string,
//   canlendar: any,
//   recentAcSubmissions: any,
// };

let id = 0;
let userDataList = [];
for (let { name, username, realname } of usernameList) {
  await setTimeout(() => {}, 200);
  let userData = {
    id: 0,
    name: "",
    username: "",
    realname: "",
    canlendar: {},
    recentAcSubmissions: [],
  };
  id++;
  userData.id = id;
  userData.name = name;
  userData.username = username;
  userData.realname = realname;
  // console.log(await getUserProfileCanlendarData(username));
  // console.log(await getRecentAcSubmission(username));
  userData.canlendar = await getUserProfileCanlendarData(realname);
  userData.recentAcSubmissions = await getRecentAcSubmission(realname);

  // console.log(userData);
  userDataList.push(userData);
}
//node输出到data.json
// 创建存储目录
fs.mkdir("./src/store", { recursive: true }, (err) => {
  if (err) {
    console.error("无法创建目录:", err);
    return;
  }
  // 将数据保存到文件
  fs.writeFile(
    `./src/store/testData.json`,
    JSON.stringify(userDataList, null, 2),
    (err) => {
      if (err) {
        console.error("数据保存失败:", err);
        return;
      }
      // console.log("数据已保存到:", `store/${username}.json`);
    }
  );
});
