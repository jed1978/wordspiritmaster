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
    "Jenny: Have you heard? The AIRmax shoes are finally in stores!\nMike: I checked — NT$3,500 is way too expensive for me.\nJenny: There's a sale next weekend. Thirty percent off!\nMike: So that would be... NT$2,450. Still a lot.\nJenny: My sister works there. She says the shoes really last. More than three years.\nMike: Hmm. If I save my allowance for two months, I might just have enough.\nJenny: Don't wait too long. Last time there was a sale, everything sold out in one day.\nMike: OK. I'll think about it tonight and let you know tomorrow.",
  annotations: {
    expensive: "昂貴的",
    percent: "百分比",
    allowance: "零用錢",
    sold: "賣完",
  },
  questions: [
    {
      question:
        "According to the dialogue, how much do the AIRmax shoes cost during the sale?",
      questionZh: "根據對話，AIRmax 球鞋在特賣期間的售價是多少？",
      options: [
        { text: "NT$1,050", textZh: "新台幣 1,050 元" },
        { text: "NT$2,100", textZh: "新台幣 2,100 元" },
        { text: "NT$2,450", textZh: "新台幣 2,450 元" },
        { text: "NT$3,500", textZh: "新台幣 3,500 元" },
      ],
      correctIndex: 2,
      explanation:
        "NT$3,500 打七折（30% off）= NT$3,500 × 0.7 = NT$2,450。選項 D 是原價（陷阱），選項 B 是原價的六折（錯誤計算的陷阱）。",
    },
    {
      question: 'What does Jenny mean when she says, "Don\'t wait too long"?',
      questionZh: "珍妮說「不要等太久」是什麼意思？",
      options: [
        {
          text: "Mike should go to the store right now",
          textZh: "麥克應該馬上去商店",
        },
        {
          text: "The sale will be over very soon",
          textZh: "特賣活動很快就會結束",
        },
        {
          text: "The shoes might sell out before Mike decides",
          textZh: "球鞋可能在麥克決定前就賣光了",
        },
        {
          text: "Jenny needs to tell her sister Mike is coming",
          textZh: "珍妮需要告訴她姐姐麥克要來",
        },
      ],
      correctIndex: 2,
      explanation:
        "珍妮說「上次特賣一天內全賣光」，所以她警告麥克等太久可能買不到。選項 B 是陷阱 — 文章沒說特賣「快結束」，而是強調「賣完」的風險。",
    },
    {
      question: "Which of the following is TRUE about Mike?",
      questionZh: "關於麥克，下列何者正確？",
      options: [
        {
          text: "He will definitely buy the shoes tomorrow",
          textZh: "他明天一定會去買球鞋",
        },
        {
          text: "He thinks the shoes are not worth any price",
          textZh: "他認為球鞋根本不值得買",
        },
        {
          text: "He is thinking about saving money to buy the shoes",
          textZh: "他在考慮存錢買那雙球鞋",
        },
        {
          text: "He already has enough money to buy the shoes",
          textZh: "他已經有足夠的錢買球鞋",
        },
      ],
      correctIndex: 2,
      explanation:
        "麥克說 If I save my allowance for two months, I might just have enough，代表他在考慮存錢買。選項 A 是陷阱 — 他說的是「明天告訴你」，不是「明天去買」。選項 D 錯：他說還要存兩個月才夠。",
    },
  ],
};
