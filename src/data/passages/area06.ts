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
    "Emily and Zoe had been best friends since they were five. Last year, Zoe's family moved to another city. Emily worried they would grow apart. But every Sunday, they video call for an hour and share everything — school news, funny stories, and problems. One day, Emily found an old photo of them from their first day of school. She sent it to Zoe. Zoe called right away, and they laughed together for a long time. Emily realized that distance cannot break a true friendship. Real friends always find ways to stay close.",
  questions: [
    {
      question: "Why was Emily worried after Zoe moved away?",
      questionZh: "柔伊搬走後，艾蜜莉為什麼感到擔心？",
      options: [
        { text: "She thought Zoe would forget her", textZh: "她認為柔伊會忘記她" },
        { text: "She didn't know how to use video calls", textZh: "她不知道怎麼使用視訊通話" },
        { text: "She was afraid they would stop being close friends", textZh: "她擔心兩人關係會漸漸疏遠" },
        { text: "She thought Zoe liked her new city more", textZh: "她覺得柔伊更喜歡新城市" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 Emily worried they would grow apart — grow apart 是「漸漸疏遠」的意思，她擔心友誼因為距離而變淡。",
    },
    {
      question: "What do Emily and Zoe talk about during their weekly video calls?",
      questionZh: "艾蜜莉和柔伊每週視訊時都聊些什麼？",
      options: [
        { text: "Only school homework and grades", textZh: "只聊學校功課和成績" },
        { text: "School news, funny stories, and problems", textZh: "學校消息、有趣的事和煩惱" },
        { text: "Their plans to meet in person soon", textZh: "她們即將見面的計畫" },
        { text: "Old photos and childhood memories", textZh: "舊照片和童年回憶" },
      ],
      correctIndex: 1,
      explanation:
        "文章說她們分享 school news, funny stories, and problems — 學校消息、有趣的事和煩惱，選項 D 是她們做的一件事（分享舊照），但不是每次通話的內容。",
    },
    {
      question: "What did Emily realize at the end of the story?",
      questionZh: "故事最後艾蜜莉領悟到什麼？",
      options: [
        { text: "Old photos are the best way to remember friends", textZh: "舊照片是紀念朋友最好的方式" },
        { text: "Moving to a new city can be exciting", textZh: "搬到新城市可以很令人興奮" },
        { text: "Video calls are better than meeting in person", textZh: "視訊通話比親自見面更好" },
        { text: "True friendship can survive being far apart", textZh: "真正的友情可以跨越距離" },
      ],
      correctIndex: 3,
      explanation:
        "文章說 Emily realized that distance cannot break a true friendship — 真正的友情不因距離而消失。選項 A 是觸發點，不是她領悟的主旨。",
    },
  ],
};
