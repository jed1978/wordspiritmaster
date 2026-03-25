import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GameState, PersistedState } from "@/store/types";
import { STORAGE_KEY } from "@/utils/constants";
import { INITIAL_GAME_STATE } from "@/store/gameReducer";

export const CURRENT_VERSION = 4;

export async function saveState(state: GameState): Promise<void> {
  const persisted: PersistedState = {
    version: CURRENT_VERSION,
    gameState: state,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}

export async function loadState(): Promise<GameState | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const persisted: PersistedState = JSON.parse(raw);
    return migrateState(persisted);
  } catch {
    return null;
  }
}

export function migrateState(persisted: PersistedState): GameState {
  let state = persisted.gameState;

  if (persisted.version < 2) {
    state = {
      ...state,
      gacha: state.gacha ?? INITIAL_GAME_STATE.gacha,
      sessionFlags: state.sessionFlags ?? INITIAL_GAME_STATE.sessionFlags,
    };
  }

  if (persisted.version < 3) {
    state = {
      ...state,
      progress: state.progress ?? INITIAL_GAME_STATE.progress,
      settings: {
        ...state.settings,
        soundEnabled: state.settings.soundEnabled ?? true,
      },
    };
  }

  if (persisted.version < 4) {
    state = {
      ...state,
      gacha: {
        ...state.gacha,
        freeRemainingToday: state.gacha.freeRemainingToday ?? 1,
      },
    };
  }

  return state;
}
