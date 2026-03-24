import { useMemo } from "react";
import { useGame } from "@/store/GameContext";
import { getDueSpirits } from "@/core/srs";

export interface ReviewQueue {
  readonly dueWordIds: readonly string[];
  readonly dueCount: number;
}

export function useReviewQueue(): ReviewQueue {
  const { state } = useGame();

  return useMemo(() => {
    const dueWordIds = getDueSpirits(state.spirits, Date.now());
    return { dueWordIds, dueCount: dueWordIds.length };
  }, [state.spirits]);
}
