import type { ReadingPassage } from "@/store/types";

export const area02: ReadingPassage = {
  areaId: 2,
  boss: {
    name: "甜點女王",
    emoji: "🧁",
    personality: "可愛",
    openingLine: "嘻嘻～你能讀懂我的食譜嗎？",
    defeatLine: "哇～你好厲害！下次一起做蛋糕吧！",
  },
  passage:
    "Maya entered her school's baking contest for the first time. She practiced making strawberry cake every day for two weeks. On the contest day, she was nervous and added too much sugar by mistake. The judges tasted her cake and moved on without saying much. Maya thought she had failed. But then the judges came back and said her cake had the most interesting flavor of the day. She won second place! Maya learned that mistakes can sometimes lead to wonderful surprises.",
  questions: [
    {
      question: "Why did Maya think she had failed?",
      questionZh: "瑪雅為什麼認為自己失敗了？",
      options: [
        { text: "Her cake did not look good", textZh: "她的蛋糕看起來不好看" },
        { text: "The judges said her cake was bad", textZh: "評審說她的蛋糕不好" },
        { text: "The judges walked away without saying much", textZh: "評審嚐完後沒說什麼就走了" },
        { text: "She used the wrong ingredients", textZh: "她用錯了食材" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 the judges tasted her cake and moved on without saying much，瑪雅因為評審沒說話就走了，所以以為自己失敗了。",
    },
    {
      question: "What made Maya's cake special?",
      questionZh: "瑪雅的蛋糕有什麼特別之處？",
      options: [
        { text: "It looked the most beautiful", textZh: "它看起來最漂亮" },
        { text: "It had the most interesting flavor", textZh: "它的味道最特別" },
        { text: "It had the least sugar", textZh: "它的糖放得最少" },
        { text: "It was made with fresh strawberries", textZh: "它用了新鮮草莓" },
      ],
      correctIndex: 1,
      explanation:
        "評審回來說 her cake had the most interesting flavor of the day，是味道最特別 — 雖然是因為加太多糖，卻意外成了亮點。",
    },
    {
      question: "What lesson can we learn from Maya's experience?",
      questionZh: "從瑪雅的經歷我們可以學到什麼？",
      options: [
        { text: "Always follow the recipe exactly", textZh: "做蛋糕一定要照食譜來" },
        { text: "Baking contests are not worth joining", textZh: "烘焙比賽不值得參加" },
        { text: "Practice every day guarantees first place", textZh: "每天練習就一定能得第一" },
        { text: "Unexpected mistakes can lead to good results", textZh: "意外的失誤有時會帶來好結果" },
      ],
      correctIndex: 3,
      explanation:
        "故事最後說 Maya learned that mistakes can sometimes lead to wonderful surprises，表示意外失誤也可能帶來好結果。",
    },
  ],
};
