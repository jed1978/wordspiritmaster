import type { ReadingPassage } from "@/store/types";

export const area03: ReadingPassage = {
  areaId: 3,
  boss: {
    name: "野獸大王",
    emoji: "🦁",
    personality: "熱血",
    openingLine: "吼！來挑戰我的閱讀力吧！",
    defeatLine: "太強了！你是真正的閱讀勇者！",
  },
  passage:
    "Lisa has many animals at home. She has a dog, two cats, and three fish. Her dog is big and friendly. It likes to run in the park. The cats are small and shy. They sleep on Lisa's bed all day. Lisa loves her animals very much. She gives them food and water every morning.",
  questions: [
    {
      question: "How many cats does Lisa have?",
      questionZh: "莉莎有幾隻貓？",
      options: [
        { text: "One", textZh: "一隻" },
        { text: "Two", textZh: "兩隻" },
        { text: "Three", textZh: "三隻" },
        { text: "Four", textZh: "四隻" },
      ],
      correctIndex: 1,
      explanation: "文章說 two cats，所以是兩隻貓。",
    },
    {
      question: "What is the dog like?",
      questionZh: "那隻狗是什麼樣子的？",
      options: [
        { text: "Small and shy", textZh: "小又害羞" },
        { text: "Big and friendly", textZh: "大又友善" },
        { text: "Fast and strong", textZh: "快又強壯" },
        { text: "Old and tired", textZh: "老又疲累" },
      ],
      correctIndex: 1,
      explanation: "文章說 Her dog is big and friendly，所以是大又友善的。",
    },
    {
      question: "Where do the cats sleep?",
      questionZh: "貓咪在哪裡睡覺？",
      options: [
        { text: "On the table", textZh: "在桌子上" },
        { text: "In the park", textZh: "在公園" },
        { text: "On Lisa's bed", textZh: "在莉莎的床上" },
        { text: "On the chair", textZh: "在椅子上" },
      ],
      correctIndex: 2,
      explanation: "文章說 They sleep on Lisa's bed all day，所以是在莉莎的床上。",
    },
  ],
};
