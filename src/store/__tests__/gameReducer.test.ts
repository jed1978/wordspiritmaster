import {
  gameReducer,
  INITIAL_GAME_STATE as initialGameState,
} from "@/store/gameReducer";
import type {
  GameState,
  GameAction,
  CapturedSpirit,
  SpiritStage,
} from "@/store/types";

function makeSpirit(overrides: Partial<CapturedSpirit> = {}): CapturedSpirit {
  return {
    wordId: "happy",
    stage: 1 as SpiritStage,
    consecutiveCorrect: 0,
    nextReviewAt: 0,
    capturedAt: 1000,
    lastReviewedAt: 1000,
    totalReviews: 0,
    totalCorrect: 0,
    isShiny: false,
    ...overrides,
  };
}

describe("initialGameState", () => {
  it("has correct default values", () => {
    expect(initialGameState.spirits).toEqual({});
    expect(initialGameState.currentPack).toBe(1);
    expect(initialGameState.wordsEncountered).toEqual([]);
    expect(initialGameState.streak).toBe(0);
    expect(initialGameState.lastSessionDate).toBeNull();
    expect(initialGameState.totalXp).toBe(0);
    expect(initialGameState.level).toBe(1);
    expect(initialGameState.hasSeenWelcome).toBe(false);
    expect(initialGameState.settings.hapticEnabled).toBe(true);
  });
});

