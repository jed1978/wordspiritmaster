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
    "Daniel saved his pocket money for three months to buy a new video game. When he finally had enough, he went to the store — but the game was sold out. The owner said it would arrive in two weeks. During the wait, Daniel read online reviews and found that many players thought the game was too short and not worth the price. He changed his mind and bought a different game instead. It turned out to be his favorite of the year. Sometimes, waiting gives you time to make a better choice.",
  questions: [
    {
      question: "Why couldn't Daniel buy the game when he first went to the store?",
      questionZh: "丹尼爾第一次去商店時為什麼沒辦法買遊戲？",
      options: [
        { text: "He didn't have enough money yet", textZh: "他的錢還不夠" },
        { text: "The store was already closed", textZh: "商店已經關門了" },
        { text: "His parents said no", textZh: "他的父母不准" },
        { text: "The game was sold out", textZh: "遊戲賣完了" },
      ],
      correctIndex: 3,
      explanation:
        "文章說 the game was sold out，所以買不到。注意他已經存了三個月的零用錢，錢是夠的。",
    },
    {
      question: "What did Daniel discover while waiting for the game to arrive?",
      questionZh: "丹尼爾等待期間發現了什麼？",
      options: [
        { text: "The game would soon become cheaper", textZh: "那款遊戲即將降價" },
        { text: "His friend already owned the same game", textZh: "他朋友已經有那款遊戲了" },
        { text: "Many players felt the game was not worth the price", textZh: "許多玩家覺得那款遊戲不值這個價格" },
        { text: "A newer version of the game was coming out", textZh: "遊戲即將推出新版本" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 many players thought the game was too short and not worth the price — 他看了評論，發現大家覺得不值得買。",
    },
    {
      question: "What is the main lesson of this story?",
      questionZh: "這個故事的主要教訓是什麼？",
      options: [
        { text: "Video games are a waste of money", textZh: "電玩是浪費金錢的東西" },
        { text: "Saving money is the most important habit", textZh: "存錢是最重要的習慣" },
        { text: "Waiting can help you make a smarter decision", textZh: "等待能幫助你做出更聰明的決定" },
        { text: "Always buy the most popular game", textZh: "永遠買最熱門的遊戲" },
      ],
      correctIndex: 2,
      explanation:
        "故事最後說 Sometimes, waiting gives you time to make a better choice — 等待讓丹尼爾有時間發現更好的選擇。",
    },
  ],
};
