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
    "Jason was the fastest runner in his school for three years. Before the city race, his coach warned him, \"Don't start too fast. Save your energy for the last part.\" Jason was too excited to listen. He ran hard from the very beginning. After 300 meters, his legs felt heavy and his breathing became difficult. A boy from another school passed him. Jason pushed as hard as he could, but he crossed the finish line in second place. His coach said quietly, \"Now you understand why I told you that.\" Jason nodded and said nothing. The next year, he planned to do things differently.",
  questions: [
    {
      question: "According to the passage, what did Jason's coach tell him before the race?",
      questionZh: "根據文章，教練在比賽前告訴傑森什麼？",
      options: [
        { text: "Try to finish the race as fast as possible", textZh: "盡可能跑得越快越好" },
        { text: "Don't worry about runners from other schools", textZh: "不用擔心其他學校的選手" },
        { text: "Save energy and don't run too fast at the start", textZh: "保留體力，起跑時不要太快" },
        { text: "Warm up for at least one hour before the race", textZh: "比賽前至少熱身一小時" },
      ],
      correctIndex: 2,
      explanation:
        "教練說 Don't start too fast. Save your energy for the last part — 要省體力、不要起跑太猛。其他選項都是文章沒有提到的內容。",
    },
    {
      question: "Why did Jason finish second instead of first?",
      questionZh: "傑森為什麼得了第二名而不是第一名？",
      options: [
        { text: "He fell down during the race and lost time", textZh: "他比賽中跌倒損失了時間" },
        { text: "The other runner had trained much longer than him", textZh: "另一個選手訓練時間比他長很多" },
        { text: "He did not practice enough before the contest", textZh: "他賽前練習不夠充分" },
        { text: "He ran too fast early on and ran out of energy", textZh: "他一開始跑太快，體力提前耗盡" },
      ],
      correctIndex: 3,
      explanation:
        "文章說他 ran hard from the very beginning，之後 legs felt heavy — 起跑太猛導致後段體力不足被超越。文章沒有提到他跌倒、練習不足或對手訓練更久。",
    },
    {
      question: "What can we learn about Jason from this passage?",
      questionZh: "從這篇文章我們可以得知傑森是個怎樣的人？",
      options: [
        { text: "He never listens to anyone's advice", textZh: "他從不聽任何人的建議" },
        { text: "He decided to give up running after losing", textZh: "他輸了之後決定放棄跑步" },
        { text: "He learned from the experience and wanted to improve", textZh: "他從這次經驗中學到教訓並想要改進" },
        { text: "He thought the race result was unfair", textZh: "他認為比賽結果不公平" },
      ],
      correctIndex: 2,
      explanation:
        "文章結尾說 The next year, he planned to do things differently — 他打算改變做法，代表他從失敗中學到了東西。選項 A 太極端：文章只說他「這次」沒聽，不代表他永遠不聽建議。",
    },
  ],
};
