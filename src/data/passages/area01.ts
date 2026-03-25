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
    "Kevin never liked reading. His teacher asked everyone to borrow a library book and talk about it in class. Kevin picked the thinnest book — a story about a boy who trains a wild horse. He only planned to read a few pages, but he finished the whole book that night. The next morning, he went back to the library for more books. When Kevin talked about the horse story, his classmates all wanted to read it too. His teacher said, \"A good story doesn't care how many pages it has.\" Kevin now reads one book a week.",
  questions: [
    {
      question: "Why did Kevin choose the book about the wild horse?",
      questionZh: "凱文為什麼選了那本野馬的書？",
      options: [
        { text: "He loves horses", textZh: "他喜歡馬" },
        { text: "His friend told him to", textZh: "朋友推薦他的" },
        { text: "It was the thinnest book", textZh: "它是最薄的書" },
        { text: "His teacher picked it for him", textZh: "老師幫他選的" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 Kevin picked the thinnest book，他選這本是因為最薄，不是因為喜歡馬。",
    },
    {
      question: "What happened after Kevin talked about the horse story in class?",
      questionZh: "凱文在班上分享那本書後，發生了什麼事？",
      options: [
        { text: "His teacher gave him a prize", textZh: "老師給了他獎品" },
        { text: "His classmates all wanted to read it", textZh: "同學們都想看那本書" },
        { text: "He had to return the book that day", textZh: "他當天就要還書" },
        { text: "He started a book club", textZh: "他成立了讀書社" },
      ],
      correctIndex: 1,
      explanation:
        "文章說 his classmates all wanted to read it too，代表同學也想讀那本書。",
    },
    {
      question: "What is the main message of this story?",
      questionZh: "這個故事的主要訊息是什麼？",
      options: [
        { text: "Short books are always better than long ones", textZh: "短書永遠比長書好" },
        { text: "Students should listen to their teachers more", textZh: "學生應該多聽老師的話" },
        { text: "The right book can make someone enjoy reading", textZh: "對的書能讓人愛上閱讀" },
        { text: "Library books are free and easy to get", textZh: "圖書館的書免費又方便" },
      ],
      correctIndex: 2,
      explanation:
        "故事說 Kevin 原本討厭讀書，但一本書改變了他 — 主旨是找到對的書能讓人愛上閱讀。老師說 A good story doesn't care how many pages it has，跟選項 A 相反。",
    },
  ],
};
