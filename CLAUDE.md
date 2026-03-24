# 單字精靈大師（Word Spirit Master）— Native App 版 Project Specification

## Rules
所有開發約束定義在 `.claude/rules/` 目錄，Claude Code 自動載入：
- `coding-standards.md` — TypeScript 嚴格模式、檔案上限、路徑別名
- `ux-tone.md` — 繁體中文、遊戲語氣、答錯 UX、正向回饋
- `data-rules.md` — 多義字 ID 命名、Pack 排序、Confuser 規則、例句標註（僅在 data/ 和 types.ts 工作時載入）
- `srs-rules.md` — SRS 間隔、題型綁定 Stage、閃光版規則（僅在 core/ 和 questions/ 工作時載入）
- `gameplay-rules.md` — 抽卡保底、稀有度 ≠ 難度、Boss 段落解鎖（僅在 gacha/battle 相關檔案工作時載入）
- `visual-design.md` — 深色主題、色彩 token、精靈圖片規則、Haptic 對照表（僅在元件和畫面工作時載入）
- `response-rules.md` — 回應語言、開發優先順序

### Chinese String Examples（供 src/utils/strings.ts 使用）
```
答對鼓勵（隨機選一）:
  "太厲害了！🌟", "輕鬆拿下！", "這隻精靈超喜歡你的！", "記憶力 MAX！💪"

答錯安慰（隨機選一）:
  "沒關係，多見幾次面就會記住了！", "牠只是害羞，下次就抓到了😊",
  "差一點點！再來一次吧～", "別氣餒，精靈大師都是這樣練出來的！"

捕獲成功: "捕獲成功！✨ 新的精靈加入了！"
進化成功: "進化了！🎉 {spiritName} 變得更強了！"
複習完畢: "今日複習全部完成！🎁 領取獎勵召喚吧！"
```

---

## SPEC（功能規格）

### Project Overview
A gacha-style creature collection game that teaches 會考 English vocabulary and reading comprehension.

**Real purpose:** Help a 國三 student go from C to B on the 會考 English section in ~2 months.
**Disguised as:** An anime-style gacha creature collection game.
**Key insight:** The gacha/evolution dopamine loop IS the spaced repetition algorithm. She thinks she's playing a game; she's actually doing SRS flashcards.

**Platform:** Native mobile app — Android (Google Play) + iOS (App Store)

### Target User
- 國三學生，英文程度 C（偏弱）
- 弱點：單字量不足、閱讀測驗看不完/看不懂
- 興趣：動漫、二次元、手遊、抽卡、寶可夢
- 每日可用時間：15–20 分鐘
- 裝置：Android 手機為主，需同時支援 iOS

### Tech Stack (STRICT)
- **Expo SDK 52+ (managed workflow)** — React Native + TypeScript
- **Expo Router** for navigation (file-based routing)
- **React Native Reanimated 3** for animations
- **expo-audio** for sound effects — ⚠️ NOT expo-av (deprecated)
- **AsyncStorage** for local persistence
- **expo-notifications** for daily review reminders
- **expo-splash-screen** for launch experience
- **EAS Build** / **EAS Submit** for cloud builds & store submission
- NO external APIs at runtime — fully offline
- NO backend server — all data bundled in app
- NO in-app purchases

---

### Vocabulary Source
**1200 不重複單字（教育部基本單字）→ 1276 隻精靈**（78 個多義字拆分為 2-3 隻）

按考試頻率排序，分為 **26 個 packs**（每 pack ~50 隻），不是按主題分類。

8 個 Spirit Type（精靈屬性），依單字語意類別分配：

| Spirit Type | Icon | 語意類別 | Color |
|-------------|------|---------|-------|
| 🔥 Flame 火焰系 | Action verbs (run, jump, eat...) | #ef4444 |
| 💧 Aqua 水流系 | Feelings & emotions (happy, sad...) | #3b82f6 |
| 🌿 Nature 草木系 | Animals & nature (dog, tree...) | #22c55e |
| ⚡ Metal 金屬系 | School & learning (book, test...) | #eab308 |
| 🌸 Bloom 花語系 | People & family (mother, friend...) | #ec4899 |
| ✨ Star 星光系 | Daily life & objects (house, food...) | #a855f7 |
| 🌙 Moon 月影系 | Time & weather (today, rain...) | #6366f1 |
| 💎 Crystal 結晶系 | Adjectives & descriptions (big, fast...) | #06b6d4 |

