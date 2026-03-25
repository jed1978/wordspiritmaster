import type { ReadingPassage } from "@/store/types";

export const area04: ReadingPassage = {
  areaId: 4,
  boss: {
    name: "天氣博士",
    emoji: "🌦️",
    personality: "神秘",
    openingLine: "你能看穿天氣的秘密嗎...？",
    defeatLine: "了不起...你讀懂了自然的語言。",
  },
  passage:
    "Every summer, thousands of sea turtles travel to a beach in Costa Rica to lay their eggs. The eggs stay buried in the sand for about two months. When the baby turtles hatch, they must quickly find the ocean. They do this by following the natural light of the moon and stars. However, bright lights from nearby hotels lead them in the wrong direction. Many baby turtles get lost and never reach the sea. To solve this problem, the local government now requires hotels near the beach to turn off outdoor lights during turtle season. Visitors are welcome to watch, but the use of flashlights is not allowed.",
  questions: [
    {
      question: "According to the passage, how do baby turtles find the ocean after hatching?",
      questionZh: "根據文章，小海龜孵化後如何找到海洋？",
      options: [
        { text: "They follow their mother to the water", textZh: "牠們跟著母親走向海水" },
        { text: "They are guided by the light of the moon and stars", textZh: "牠們依靠月亮和星星的光導航" },
        { text: "They smell the salt water from the beach", textZh: "牠們從沙灘上聞到海水的鹹味" },
        { text: "They follow the sound of the waves", textZh: "牠們跟隨海浪的聲音" },
      ],
      correctIndex: 1,
      explanation:
        "文章說 They do this by following the natural light of the moon and stars — 靠月亮和星星的光導航。其他三個選項（跟著媽媽、聞鹽味、聽浪聲）在文章中完全沒有提到。",
    },
    {
      question: "What does the word \"buried\" most likely mean in the passage?",
      questionZh: "文章中 \"buried\" 這個字最可能是什麼意思？",
      options: [
        { text: "Kept warm by the sun", textZh: "被太陽保持溫暖" },
        { text: "Hidden under the ground", textZh: "埋在地底下" },
        { text: "Carried by the ocean water", textZh: "被海水帶走" },
        { text: "Protected by the mother turtle", textZh: "被母海龜保護著" },
      ],
      correctIndex: 1,
      explanation:
        "buried 原意是「埋入土中」。文章說蛋 buried in the sand，結合上下文（蛋放在沙裡兩個月），可推知是「埋在沙子裡」。",
    },
    {
      question: "According to the passage, what must visitors do when they come to watch the turtles?",
      questionZh: "根據文章，遊客前來觀看海龜時必須遵守什麼規定？",
      options: [
        { text: "They must arrive before midnight", textZh: "他們必須在午夜前抵達" },
        { text: "They must book a tour in advance", textZh: "他們必須事先預約導覽" },
        { text: "They must not use flashlights", textZh: "他們不能使用手電筒" },
        { text: "They must stay at least ten meters away", textZh: "他們必須保持至少十公尺的距離" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 the use of flashlights is not allowed — 不能用手電筒。其他選項（午夜前到、預約導覽、保持距離）都是文章沒有提到的資訊，是常識干擾陷阱。",
    },
  ],
};
