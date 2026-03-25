import type { ReadingPassage } from "@/store/types";

export const area04: ReadingPassage = {
  areaId: 4,
  boss: {
    name: "天氣博士",
    emoji: "🌦️",
    personality: "神秘",
    openingLine: "你能看穿天氣的秘密嗎...？",
    defeatLine: "了不起...你讀懂了天氣的語言。",
  },
  passage:
    "Every summer, thousands of sea turtles come to a beach in Costa Rica to lay their eggs. The eggs stay in the sand for about two months. Then the baby turtles hatch and run toward the ocean. However, lights from nearby hotels confuse them. Baby turtles use moonlight to find the sea, but bright lights make them turn the wrong way. Many get lost and die. Now, the local government asks hotels near the beach to turn off their lights during turtle season. Visitors may watch, but they must not use flashlights.",
  questions: [
    {
      question: "How do baby turtles normally find the ocean after hatching?",
      questionZh: "小海龜孵化後通常如何找到海洋？",
      options: [
        { text: "They follow their mother to the water", textZh: "牠們跟著媽媽走向海水" },
        { text: "They smell the salt in the air", textZh: "牠們聞到空氣中的鹽味" },
        { text: "They use moonlight as a guide", textZh: "牠們以月光作為方向指引" },
        { text: "They follow the sound of the waves", textZh: "牠們跟隨海浪的聲音" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 Baby turtles use moonlight to find the sea，所以是用月光導航。其他選項在文章中沒有提到。",
    },
    {
      question: "What problem do hotel lights cause for baby turtles?",
      questionZh: "飯店的燈光對小海龜造成什麼問題？",
      options: [
        { text: "The heat from the lights destroys the eggs", textZh: "燈的熱度會破壞蛋" },
        { text: "The lights attract birds that eat the turtles", textZh: "燈光吸引鳥類捕食海龜" },
        { text: "The lights make the turtles go in the wrong direction", textZh: "燈光讓海龜走錯方向" },
        { text: "The lights wake up the mother turtles", textZh: "燈光吵醒了母海龜" },
      ],
      correctIndex: 2,
      explanation:
        "文章說 bright lights make them turn the wrong way，燈光讓小海龜走錯方向，迷路後死亡。",
    },
    {
      question: "What can visitors do when they come to watch the turtles?",
      questionZh: "遊客前來觀看海龜時可以做什麼？",
      options: [
        { text: "They can use flashlights to see better", textZh: "他們可以用手電筒看得更清楚" },
        { text: "They can watch but must not use flashlights", textZh: "他們可以觀看，但不能使用手電筒" },
        { text: "They are not allowed on the beach at all", textZh: "他們完全不能進入海灘" },
        { text: "They can take the baby turtles to the ocean", textZh: "他們可以帶小海龜去海邊" },
      ],
      correctIndex: 1,
      explanation:
        "文章說 Visitors may watch, but they must not use flashlights — 可以觀看但不能用手電筒，避免干擾海龜。",
    },
  ],
};
