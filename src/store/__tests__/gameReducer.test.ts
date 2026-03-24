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
});
