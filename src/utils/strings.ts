export const STRINGS = {
  // Welcome
  welcomeTitle: "歡迎來到單字精靈的世界！",
  welcomeSubtitle: "捕獲英文精靈，會考輕鬆 Level Up！",
  welcomeButton: "開始冒險",

  // Tab bar
  tabExplore: "探索",
  tabCollection: "圖鑑",

  // Explore screen — review mode
  reviewModeTitle: "精靈回來找你了！",
  reviewModePrompt: (done: number, total: number) =>
    `複習進度 ${done}/${total}`,
  reviewInstruction: "這隻精靈的英文是？",

  // Explore screen — capture mode
  captureModeTitle: "野生精靈出現了！",
  captureModeInstruction: "這個英文的意思是？",
  captureSuccess: "捕獲成功！✨",
  captureFail: "牠溜走了...",
  capturedCount: (done: number) => `今日捕獲 ${done} 隻`,

  // Answer feedback
  correctFeedback: "答對了！",
  wrongFeedback: "沒關係，多見幾次面就會記住了！",
  wrongAnswerPrefix: "正確答案：",
  hintPrefix: "💡 ",

  // Evolution
  evolutionTitle: (stage: string) => `進化成${stage}了！`,

  // Collection screen
  collectionTitle: "精靈圖鑑",
  collectionFilterAll: "全部",
  collectionEmpty: "還沒有精靈喔，去探索 tab 捕獲吧！",
  masteredBadge: "精通",
  notCaptured: "???",

  // Spirit detail modal
  spiritDetailWord: "英文單字",
  spiritDetailMeaning: "中文意思",
  spiritDetailPos: "詞性",
  spiritDetailStage: "進化階段",
  spiritDetailNextReview: "下次複習",
  spiritDetailTotalReviews: "複習次數",
  spiritDetailClose: "關閉",

  // Stats
  statsCaptures: "已捕獲",
  statsMastered: "精通",
  statsTotal: "總計",
  statsShiny: "閃光",
  statsCompletion: "完成度",

  // POS labels
  posN: "名詞",
  posV: "動詞",
  posAdj: "形容詞",
  posAdv: "副詞",
  posPrep: "介系詞",
  posConj: "連接詞",
  posPron: "代名詞",

  // Correct encouragements (random)
  correctEncouragements: [
    "太厲害了！🌟",
    "輕鬆拿下！",
    "這隻精靈超喜歡你的！",
    "記憶力 MAX！💪",
  ] as const,

  // Wrong encouragements (random)
  wrongEncouragements: [
    "沒關係，多見幾次面就會記住了！",
    "牠只是害羞，下次就抓到了😊",
    "差一點點！再來一次吧～",
    "別氣餒，精靈大師都是這樣練出來的！",
  ] as const,

  // Actions
  continueButton: "繼續 →",

  // Explore screen — loading & idle
  loadingText: "載入中...",
  idleTitle: "今天的冒險結束了！",
  idleMessage: "所有精靈都複習完了，明天再來吧！",

  // Time labels
  nextReviewSoon: "馬上就到！",
  nextReviewMinutes: (min: number) => `${min} 分鐘後`,
  nextReviewHours: (h: number) => `${h} 小時後`,
  nextReviewDays: (d: number) => `${d} 天後`,
} as const;

export function getPosLabel(pos: string): string {
  const map: Record<string, string> = {
    n: STRINGS.posN,
    v: STRINGS.posV,
    adj: STRINGS.posAdj,
    adv: STRINGS.posAdv,
    prep: STRINGS.posPrep,
    conj: STRINGS.posConj,
    pron: STRINGS.posPron,
  };
  return map[pos] ?? pos;
}

export function getRandomCorrectFeedback(): string {
  const arr = STRINGS.correctEncouragements;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomWrongFeedback(): string {
  const arr = STRINGS.wrongEncouragements;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getGenericHint(word: string, pos: string): string {
  const posLabel = getPosLabel(pos);
  return `${word} 是${posLabel}喔，多看幾次就記住了～`;
}

export function formatNextReview(nextReviewAt: number): string {
  const ms = nextReviewAt - Date.now();
  if (ms <= 0) return STRINGS.nextReviewSoon;
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 60) return STRINGS.nextReviewMinutes(minutes);
  const hours = Math.floor(ms / 3_600_000);
  if (hours < 24) return STRINGS.nextReviewHours(hours);
  const days = Math.floor(ms / 86_400_000);
  return STRINGS.nextReviewDays(days);
}
