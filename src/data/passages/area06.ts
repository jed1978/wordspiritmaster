import type { ReadingPassage } from "@/store/types";

export const area06: ReadingPassage = {
  areaId: 6,
  boss: {
    name: "星夜公主",
    emoji: "🌙",
    personality: "溫柔",
    openingLine: "在星空下，讓我考考你吧～",
    defeatLine: "你的閱讀力像星星一樣閃亮呢！",
  },
  passage:
    "It is a beautiful night. Jack and his sister sit in the garden and look at the sky. They can see the moon and many bright stars. Jack's sister asks, \"How many stars are there?\" Jack laughs and says, \"Too many to count!\" Their father brings them hot milk. They drink it slowly and feel warm. Soon, Jack's sister falls asleep. Jack carries her inside and puts her on the bed. It is a wonderful evening.",
  questions: [
    {
      question: "Where do Jack and his sister sit?",
      questionZh: "傑克和他的妹妹坐在哪裡？",
      options: [
        { text: "In the room", textZh: "在房間裡" },
        { text: "In the garden", textZh: "在花園裡" },
        { text: "On the bed", textZh: "在床上" },
        { text: "At school", textZh: "在學校" },
      ],
      correctIndex: 1,
      explanation: "文章說 sit in the garden，所以是在花園裡。",
    },
    {
      question: "What does their father bring them?",
      questionZh: "爸爸帶了什麼給他們？",
      options: [
        { text: "Hot tea", textZh: "熱茶" },
        { text: "Cold water", textZh: "冰水" },
        { text: "Hot milk", textZh: "熱牛奶" },
        { text: "Juice", textZh: "果汁" },
      ],
      correctIndex: 2,
      explanation: "文章說 Their father brings them hot milk，所以是熱牛奶。",
    },
    {
      question: "What happens to Jack's sister at the end?",
      questionZh: "最後傑克的妹妹怎麼了？",
      options: [
        { text: "She runs home", textZh: "她跑回家" },
        { text: "She falls asleep", textZh: "她睡著了" },
        { text: "She cries", textZh: "她哭了" },
        { text: "She reads a book", textZh: "她看書" },
      ],
      correctIndex: 1,
      explanation:
        "文章說 Jack's sister falls asleep，所以她睡著了。",
    },
  ],
};