### Data Types

```typescript
// === Word Data ===
interface WordEntry {
  id: string;            // "happy" 或 "bear_v" 或 "case_n_案件"（見 Data Rules）
  word: string;          // English word
  pos: string;           // n / v / adj / adv / prep / conj / pron
  posCategory: PosCategory; // noun / verb / adj / func（視覺分類）
  meaning: string;       // 繁體中文釋義
  type: SpiritType;      // flame / aqua / nature / metal / bloom / star / moon / crystal
  pack: number;          // 1-26（按考試頻率排序）
  example: string;       // 例句（Phase 2+）。超出 1200 單的字標中文。
  confusers: [string, string, string]; // 3 個中文誘答（同詞性、同語意場）
}

type PosCategory = 'noun' | 'verb' | 'adj' | 'func';
type SpiritType = 'flame' | 'aqua' | 'nature' | 'metal' | 'bloom' | 'star' | 'moon' | 'crystal';

// === Captured Spirit (Player's spirit instance) ===
interface CapturedSpirit {
  wordId: string;        // references WordEntry.id
  stage: number;         // 1-6 (6 = MASTERED)
  consecutiveCorrect: number;
  nextReviewAt: number;  // Unix timestamp
  capturedAt: number;
  lastReviewedAt: number;
  isShiny: boolean;      // 閃光版（Phase 3）
  totalReviews: number;
  totalCorrect: number;
}

// === Game State ===
interface GameState {
  player: {
    level: number;
    xp: number;
    title: string;
  };
  spirits: Record<string, CapturedSpirit>; // keyed by wordId
  session: {
    state: SessionState;
    dailyReviewCompleted: boolean;    // 今日複習是否做完
    dailyReviewRewardClaimed: boolean; // 複習獎勵抽是否已領
    dailyCaptureCount: number;
    todayDate: string; // "YYYY-MM-DD"
  };
  gacha: {
    freeRemainingToday: number;
    pityCounter: number;  // 連續未出 ★★★ 的次數，出了歸零
  };
  streak: {
    currentStreak: number;
    lastPlayDate: string;
    longestStreak: number;
  };
  progress: {
    unlockedAreas: number[];  // Boss area IDs
    defeatedAreas: number[];
    achievements: string[];   // achievement IDs
  };
  settings: {
    soundEnabled: boolean;
    hapticEnabled: boolean;
    notificationTime: string; // "HH:mm"
  };
}

type SessionState = 'idle' | 'review' | 'explore' | 'battle' | 'result';
type QuestionType = 'selectChinese' | 'selectEnglish' | 'spellWord' | 'posQuestion' | 'buildSentence';

// === Persistence ===
interface PersistedState {
  version: number;      // Increment on schema changes
  gameState: GameState;
}

// === Boss / Reading Passage ===
interface ReadingPassage {
  areaId: number;
  boss: {
    name: string;       // "書蟲先生"
    emoji: string;      // "📖"
    personality: string; // "傲慢" | "可愛" | "搞笑" | "神秘" | "熱血" | "溫柔"
    openingLine: string; // "你以為你看得懂我嗎？哼！"
    defeatLine: string;  // "不...不可能！你居然讀懂了！"
  };
  passage: string;       // English text (60-150 words)
  questions: {
    question: string;    // English
    questionZh: string;  // Chinese translation
    options: { text: string; textZh: string }[];
    correctIndex: number;
    explanation: string; // 答錯時的中文解析
  }[];
}
```

### Spaced Repetition (Disguised as Evolution)

