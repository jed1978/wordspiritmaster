import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameState, PersistedState } from '@/store/types';
import { STORAGE_KEY } from '@/utils/constants';

export const CURRENT_VERSION = 1;

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
  // Version 1 is current — no migrations needed yet.
  // Future migrations: if (persisted.version < 2) { ... }
  return persisted.gameState;
}
