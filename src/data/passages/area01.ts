import type { ReadingPassage } from "@/store/types";

export const area01: ReadingPassage = {
  areaId: 1,
  boss: {
    name: "書蟲先生",
    emoji: "📖",
    personality: "傲慢",
    openingLine: "你以為你看得懂我嗎？哼！",
    defeatLine: "不...不可能！你居然讀懂了！",
  },
  passage:
    "Tom goes to school every day. He gets up at seven and eats breakfast with his family. Then he walks to school with his friend, Sam. They study English, math, and science. Tom likes English the best. After school, Tom runs home and does his homework.",
  questions: [
    {
      question: "What time does Tom get up?",
      questionZh: "湯姆幾點起床？",
      options: [
        { text: "Six o'clock", textZh: "六點" },
        { text: "Seven o'clock", textZh: "七點" },
        { text: "Eight o'clock", textZh: "八點" },
        { text: "Nine o'clock", textZh: "九點" },
      ],
      correctIndex: 1,
      explanation: "文章說 He gets up at seven，所以是七點起床。",
    },
    {
      question: "What does Tom like best?",
      questionZh: "湯姆最喜歡什麼科目？",
      options: [
        { text: "Math", textZh: "數學" },
        { text: "Science", textZh: "科學" },
        { text: "English", textZh: "英文" },
        { text: "History", textZh: "歷史" },
      ],
      correctIndex: 2,
      explanation: "文章說 Tom likes English the best，所以最喜歡英文。",
    },
    {
      question: "How does Tom go to school?",
      questionZh: "湯姆怎麼去學校？",
      options: [
        { text: "By bus", textZh: "搭公車" },
        { text: "By bike", textZh: "騎腳踏車" },
        { text: "He walks", textZh: "走路" },
        { text: "By car", textZh: "搭車" },
      ],
      correctIndex: 2,
      explanation: "文章說 he walks to school，所以是走路去學校。",
    },
  ],
};