```
Stage 1 (蛋/Egg)      → Just captured. Review in 1 min.
Stage 2 (幼體/Baby)    → 1 correct review. Next in 10 min.
Stage 3 (成長/Teen)    → 2 consecutive correct. Next in 1 day.
Stage 4 (成熟/Adult)   → 3 consecutive correct. Next in 3 days.
Stage 5 (究極/Ultimate) → 4 consecutive correct. Next in 7 days.
★ MASTERED (精通)      → 5 consecutive correct. Rarely re-enters review pool.
```

### Question Type Evolution（題型隨階段升級）
進化不只是視覺變化，**玩法也在升級**：

| Stage | 題型 | 操作方式 | Phase |
|-------|------|---------|-------|
| 1 蛋 | 看英文，選中文 | 4選1 點擊（confusers 來自 WordEntry.confusers） | Phase 1 |
| 2 幼體 | 看中文，選英文 | 4選1 點擊（英文選項從同 pack 同 pos 隨機抽） | Phase 1 |
| 3 成長 | 拼出英文 | 字母方塊拖拉排列（Wordle 風格） | Phase 2 |
| 4 成熟 | 詞性題 | 句子空格填詞 / 句中標出指定詞性 | Phase 3 |
| 5 究極 | 造句題 | 中文提示 + 打散英文字詞排列正確語序 | Phase 3 |
| ★ 精通 | 隨機以上任一 | 混合 | Phase 3 |

**Stage 4 詞性題（兩種模式隨機）：**
- **句子填空**：有空格的例句 + 4 個同詞性字選填
- **標出詞性**：給句子，點擊「所有的動詞」或「所有的名詞」

**Stage 5 造句題：**
- 顯示中文句子 + 打散的英文字詞方塊（含標點）
- 拖拉排成正確英文語序
- 例：「我很快樂。」→ [happy] [am] [I] [.] → [I] [am] [happy] [.]

### Wrong Answer UX
答錯時顯示：正確答案 + 💡 一句中文解析 + 鼓勵語。停留 3 秒或點擊繼續。
- 例：「正確答案：快樂的 💡 happy 跟 hungry 長得像，但 happy 是快樂，hungry 是飢餓喔！」
- Boss 戰：解析說明「為什麼是這個答案」（如「文章說 He went to the store，所以是商店不是學校」）

### Post-Mastery（閃光版/異色版，Phase 3）
精通的精靈偶爾（5%）出現在探索的「回歸挑戰」區塊，答對解鎖閃光版（彩虹光暈 + 粒子特效）。讓她有理由繼續複習已學會的字。

### Reading Comprehension (Boss Battles)
- Boss = 會考格式短文（60-150 words），HP = 題數（2-4）
- **Boss 個性系統：** 每個 Boss 有名字、emoji、開場台詞、認輸台詞
- **精靈提示（強化版）：** 已捕獲單字直接顯示小字中文（不需長按），長按顯示例句
- **逐題解鎖段落：** 初始只顯示前 1-2 句，答對一題展開更多
- **答錯解析：** 附中文說明「為什麼是這個答案」

### Daily Session Structure (15-20 min)
```
[Open App] → Daily reward (free gacha pull)
    ↓
[Review — 5 min] Due spirits for SRS review (題型跟隨 Stage)
    ↓
[Review Complete!] → 🎁 複習完畢獎勵抽（全部做完才給，每日限 1 次）
    ↓
[Explore — 5 min] Encounter 5-10 new words as wild spirits (Stage 1 題型)
    ↓
[Boss Battle — 5-10 min] One reading passage
    ↓
[Session Complete] Stats + streak counter + encouragement
```

### Gacha System
- Free pulls: 1/day (login), 1/boss defeated, bonus for streaks, 1/複習完畢
- Rarity: ★ to ★★★★★ — **視覺稀有度，不等於難度**
- 高稀有度給更多提示（例句、2選1），提高捕獲成功率
- **保底（Pity System）：** pityCounter 追蹤，10 連沒出 ★★★ → 第 11 次保底
- Duplicates → "覺醒石" for force-evolving
- Pull animation: crystal spin → crack → spirit emerges with type-colored explosion

---

