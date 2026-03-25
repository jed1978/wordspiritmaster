import type { ReadingPassage } from "@/store/types";

export const area05: ReadingPassage = {
  areaId: 5,
  boss: {
    name: "購物精靈",
    emoji: "🛍️",
    personality: "搞笑",
    openingLine: "哈哈！你買得起我的英文題嗎？",
    defeatLine: "哎呀～被你買走了！算你厲害！",
  },
  passage:
    "Mary and her mother go to the store on Saturday. Mary wants to buy a new shirt and a hat. The shirt is blue, and the hat is red. Her mother buys food for the family — rice, eggs, and milk. Mary also sees a bag she likes, but she does not have enough money. Her mother says, \"Maybe next time.\" Mary is a little sad, but she is still happy with her new shirt and hat.",
  questions: [
    {
      question: "When do Mary and her mother go to the store?",
      questionZh: "瑪莉和媽媽什麼時候去商店？",
      options: [
        { text: "On Sunday", textZh: "星期日" },
        { text: "On Saturday", textZh: "星期六" },
        { text: "On Friday", textZh: "星期五" },
        { text: "On Monday", textZh: "星期一" },
      ],
      correctIndex: 1,
      explanation: "文章說 go to the store on Saturday，所以是星期六。",
    },
    {
      question: "Why doesn't Mary buy the bag?",
      questionZh: "為什麼瑪莉沒有買那個袋子？",
      options: [
        { text: "She doesn't like it", textZh: "她不喜歡" },
        { text: "It is too big", textZh: "太大了" },
        { text: "She doesn't have enough money", textZh: "她錢不夠" },
        { text: "Her mother says no", textZh: "媽媽不准" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 she does not have enough money，所以是錢不夠。",
    },
    {
      question: "What color is the hat?",
      questionZh: "帽子是什麼顏色？",
      options: [
        { text: "Blue", textZh: "藍色" },
        { text: "Green", textZh: "綠色" },
        { text: "Yellow", textZh: "黃色" },
        { text: "Red", textZh: "紅色" },
      ],
      correctIndex: 3,
      explanation: "文章說 the hat is red，所以帽子是紅色的。",
    },
  ],
};
