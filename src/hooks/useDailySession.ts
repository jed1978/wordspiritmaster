import { useEffect, useMemo } from 'react';
import { useGame } from '@/store/GameContext';

function getTodayDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export interface DailySessionInfo {
  readonly session: {
    readonly date: string;
    readonly reviewsDone: number;
    readonly capturesDone: number;
    readonly newWordsEncountered: number;
  };
  readonly isNewDay: boolean;
}

export function useDailySession(): DailySessionInfo {
  const { state, dispatch } = useGame();
  const today = getTodayDate();
  const isNewDay = state.dailySession.date !== today;

  useEffect(() => {
    if (isNewDay) {
      dispatch({ type: 'RESET_DAILY_SESSION', date: today });
      dispatch({ type: 'UPDATE_STREAK', date: today });
    }
  }, [isNewDay, today, dispatch]);

  return useMemo(
    () => ({ session: state.dailySession, isNewDay }),
    [state.dailySession, isNewDay],
  );
}
