import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from 'react';
import { AppState as RNAppState } from 'react-native';
import type { GameState, GameAction } from '@/store/types';
import { gameReducer, INITIAL_GAME_STATE } from '@/store/gameReducer';
import { loadState, saveState } from '@/store/persistence';
import { PERSIST_DEBOUNCE_MS } from '@/utils/constants';

interface GameContextValue {
  readonly state: GameState;
  readonly dispatch: React.Dispatch<GameAction>;
  readonly isLoaded: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within GameProvider');
  }
  return ctx;
}

export function useGameDispatch(): React.Dispatch<GameAction> {
  return useGame().dispatch;
}

export function GameProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const stateRef = useRef(state);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  stateRef.current = state;

  // Load state on mount
  useEffect(() => {
    loadState()
      .then((saved) => {
        if (saved) {
          dispatch({ type: 'LOAD_STATE', state: saved });
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  // Debounced save on state change
  useEffect(() => {
    if (!isLoaded) return;

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(() => {
      saveState(stateRef.current);
    }, PERSIST_DEBOUNCE_MS);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [state, isLoaded]);

  // Immediate save when app goes to background
  useEffect(() => {
    const subscription = RNAppState.addEventListener('change', (nextState) => {
      if (nextState !== 'active' && isLoaded) {
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveState(stateRef.current);
      }
    });
    return () => subscription.remove();
  }, [isLoaded]);

  const value = React.useMemo(
    () => ({ state, dispatch, isLoaded }),
    [state, isLoaded],
  );

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