### App Architecture

#### Directory Structure
```
WordSpiritMaster/
├── app/                          # Expo Router screens (ROOT LEVEL)
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab bar: 探索 / 戰鬥 / 圖鑑 / 我的
│   │   ├── explore.tsx
│   │   ├── battle.tsx
│   │   ├── collection.tsx
│   │   └── profile.tsx
│   ├── gacha.tsx
│   ├── battle/[areaId].tsx
│   └── spirit/[wordId].tsx
├── src/
│   ├── components/
│   │   ├── spirits/              # SpiritCard, SpiritGrid, EvolutionAnimation
│   │   ├── battle/               # BossScene, QuestionCard, PassageView
│   │   ├── gacha/                # GachaPull, CrystalAnimation, RevealAnimation
│   │   ├── questions/            # SelectQuestion, SpellInput, PosQuestion, BuildSentence
│   │   ├── shared/               # Button, ProgressBar, TypeBadge
│   │   └── ui/                   # TabBar, Header, Modal, Toast
│   ├── core/
│   │   ├── srs.ts                # SRS logic (pure functions)
│   │   ├── questions.ts          # getQuestionType(stage), generateOptions()
│   │   ├── gacha.ts              # Pull logic + pity (pure functions)
│   │   ├── combat.ts             # Boss battle logic (pure functions)
│   │   └── progression.ts        # XP, level, achievements (pure functions)
│   ├── data/
│   │   ├── words/                # pack01.ts ~ pack26.ts (WordEntry[])
│   │   └── passages/             # area01.ts ~ area26.ts (ReadingPassage[])
│   ├── store/
│   │   ├── GameContext.tsx        # React Context + useReducer
│   │   ├── gameReducer.ts        # All state transitions
│   │   ├── persistence.ts        # AsyncStorage save/load with migration
│   │   └── types.ts              # All TypeScript types (above)
│   ├── hooks/
│   │   ├── useReviewQueue.ts
│   │   ├── useDailySession.ts
│   │   └── useStreak.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── colors.ts             # ALL color tokens (see Visual Design)
│   │   ├── strings.ts            # ALL Chinese text + tone examples
│   │   └── spiritImage.ts        # SPIRIT_IMAGES mapping + fallback
│   └── assets/
│       ├── spirits/              # AI-generated PNG (160 files)
│       └── sounds/               # Bundled audio (<50KB each)
├── app.config.ts
├── eas.json
├── tsconfig.json
└── package.json
```

#### State Management
- React Context + useReducer
- AsyncStorage persistence (debounced 500ms)
- State migration: `PersistedState.version` check on load
- ⚠️ Phase 3+ 如果 >500ms，評估遷移至 expo-sqlite

#### Animation System (Reanimated 3)

| Animation | Technique | Notes |
|-----------|-----------|-------|
| Gacha crystal spin | `withRepeat` + `withTiming` (rotate) | Spin → crack → burst |
| Spirit evolution | `withSequence` (flash → Image swap → scale up) | 切換到下一階段的 PNG |
| Correct answer | `withSpring` (bounce) + opacity flash | Sparkle via multiple animated views |
| Wrong answer | `withSequence` (shake X-axis) | Gentle, not punishing |
| Boss HP bar | `withTiming` (width decrease) | Smooth decrease |
| Boss defeat | `withTiming` (opacity → 0, scale → 0) | Dramatic shrink + defeat line |
| Boss passage expand | `withTiming` (height expand) | 逐題解鎖段落動畫 |
| Floating damage | `withTiming` (translateY up + fade) | Boss battle |
| Spell block drag | `withSpring` (snap to position) | 字母方塊拖拉 |
| Sentence block drag | `withSpring` (snap to slot) | 造句方塊拖拉 |
| Spirit idle | `withRepeat(withSequence(withTiming(-3, 600), withTiming(0, 600)))` | 浮動呼吸感 |

#### Spirit Visual (AI-Generated Images)
**160 張 PNG：8 屬性 × 5 進化階段 × 4 詞性類別**

