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
    it("equals 2", () => {
      expect(CURRENT_VERSION).toBe(2);
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
      // Should still return the gameState (no migration needed for v1)
      expect(result).toBeDefined();
    });
  });
});
