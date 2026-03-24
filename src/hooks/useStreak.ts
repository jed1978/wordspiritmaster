import { useGame } from '@/store/GameContext';

export function useStreak(): number {
  const { state } = useGame();
  return state.streak;
}