4 大詞性類別：
| posCategory | 包含 POS | 體型 |
|-------------|---------|------|
| noun | n | 圓潤飽滿，像小動物 |
| verb | v | 有手腳，動態姿勢 |
| adj | adj, adv | 飄浮感，有翅膀或光環 |
| func | prep, conj, pron | 幾何/水晶體型 |

進化階段影響大小和複雜度：
| Stage | 顯示大小 | 複雜度 | 表情 |
|-------|---------|--------|------|
| 1 蛋 | 60% (48px) | 極簡，帶蛋殼碎片 | 害羞半閉眼 |
| 2 幼體 | 75% (60px) | 簡單 | 好奇大眼 |
| 3 成長 | 100% (80px) | 中等 | 自信微笑 |
| 4 成熟 | 115% (92px) | 精緻，有裝飾品 | 帥氣 |
| 5 究極 | 130% (104px) | 華麗，全身發光 | 霸氣 |

圖片規格：512×512px PNG 透明背景，Q版可愛卡通風格。
命名：`spirit_{type}_{posCategory}_{stage}.png`
存放：`src/assets/spirits/`
生成 prompt 見：`spirit-image-prompts.md` + `spirit-metal-prompts.md`

**Fallback（圖片未到位時）：**
```typescript
// src/utils/spiritImage.ts
// 如果對應 PNG 不存在，渲染 fallback：
// - 屬性色圓形背景（用 type color）
// - 中央顯示屬性 emoji icon（🔥💧🌿⚡🌸✨🌙💎）
// - 右下角小字顯示 stage 數字
```

**App size 預算：**
```
Code + JS bundle:     ~3MB
Word data (TS):       ~1MB
Spirit images (160):  ~5MB（需壓縮到 ~30KB/張，用 tinypng 或降到 256x256）
Sound effects (15):   ~0.5MB
Other assets:         ~0.5MB
────────────────────────────
Total target:         <12MB（留 3MB buffer for 15MB limit）
```
⚠️ 如果 512px 太大，降到 **256×256px** 可以把圖片總量從 ~8MB 降到 ~2MB。

#### Sound System (Phase 2+)
- Use `expo-audio` (NOT expo-av)
- 10-15 small .mp3 files in src/assets/sounds/ (<50KB each)
- Files: correct, wrong, capture, evolve, gacha_spin, gacha_reveal_1~5, boss_hit, boss_defeat, levelup
- Preload on app start; Settings toggle for mute

