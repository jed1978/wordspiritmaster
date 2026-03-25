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
    "Dear Lily,\n\nHow are you? I hope things are going well at your new school. I've been thinking about you a lot.\n\nI won't lie — when you moved away last month, I felt like I lost my best study partner. I tried finding someone to practice English with, but it just wasn't the same.\n\nBut here's some good news. Our English teacher, Ms. Wang, started a lunch reading club. Every Wednesday, students bring a short English article and share what they found interesting. I joined last week and it was really fun! I even met a girl named Amy who loves the same books as I do.\n\nI still miss you, but things are slowly getting better. I hope your school has something fun like this, too.\n\nWrite back soon!\nYour friend,\nEmily",
  questions: [
    {
      question: "According to the letter, why did Emily feel upset after Lily moved away?",
      questionZh: "根據信件，柔伊搬走後艾蜜莉為何感到難過？",
      options: [
        { text: "She had no one to walk to school with", textZh: "她沒有人可以一起走路上學" },
        { text: "She lost her favorite study partner", textZh: "她失去了最好的讀書夥伴" },
        { text: "She did not like Ms. Wang's class", textZh: "她不喜歡王老師的課" },
        { text: "She could not find anyone who liked the same books", textZh: "她找不到喜歡相同書籍的人" },
      ],
      correctIndex: 1,
      explanation:
        "艾蜜莉說 I felt like I lost my best study partner，表示難過的原因是失去讀書夥伴。選項 D 是陷阱 — 找不到喜歡相同書的人是後來在讀書社才解決的問題，不是她難過的直接原因。",
    },
    {
      question: "What does Emily do at the lunch reading club?",
      questionZh: "艾蜜莉在午休讀書社做什麼？",
      options: [
        { text: "She writes letters to students in other schools", textZh: "她寫信給其他學校的學生" },
        { text: "She reads long English novels with Ms. Wang", textZh: "她和王老師一起讀長篇英文小說" },
        { text: "She brings an English article and shares what she found interesting", textZh: "她帶一篇英文文章並分享有趣的地方" },
        { text: "She practices speaking English with Amy every day", textZh: "她每天和艾咪練習說英文" },
      ],
      correctIndex: 2,
      explanation:
        "信中說 students bring a short English article and share what they found interesting — 帶文章來分享。選項 D 是陷阱：她遇到了 Amy，但信中沒說她們每天練英語。",
    },
    {
      question: "What can we learn about Emily from this letter?",
      questionZh: "從這封信我們可以得知艾蜜莉是個怎樣的人？",
      options: [
        { text: "She is angry that Lily did not write back sooner", textZh: "她因柔伊沒早點回信而生氣" },
        { text: "She is too sad to enjoy anything at school", textZh: "她太難過了，無法享受任何學校活動" },
        { text: "She is someone who tries to find positive things even when times are hard", textZh: "她是個即使在困難時期也努力找到正面事物的人" },
        { text: "She wishes she could move to a new school like Lily", textZh: "她希望自己也能像柔伊一樣轉到新學校" },
      ],
      correctIndex: 2,
      explanation:
        "艾蜜莉先承認很難過，但接著說 But here's some good news，並積極加入讀書社，顯示她努力調整心態、找到正面的事物。選項 B 是陷阱 — 她難過但沒有完全沉浸其中。",
    },
  ],
};
