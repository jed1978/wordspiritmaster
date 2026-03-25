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
    "Amy loves to cook. Every Sunday, she makes breakfast for her family. She cooks eggs and bread. Her brother drinks milk, and her sister drinks juice. Amy's mother says, \"The food is great!\" Amy is very happy. She wants to be a cook when she grows up.",
  questions: [
    {
      question: "When does Amy cook for her family?",
      questionZh: "艾咪什麼時候為家人做飯？",
      options: [
        { text: "Every day", textZh: "每天" },
        { text: "Every Saturday", textZh: "每週六" },
        { text: "Every Sunday", textZh: "每週日" },
        { text: "Every Monday", textZh: "每週一" },
      ],
      correctIndex: 2,
      explanation: "文章說 Every Sunday, she makes breakfast，所以是每週日。",
    },
    {
      question: "What does Amy cook?",
      questionZh: "艾咪煮了什麼？",
      options: [
        { text: "Rice and fish", textZh: "米飯和魚" },
        { text: "Eggs and bread", textZh: "蛋和麵包" },
        { text: "Cake and juice", textZh: "蛋糕和果汁" },
        { text: "Milk and eggs", textZh: "牛奶和蛋" },
      ],
      correctIndex: 1,
      explanation: "文章說 She cooks eggs and bread，所以是蛋和麵包。",
    },
    {
      question: "What does Amy want to be?",
      questionZh: "艾咪長大後想做什麼？",
      options: [
        { text: "A teacher", textZh: "老師" },
        { text: "A doctor", textZh: "醫生" },
        { text: "A cook", textZh: "廚師" },
        { text: "A nurse", textZh: "護士" },
      ],
      correctIndex: 2,
      explanation: "文章說 She wants to be a cook，所以想當廚師。",
    },
  ],
};