#### Push Notifications (Daily Reminders)
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "你的精靈們想你了！🌟",
    body: `${dueCount} 隻精靈等著你複習！`,
  },
  trigger: { hour: 19, minute: 30, repeats: true },
});
```
- Ask permission on first session complete (not on install)
- Configurable time in settings

---

### Visual Design Direction

#### 整體風格：深色手遊風
目標：看起來像手遊，不像學習 app。

#### Color Tokens（全部定義在 src/utils/colors.ts）
```typescript
export const COLORS = {
  // Base
  bgPrimary:     '#1a1a2e',  // 深藍黑（最底層背景）
  bgCard:        '#1e1e3a',  // 深紫灰（卡片/面板）
  bgButton:      '#2a2a4a',  // 深灰紫（選項按鈕）
  borderButton:  '#3a3a6a',  // 灰紫邊（按鈕邊框）
  bgDisabled:    '#1a1a2a',  // 禁用背景
  overlay:       'rgba(0,0,0,0.6)', // Modal overlay

  // Text
  textPrimary:   '#e0e0ff',  // 主文字（淺藍白）
  textSecondary: '#94a3b8',  // 次要文字（灰藍）
  textHint:      '#666666',  // 提示文字（暗灰）
  textDisabled:  '#444444',  // 禁用文字

  // Semantic
  correct:       '#4ade80',  // 正確（綠）
  wrong:         '#f87171',  // 錯誤（紅）
  accent:        '#a78bfa',  // 強調（紫，進度/active tab）
  warning:       '#fbbf24',  // 警告/streak（黃）

  // Spirit Type Colors
  flame:   '#ef4444',
  aqua:    '#3b82f6',
  nature:  '#22c55e',
  metal:   '#eab308',
  bloom:   '#ec4899',
  star:    '#a855f7',
  moon:    '#6366f1',
  crystal: '#06b6d4',

  // Spirit Type Glow (light version for box-shadow)
  flameGlow:   'rgba(239,68,68,0.3)',
  aquaGlow:    'rgba(59,130,246,0.3)',
  natureGlow:  'rgba(34,197,94,0.3)',
  metalGlow:   'rgba(234,179,8,0.3)',
  bloomGlow:   'rgba(236,72,153,0.3)',
  starGlow:    'rgba(168,85,247,0.3)',
  moonGlow:    'rgba(99,102,241,0.3)',
  crystalGlow: 'rgba(6,182,212,0.3)',
} as const;
```

#### Component Design Tokens
- 選項按鈕：48dp+ 高、圓角 12px、bgButton + borderButton、點擊微縮放
- 精靈展示區：居中 Image（大小隨 stage 變化）+ 屬性色光暈
- 進化進度：5 個小光點（亮 = accent, 暗 = bgButton）
- Tab Bar：固定底部、bgCard 背景、active = accent、inactive = textHint

---

### Native-Specific UX

#### Bottom Tab Bar
```
┌────────┬────────┬────────┬────────┐
│  📖    │  ⚔️    │  📚    │  👤    │
│  探索  │  戰鬥  │  圖鑑  │  我的  │
└────────┴────────┴────────┴────────┘
```
Custom styled (not default React Navigation). Badge on 探索 (due count), badge on 戰鬥 (new area).

#### Safe Area & Responsive
- `SafeAreaView` for all screens
- 360px width minimum
- Touch targets: 48×48dp minimum

#### Offline First
- All data bundled in app binary
- No network requests ever
- App size target: **<15MB**（圖片需壓縮，見 App size 預算）

---

### App Store Deployment

#### App Identity
```
App Name: 單字精靈大師 — Word Spirit Master
Bundle ID (iOS): com.clearforge.wordspiritmaster
Package Name (Android): com.clearforge.wordspiritmaster
```

#### EAS Configuration (eas.json)
```json
{
  "cli": { "version": ">= 13.0.0" },
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal", "android": { "buildType": "apk" } },
    "production": { "autoIncrement": true }
  },
  "submit": {
    "production": {
      "ios": { "appleId": "{{APPLE_ID}}", "ascAppId": "{{ASC_APP_ID}}", "appleTeamId": "{{APPLE_TEAM_ID}}" },
      "android": { "serviceAccountKeyPath": "./google-play-service-account.json" }
    }
  }
}
```

#### App Store Checklist
**Both:** Icon 1024×1024, privacy policy URL, description, screenshots (3-5), age 4+/Everyone, category Education
**iOS:** Apple Developer ($99/yr), screenshots iPhone 6.7", review notes: "Educational English vocabulary game. All content bundled offline. No IAP, no accounts."
**Android:** Google Play ($25), IARC content rating, data safety "No data collected", feature graphic 1024×500

#### App Store Listing
**Name:** 單字精靈大師
**Subtitle:** 捕獲英文精靈，會考輕鬆 Level Up！
**Description:** 把背英文單字變成抓精靈！8 種精靈屬性，超過 1200 隻精靈等你收集。24+ 個閱讀 Boss 戰，抽卡系統每天免費抽，考前衝刺模式。完全離線可用。
**Keywords (iOS):** 英文,單字,會考,背單字,學英文,精靈,抽卡,國中,教育,學習

#### Privacy Policy
URL: `https://clearforge.com.tw/wordspiritmaster/privacy`
Content: 「本 App 不收集任何個人資料。所有學習進度僅存儲在您的裝置本地。」

#### Release Strategy
1. Internal testing (EAS Preview) → daughter's phone, 3-5 days
2. Closed testing (Google Play internal track, 14-day compliance)
3. Submit both stores simultaneously
4. Post-launch: EAS Update for OTA content updates

