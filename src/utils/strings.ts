export const STRINGS = {
  // Welcome
  welcomeTitle: "歡迎來到單字精靈的世界！",
  welcomeSubtitle: "捕獲英文精靈，會考輕鬆 Level Up！",
  welcomeButton: "開始冒險",

  // Tab bar
  tabExplore: "探索",
  tabBattle: "戰鬥",
  tabCollection: "圖鑑",
  tabProfile: "我的",

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

  // Boss battle
  bossOpening: "開場！",
  bossDefeat: "贏了！",
  bossHpLabel: "HP",
  battleSkip: "跳過",
  battleNext: "下一題",
  battleResult: "戰鬥結果",
  battleVictory: "擊敗了！🎉",
  battleExplanation: "解析：",
  passageHidden: "???",

  // Gacha
  gachaTitle: "召喚精靈",
  gachaTap: "點擊水晶召喚！",
  gachaNew: "新夥伴！✨",
  gachaDuplicate: "覺醒石 ×1",
  gachaAgain: "再抽一次",
  gachaClose: "返回",
  gachaNoFree: "今日已無免費召喚",
  gachaFreeRemaining: (n: number) => `剩餘免費召喚 ×${n}`,
  rarityLabels: ["★", "★★", "★★★", "★★★★", "★★★★★"] as const,

  // Spell
  spellPrompt: "請拼出這個單字：",
  spellHint: "點擊字母拼出單字",
  spellCorrect: "拼對了！🎉",
  spellWrong: "答案是：",

  // Profile
  profileTitle: "我的精靈師",
  levelLabel: "等級",
  titleLabel: "頭銜",
  streakLabel: "連續天數",
  soundToggleLabel: "音效",
  hapticToggleLabel: "觸覺回饋",
  notifToggleLabel: "每日提醒",
  totalReviewsLabel: "總複習次數",
  accuracyLabel: "正確率",
  captureRateLabel: "捕獲率",

  // Review reward
  reviewRewardBanner: "複習完畢！🎁 獎勵召喚 ×1",
  reviewRewardClaimed: "已領取今日獎勵",

  // Actions
  continueButton: "繼續 →",

  // Explore screen — loading & idle
  loadingText: "載入中...",
  idleTitle: "今天的冒險結束了！",
  idleMessage: "所有精靈都複習完了，明天再來吧！",

  // Battle tab
  battleTabTitle: "⚔️ Boss 戰鬥",
  areaLocked: "未解鎖",
  areaDefeated: "已打敗",
  areaLabel: (id: number) => `區域 ${id}`,
  totalSpiritsLabel: "已收集精靈",

  // Player titles
  titleMaster: "精靈大師",
  titleExpert: "精靈達人",
  titleExplorer: "探索家",
  titleCatcher: "捕獲師",
  titleNovice: "精靈見習生",

  // Notification
  notifTitle: "你的精靈們想你了！🌟",
  notifBody: (dueCount: number) => `${dueCount} 隻精靈等著你複習！`,

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
