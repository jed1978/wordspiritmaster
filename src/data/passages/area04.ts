import type { ReadingPassage } from "@/store/types";

export const area04: ReadingPassage = {
  areaId: 4,
  boss: {
    name: "天氣博士",
    emoji: "🌦️",
    personality: "神秘",
    openingLine: "你能看穿天氣的秘密嗎...？",
    defeatLine: "了不起...你讀懂了天氣的語言。",
  },
  passage:
    "Today is a cold and windy day. Ben does not want to go outside. He stays home and reads a book. His mother makes hot tea for him. In the afternoon, the sun comes out. Ben is happy. He puts on his shoes and runs to the park. He plays with his friend until evening.",
  questions: [
    {
      question: "How is the weather in the morning?",
      questionZh: "早上天氣如何？",
      options: [
        { text: "Hot and sunny", textZh: "炎熱晴朗" },
        { text: "Cold and windy", textZh: "寒冷有風" },
        { text: "Rainy and dark", textZh: "下雨陰暗" },
        { text: "Warm and cloudy", textZh: "溫暖多雲" },
      ],
      correctIndex: 1,
      explanation:
        "文章一開始就說 Today is a cold and windy day，所以是寒冷有風。",
    },
    {
      question: "What does Ben do at home?",
      questionZh: "班恩在家做什麼？",
      options: [
        { text: "Watches TV", textZh: "看電視" },
        { text: "Plays games", textZh: "玩遊戲" },
        { text: "Reads a book", textZh: "看書" },
        { text: "Does homework", textZh: "寫功課" },
      ],
      correctIndex: 2,
      explanation: "文章說 He stays home and reads a book，所以是看書。",
    },
    {
      question: "What happens in the afternoon?",
      questionZh: "下午發生了什麼事？",
      options: [
        { text: "It starts to rain", textZh: "開始下雨" },
        { text: "The sun comes out", textZh: "太陽出來了" },
        { text: "It gets colder", textZh: "變更冷了" },
        { text: "It starts to snow", textZh: "開始下雪" },
      ],
      correctIndex: 1,
      explanation: "文章說 In the afternoon, the sun comes out，所以太陽出來了。",
    },
  ],
};