---

## DEVELOPMENT PHASES

### Phase 1: Core Gameplay Loop
1. Initialize Expo project (SDK 52+, TypeScript, Expo Router)
2. app.config.ts (name, icon placeholder, splash screen)
3. All TypeScript types (src/store/types.ts — 完整的 WordEntry, CapturedSpirit, GameState 等)
4. Color tokens (src/utils/colors.ts) + Chinese strings (src/utils/strings.ts)
5. SRS core logic + `getQuestionType(stage)` (src/core/srs.ts, src/core/questions.ts)
6. Seed 200 high-frequency words (pack01-04) with confusers
7. GameContext + gameReducer + AsyncStorage persistence (debounced 500ms)
8. **Stage 1 題型：看英文，選中文**（4選1，用 confusers）— 捕獲新精靈
9. **Stage 2 題型：看中文，選英文**（4選1，從同 pack 同 pos 隨機抽英文選項）— 複習
10. 答錯顯示：正確答案 + 💡 中文解析 + 鼓勵語
11. Basic animations: correct (bounce), wrong (shake), evolution (flash + image swap)
12. 精靈圖片整合 — Stage 1-2 PNG（64 張）+ fallback 機制
13. Collection screen: grid + Modal detail + 屬性篩選
14. Tab navigation (探索 + 圖鑑)
15. 深色主題 UI（依照 Color Tokens 實作）
16. Daily session tracking

**不做（後續 Phase）：** KK 音標、音效、spirit/[wordId] 詳情頁、Stage 3-5 題型

**Deliverable:** 兩種題型的捕獲 + 複習迴圈。Expo Go 可用。

### Phase 2: Boss Battles + Gacha + Spelling
1. 6 個 Easy 閱讀段落（area01-06）含 Boss 個性系統
2. Battle screen：逐題解鎖段落 + 精靈中文提示 + 答錯解析
3. **Stage 3 題型：字母方塊拼字**（Wordle 風格）
4. 例句資料加入 WordEntry（超出 1200 單字標中文）
5. Area map (node graph)
6. Gacha pull screen + 保底機制（pityCounter）
7. 複習完畢獎勵抽
8. Daily login + streak
9. Push notifications
10. Sound effects (expo-audio)
11. All haptic feedback
12. Spirit detail page (spirit/[wordId].tsx)
13. KK 音標加入 WordEntry
14. 精靈圖片 Stage 3-4 補齊（64 張）

**Deliverable:** 完整每日循環 + 3 種題型 + Boss 戰 + 抽卡。

### Phase 3: Content + POS + Sentences + Shiny
1. 擴充到 600 words (pack05-12)
2. 12 個 Medium 閱讀段落 (area07-18)
3. **Stage 4 題型：詞性題**（句子填空 + 標出詞性）
4. **Stage 5 題型：造句題**（中文提示 + 排列英文語序）
5. Level + titles + achievements (15-20)
6. Exam sprint mode
7. Profile tab
8. 閃光版/異色版系統（isShiny, 5% 回歸挑戰）
9. 精靈圖片 Stage 5 補齊（32 張）— 全 160 張完成
10. ⚠️ AsyncStorage 效能評估

**Deliverable:** 全 5 種題型 + 4 週內容 + 衝刺模式 + 閃光系統。

### Phase 4: Full Content + Store Preparation
1. 完成所有 1276 隻精靈 (pack13-26)
2. 全部閱讀段落 + 模擬考
3. Onboarding tutorial (3 steps)
4. Parent hidden panel (long press 5×)
5. App icon, splash screen, screenshots
6. Privacy policy page
7. App Store listing + metadata
8. EAS Build production
9. Real device testing (Android + iOS)
10. Performance + app size check (<15MB)

**Deliverable:** Store-ready builds.

### Phase 5: Store Submission + Launch
1. Google Play internal track + data safety + content rating
2. Apple App Store Connect + TestFlight
3. Submit both stores
4. Respond to review feedback
5. Public launch
6. Post-launch OTA updates

**Deliverable:** Live on both stores.