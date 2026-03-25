import {
  saveState,
  loadState,
  migrateState,
  CURRENT_VERSION,
} from "@/store/persistence";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { INITIAL_GAME_STATE } from "@/store/gameReducer";
import { STORAGE_KEY } from "@/utils/constants";
import type { GameState, PersistedState } from "@/store/types";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("persistence", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("CURRENT_VERSION", () => {
    it("equals 4", () => {
      expect(CURRENT_VERSION).toBe(4);
    });
  });

  describe("saveState", () => {
    it("saves state with version to AsyncStorage", async () => {
      await saveState(INITIAL_GAME_STATE);

      expect(mockAsyncStorage.setItem).toHaveBeenCalledTimes(1);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String),
      );

      const savedJson = (mockAsyncStorage.setItem as jest.Mock).mock
        .calls[0][1];
      const parsed: PersistedState = JSON.parse(savedJson);
      expect(parsed.version).toBe(CURRENT_VERSION);
      expect(parsed.gameState).toEqual(INITIAL_GAME_STATE);
    });
  });

  describe("loadState", () => {
    it("returns null when no saved state", async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);
      const result = await loadState();
      expect(result).toBeNull();
    });

    it("returns GameState when valid data exists", async () => {
      const persisted: PersistedState = {
        version: CURRENT_VERSION,
        gameState: { ...INITIAL_GAME_STATE, totalXp: 42 },
      };
      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(persisted));

      const result = await loadState();
      expect(result).not.toBeNull();
      expect(result!.totalXp).toBe(42);
    });

    it("returns null on invalid JSON", async () => {
      mockAsyncStorage.getItem.mockResolvedValue("not-json!!!");
      const result = await loadState();
      expect(result).toBeNull();
    });
  });

  describe("migrateState", () => {
    it("returns gameState as-is for current version", () => {
      const persisted: PersistedState = {
        version: CURRENT_VERSION,
        gameState: { ...INITIAL_GAME_STATE, totalXp: 100 },
      };
      const result = migrateState(persisted);
      expect(result.totalXp).toBe(100);
    });

    it("returns initial state for unknown/future versions gracefully", () => {
      const persisted: PersistedState = {
        version: 999,
        gameState: { ...INITIAL_GAME_STATE, totalXp: 100 },
      };
      const result = migrateState(persisted);
      expect(result).toBeDefined();
    });

    it("migrates v2 → v3: adds progress and soundEnabled", () => {
      // Simulate a v2 state missing progress and soundEnabled
      const v2State = { ...INITIAL_GAME_STATE } as unknown as Record<
        string,
        unknown
      >;
      delete v2State.progress;
      const v2Settings = { hapticEnabled: true };
      v2State.settings = v2Settings;

      const persisted: PersistedState = {
        version: 2,
        gameState: v2State as unknown as GameState,
      };
      const result = migrateState(persisted);

      expect(result.progress).toEqual({
        unlockedAreas: [1],
        defeatedAreas: [],
      });
      expect(result.settings.soundEnabled).toBe(true);
    });

    it("preserves existing data during v2 → v3 migration", () => {
      const v2State = { ...INITIAL_GAME_STATE, totalXp: 500 } as Record<
        string,
        unknown
      >;
      delete v2State.progress;
      const v2Settings = { hapticEnabled: false };
      v2State.settings = v2Settings;

      const persisted: PersistedState = {
        version: 2,
        gameState: v2State as unknown as GameState,
      };
      const result = migrateState(persisted);

      expect(result.totalXp).toBe(500);
      expect(result.settings.hapticEnabled).toBe(false);
      expect(result.settings.soundEnabled).toBe(true);
    });

    it("migrates v3 → v4: adds gacha.freeRemainingToday", () => {
      const v3State = {
        ...INITIAL_GAME_STATE,
        gacha: { pityCounter: 5 },
      } as unknown as Record<string, unknown>;
      (v3State as Record<string, unknown>).gacha = { pityCounter: 5 };

      const persisted: PersistedState = {
        version: 3,
        gameState: v3State as unknown as GameState,
      };
      const result = migrateState(persisted);

      expect(result.gacha.freeRemainingToday).toBe(1);
      expect(result.gacha.pityCounter).toBe(5);
    });
  });
});
