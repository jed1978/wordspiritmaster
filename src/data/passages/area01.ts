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
    "Kevin never liked reading. His teacher asked everyone to borrow a library book and talk about it in class. Kevin picked the thinnest book — a story about a boy who trains a wild horse. He only planned to read a few pages, but he finished the whole book that night. The next morning, he went back to the library for more. When Kevin shared the horse story in class, all his classmates wanted to read it, too. His teacher smiled and said, \"A good story doesn't care how many pages it has.\" Kevin now reads one book every week.",
  questions: [
    {
      question: "According to the passage, why did Kevin choose the book about the wild horse?",
      questionZh: "根據文章，凱文為什麼選了那本野馬的書？",
      options: [
        { text: "His teacher told him to choose it", textZh: "他的老師叫他選那本" },
        { text: "His classmates said it was interesting", textZh: "同學說那本書很有趣" },
        { text: "It was the thinnest book he could find", textZh: "那是他能找到的最薄的書" },
        { text: "He had always loved stories about animals", textZh: "他一直都很喜歡動物故事" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 Kevin picked the thinnest book — 他選那本書是因為它最薄，不是因為喜歡動物或同學推薦。注意：他選完才發現是馬的故事。",
    },
    {
      question: "Which of the following BEST describes Kevin at the end of the story?",
      questionZh: "下列何者最能描述故事結尾的凱文？",
      options: [
        { text: "A student who only reads short books", textZh: "一個只讀薄書的學生" },
        { text: "Someone who became a regular reader", textZh: "一個養成定期閱讀習慣的人" },
        { text: "A boy who wants to be a librarian", textZh: "一個想當圖書館員的男孩" },
        { text: "The best reader in his class", textZh: "班上閱讀最厲害的人" },
      ],
      correctIndex: 1,
      explanation:
        "結尾說 Kevin now reads one book every week — 他變成固定每週讀一本書的人。選項 A 是陷阱：老師說好故事不在乎頁數多少，並不代表凱文只讀薄書。",
    },
    {
      question: "What is the passage mainly about?",
      questionZh: "這篇文章主要在說什麼？",
      options: [
        { text: "Why short books are more fun than long ones", textZh: "為什麼短書比長書更有趣" },
        { text: "How a school library helped students do better", textZh: "學校圖書館如何幫助學生進步" },
        { text: "How the right book turned a boy into a reader", textZh: "一本對的書如何讓一個男孩愛上閱讀" },
        { text: "Why students should listen to their teachers", textZh: "為什麼學生應該聽從老師的建議" },
      ],
      correctIndex: 2,
      explanation:
        "這篇文章的核心是：凱文因為一本書改變了他對閱讀的態度。選項 A 是陷阱 — 老師的那句話是說好故事不在乎頁數，並不是全文主旨。",
    },
  ],
};