describe("gameReducer", () => {
  describe("LOAD_STATE", () => {
    it("replaces entire state", () => {
      const loaded: GameState = { ...initialGameState, totalXp: 999 };
      const result = gameReducer(initialGameState, {
        type: "LOAD_STATE",
        state: loaded,
      });
      expect(result.totalXp).toBe(999);
    });
  });

  describe("CAPTURE_SPIRIT", () => {
    it("adds a new spirit at stage 1", () => {
      const result = gameReducer(initialGameState, {
        type: "CAPTURE_SPIRIT",
        wordId: "happy",
      });

      expect(result.spirits["happy"]).toBeDefined();
      expect(result.spirits["happy"].stage).toBe(1);
      expect(result.spirits["happy"].consecutiveCorrect).toBe(0);
      expect(result.spirits["happy"].wordId).toBe("happy");
    });

    it("increments totalXp and dailySession.capturesDone", () => {
      const result = gameReducer(initialGameState, {
        type: "CAPTURE_SPIRIT",
        wordId: "happy",
      });

      expect(result.totalXp).toBe(10); // XP_PER_CAPTURE
      expect(result.dailySession.capturesDone).toBe(1);
    });

    it("returns new state object (immutable)", () => {
      const result = gameReducer(initialGameState, {
        type: "CAPTURE_SPIRIT",
        wordId: "happy",
      });
      expect(result).not.toBe(initialGameState);
      expect(result.spirits).not.toBe(initialGameState.spirits);
    });

    it("does not re-capture existing spirit", () => {
      const stateWithSpirit: GameState = {
        ...initialGameState,
        spirits: { happy: makeSpirit({ stage: 3 }) },
      };
      const result = gameReducer(stateWithSpirit, {
        type: "CAPTURE_SPIRIT",
        wordId: "happy",
      });
      expect(result.spirits["happy"].stage).toBe(3); // unchanged
    });
  });

  describe("REVIEW_ANSWER", () => {
    it("correct answer advances spirit stage", () => {
      const state: GameState = {
        ...initialGameState,
        spirits: { happy: makeSpirit({ stage: 1 }) },
      };
      const result = gameReducer(state, {
        type: "REVIEW_ANSWER",
        wordId: "happy",
        isCorrect: true,
      });

      expect(result.spirits["happy"].stage).toBe(2);
      expect(result.spirits["happy"].consecutiveCorrect).toBe(1);
    });

    it("wrong answer drops spirit stage", () => {
      const state: GameState = {
        ...initialGameState,
        spirits: { happy: makeSpirit({ stage: 3, consecutiveCorrect: 2 }) },
      };
      const result = gameReducer(state, {
        type: "REVIEW_ANSWER",
        wordId: "happy",
        isCorrect: false,
      });

      expect(result.spirits["happy"].stage).toBe(2);
      expect(result.spirits["happy"].consecutiveCorrect).toBe(0);
    });

    it("increments reviewsDone", () => {
      const state: GameState = {
        ...initialGameState,
        spirits: { happy: makeSpirit() },
      };
      const result = gameReducer(state, {
        type: "REVIEW_ANSWER",
        wordId: "happy",
        isCorrect: true,
      });

      expect(result.dailySession.reviewsDone).toBe(1);
    });

    it("adds xp on correct answer", () => {
      const state: GameState = {
        ...initialGameState,
        spirits: { happy: makeSpirit({ stage: 2 }) },
      };
      const result = gameReducer(state, {
        type: "REVIEW_ANSWER",
        wordId: "happy",
        isCorrect: true,
      });

      expect(result.totalXp).toBeGreaterThan(0);
    });

    it("does not add xp on wrong answer", () => {
      const state: GameState = {
        ...initialGameState,
        spirits: { happy: makeSpirit({ stage: 2 }) },
      };
      const result = gameReducer(state, {
        type: "REVIEW_ANSWER",
        wordId: "happy",
        isCorrect: false,
      });

      expect(result.totalXp).toBe(0);
    });

    it("does not mutate original spirits", () => {
      const original = makeSpirit({ stage: 1 });
      const state: GameState = {
        ...initialGameState,
        spirits: { happy: original },
      };
      gameReducer(state, {
        type: "REVIEW_ANSWER",
        wordId: "happy",
        isCorrect: true,
      });

      expect(original.stage).toBe(1);
    });

    it("ignores unknown wordId", () => {
      const result = gameReducer(initialGameState, {
        type: "REVIEW_ANSWER",
        wordId: "unknown",
        isCorrect: true,
      });
      expect(result).toBe(initialGameState);
    });
  });

  describe("ENCOUNTER_WORD", () => {
    it("adds wordId to wordsEncountered", () => {
      const result = gameReducer(initialGameState, {
        type: "ENCOUNTER_WORD",
        wordId: "happy",
      });

      expect(result.wordsEncountered).toContain("happy");
      expect(result.dailySession.newWordsEncountered).toBe(1);
    });

    it("does not add duplicate wordId", () => {
      const state: GameState = {
        ...initialGameState,
        wordsEncountered: ["happy"],
      };
      const result = gameReducer(state, {
        type: "ENCOUNTER_WORD",
        wordId: "happy",
      });

      expect(result.wordsEncountered).toEqual(["happy"]);
    });

    it("does not mutate original array", () => {
      const original = ["sad"];
      const state: GameState = {
        ...initialGameState,
        wordsEncountered: original,
      };
      const result = gameReducer(state, {
        type: "ENCOUNTER_WORD",
        wordId: "happy",
      });

      expect(original).toEqual(["sad"]);
      expect(result.wordsEncountered).not.toBe(original);
    });
  });

  describe("DISMISS_WELCOME", () => {
    it("sets hasSeenWelcome to true", () => {
      const result = gameReducer(initialGameState, { type: "DISMISS_WELCOME" });
      expect(result.hasSeenWelcome).toBe(true);
    });
  });

  describe("TOGGLE_HAPTIC", () => {
    it("toggles haptic setting", () => {
      const result = gameReducer(initialGameState, { type: "TOGGLE_HAPTIC" });
      expect(result.settings.hapticEnabled).toBe(false);

      const result2 = gameReducer(result, { type: "TOGGLE_HAPTIC" });
      expect(result2.settings.hapticEnabled).toBe(true);
    });

    it("returns new settings object (immutable)", () => {
      const result = gameReducer(initialGameState, { type: "TOGGLE_HAPTIC" });
      expect(result.settings).not.toBe(initialGameState.settings);
    });
  });

  describe("TOGGLE_SOUND", () => {
    it("toggles sound setting", () => {
      const result = gameReducer(initialGameState, { type: "TOGGLE_SOUND" });
      expect(result.settings.soundEnabled).toBe(false);

      const result2 = gameReducer(result, { type: "TOGGLE_SOUND" });
      expect(result2.settings.soundEnabled).toBe(true);
    });
  });

  describe("GACHA_PULL", () => {
    it("captures a new spirit and increments pityCounter for low rarity", () => {
      const result = gameReducer(initialGameState, {
        type: "GACHA_PULL",
        wordId: "happy",
        rarity: 1,
      });
      expect(result.spirits["happy"]).toBeDefined();
      expect(result.spirits["happy"].stage).toBe(1);
      expect(result.gacha.pityCounter).toBe(1);
    });

    it("resets pityCounter when rarity >= 3", () => {
      const state: GameState = {
        ...initialGameState,
        gacha: { pityCounter: 8, freeRemainingToday: 1 },
      };
      const result = gameReducer(state, {
        type: "GACHA_PULL",
        wordId: "happy",
        rarity: 3,
      });
      expect(result.gacha.pityCounter).toBe(0);
    });

    it("increments pityCounter for duplicate pull (already captured)", () => {
      const state: GameState = {
        ...initialGameState,
        spirits: { happy: makeSpirit() },
      };
      const result = gameReducer(state, {
        type: "GACHA_PULL",
        wordId: "happy",
        rarity: 1,
      });
      // Duplicate — spirit unchanged, pity still increments
      expect(result.gacha.pityCounter).toBe(1);
    });

    it("decrements freeRemainingToday when > 0", () => {
      const result = gameReducer(initialGameState, {
        type: "GACHA_PULL",
        wordId: "happy",
        rarity: 1,
      });
      expect(result.gacha.freeRemainingToday).toBe(0);
    });

    it("does not go below 0 for freeRemainingToday", () => {
      const state: GameState = {
        ...initialGameState,
        gacha: { pityCounter: 0, freeRemainingToday: 0 },
      };
      const result = gameReducer(state, {
        type: "GACHA_PULL",
        wordId: "happy",
        rarity: 1,
      });
      expect(result.gacha.freeRemainingToday).toBe(0);
    });
  });

  describe("COMPLETE_SESSION", () => {
    it("sets dailyReviewCompleted to true", () => {
      const result = gameReducer(initialGameState, {
        type: "COMPLETE_SESSION",
      });
      expect(result.sessionFlags.dailyReviewCompleted).toBe(true);
    });
  });

  describe("CLAIM_REVIEW_REWARD", () => {
    it("sets dailyReviewRewardClaimed to true", () => {
      const result = gameReducer(initialGameState, {
        type: "CLAIM_REVIEW_REWARD",
      });
      expect(result.sessionFlags.dailyReviewRewardClaimed).toBe(true);
    });
  });

  describe("BATTLE_ANSWER", () => {
    it("grants XP on correct answer", () => {
      const result = gameReducer(initialGameState, {
        type: "BATTLE_ANSWER",
        areaId: 1,
        questionIndex: 0,
        isCorrect: true,
      });
      expect(result.totalXp).toBe(5);
      expect(result.level).toBe(1);
    });

    it("grants no XP on wrong answer", () => {
      const result = gameReducer(initialGameState, {
        type: "BATTLE_ANSWER",
        areaId: 1,
        questionIndex: 0,
        isCorrect: false,
      });
      expect(result.totalXp).toBe(0);
    });
  });

  describe("DEFEAT_BOSS", () => {
    it("adds areaId to defeatedAreas and grants XP", () => {
      const result = gameReducer(initialGameState, {
        type: "DEFEAT_BOSS",
        areaId: 1,
      });
      expect(result.progress.defeatedAreas).toContain(1);
      expect(result.totalXp).toBe(50);
    });

    it("does not duplicate defeatedAreas", () => {
      const state: GameState = {
        ...initialGameState,
        progress: { unlockedAreas: [1], defeatedAreas: [1] },
      };
      const result = gameReducer(state, {
        type: "DEFEAT_BOSS",
        areaId: 1,
      });
      expect(result.progress.defeatedAreas).toEqual([1]);
    });
  });

  describe("UNLOCK_AREA", () => {
    it("adds areaId to unlockedAreas", () => {
      const result = gameReducer(initialGameState, {
        type: "UNLOCK_AREA",
        areaId: 2,
      });
      expect(result.progress.unlockedAreas).toContain(2);
    });

    it("does not duplicate unlockedAreas", () => {
      const result = gameReducer(initialGameState, {
        type: "UNLOCK_AREA",
        areaId: 1,
      });
      // 1 is already in initial state
      expect(result.progress.unlockedAreas).toEqual([1]);
    });
  });

  describe("initialGameState Phase 2 fields", () => {
    it("has progress with unlockedAreas and defeatedAreas", () => {
      expect(initialGameState.progress).toEqual({
        unlockedAreas: [1],
        defeatedAreas: [],
      });
    });

    it("has soundEnabled in settings", () => {
      expect(initialGameState.settings.soundEnabled).toBe(true);
    });

    it("has freeRemainingToday in gacha", () => {
      expect(initialGameState.gacha.freeRemainingToday).toBe(1);
    });
  });

  describe("RESET_DAILY_SESSION", () => {
    it("resets freeRemainingToday to 1", () => {
      const state: GameState = {
        ...initialGameState,
        gacha: { pityCounter: 3, freeRemainingToday: 0 },
      };
      const result = gameReducer(state, {
        type: "RESET_DAILY_SESSION",
        date: "2026-03-26",
      });
      expect(result.gacha.freeRemainingToday).toBe(1);
    });
  });
});
