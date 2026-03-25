import type { ReadingPassage } from "@/store/types";

export const area02: ReadingPassage = {
  areaId: 2,
  boss: {
    name: "甜點女王",
    emoji: "🧁",
    personality: "可愛",
    openingLine: "嘻嘻～你能讀懂我的公告嗎？",
    defeatLine: "哇～你好厲害！下次一起做蛋糕吧！",
  },
  passage:
    "Sweet Baking Contest — Sign Up Now!\n\nDate: Saturday, May 10\nTime: 10:00 a.m. – 2:00 p.m.\nPlace: School Cafeteria\n\nOpen to all students in Grades 7–9. Each student may bring ONE dish. All dishes must be made at home the day before the contest. Dishes will be judged on taste, creativity, and appearance.\n\nPrizes:\n• 1st Place: NT$500 gift card + trophy\n• 2nd Place: NT$300 gift card\n• 3rd Place: NT$100 gift card\n\nSign up at Room 201 by May 5.\nFor questions, contact Ms. Chen at chen@school.edu.tw",
  questions: [
    {
      question: "According to the notice, which of the following is TRUE?",
      questionZh: "根據公告，下列何者正確？",
      options: [
        { text: "The contest is open to all students in the school", textZh: "比賽對全校學生開放" },
        { text: "Students may bring two dishes if they want", textZh: "學生如果想要可以帶兩道料理" },
        { text: "Dishes should be prepared before the contest day", textZh: "料理應在比賽當天前就先做好" },
        { text: "The contest is judged only on how the dish looks", textZh: "比賽只根據料理外觀評分" },
      ],
      correctIndex: 2,
      explanation:
        "公告說 dishes must be made at home the day before the contest — 要在比賽前一天在家做好。選項 A 錯：只開放 7–9 年級。選項 B 錯：只能帶一道。選項 D 錯：評分有三項（味道、創意、外觀）。",
    },
    {
      question: "What should a student do to join the baking contest?",
      questionZh: "學生要如何報名參加烘焙比賽？",
      options: [
        { text: "Email Ms. Chen before May 10", textZh: "在 5 月 10 日前寄信給陳老師" },
        { text: "Go to Room 201 by May 5", textZh: "在 5 月 5 日前到 201 室報名" },
        { text: "Arrive at the cafeteria before 10:00 a.m.", textZh: "在上午 10 點前到達學生餐廳" },
        { text: "Call the school office to register", textZh: "打電話給學校辦公室登記" },
      ],
      correctIndex: 1,
      explanation:
        "公告說 Sign up at Room 201 by May 5 — 要在 5 月 5 日前去 201 室報名。選項 A 是陷阱：電子信箱是用來「詢問問題」的，不是報名用的。",
    },
    {
      question: "What would most likely happen if a student brought two dishes to the contest?",
      questionZh: "如果一個學生帶了兩道料理去比賽，最可能發生什麼事？",
      options: [
        { text: "The student would get extra points for creativity", textZh: "學生會因創意加分" },
        { text: "The judges would pick the better dish to score", textZh: "評審會挑比較好的那道來評分" },
        { text: "The student would not follow the contest rules", textZh: "學生沒有遵守比賽規則" },
        { text: "The student would win a bigger prize", textZh: "學生會贏得更大的獎品" },
      ],
      correctIndex: 2,
      explanation:
        "公告明確規定 Each student may bring ONE dish — 每人只能帶一道。帶兩道就是違反規則。其他選項都沒有依據，文章完全未提到可以帶兩道或有額外加分。",
    },
  ],
};
