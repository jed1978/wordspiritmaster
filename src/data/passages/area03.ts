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
    "Jason was the fastest runner in his school for three years. Before the city race, his coach warned him, \"Don't start too fast. Save your energy for the last part.\" But Jason was excited and ran hard from the beginning. After 300 meters, his legs became heavy. A boy from another school passed him. Jason pushed as hard as he could, but he finished second. His coach said, \"Now you know why I told you that.\" Jason nodded. Next year, he planned to listen more carefully.",
  questions: [
    {
      question: "What did Jason's coach tell him before the race?",
      questionZh: "教練在比賽前告訴傑森什麼？",
      options: [
        { text: "Don't worry about other runners", textZh: "不要擔心其他選手" },
        { text: "Warm up for one hour before starting", textZh: "出發前要熱身一小時" },
        { text: "Don't run too fast at the beginning", textZh: "開始時不要跑太快" },
        { text: "Try to finish the race in under two minutes", textZh: "努力在兩分鐘內完賽" },
      ],
      correctIndex: 2,
      explanation:
        "教練說 Don't start too fast. Save your energy for the last part，意思就是開始時不要跑太快。",
    },
    {
      question: "Why did Jason finish second instead of first?",
      questionZh: "傑森為什麼得了第二名而不是第一？",
      options: [
        { text: "He fell down during the race", textZh: "他比賽中跌倒了" },
        { text: "He started too fast and ran out of energy", textZh: "他起跑太快，體力耗盡" },
        { text: "The other boy had trained longer", textZh: "另一個男孩訓練了更久" },
        { text: "He did not practice enough before the race", textZh: "他賽前練習不夠" },
      ],
      correctIndex: 1,
      explanation:
        "文章說 Jason ran hard from the beginning，然後 his legs became heavy — 他因為起跑太快體力不足，才被超越。",
    },
    {
      question: "What will Jason most likely do differently in the next race?",
      questionZh: "傑森在下次比賽中最可能會有什麼不同？",
      options: [
        { text: "He will find a new coach", textZh: "他會找一位新教練" },
        { text: "He will not join the city race again", textZh: "他不會再參加城市比賽" },
        { text: "He will follow his coach's advice about pacing", textZh: "他會照教練的建議控制配速" },
        { text: "He will train twice as hard every day", textZh: "他每天會加倍訓練" },
      ],
      correctIndex: 2,
      explanation:
        "文章最後說 Next year, he planned to listen more carefully，代表他會照教練建議控制配速，不再起跑太猛。",
    },
  ],
};
