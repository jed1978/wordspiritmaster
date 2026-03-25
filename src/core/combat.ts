import type { ReadingPassage } from "@/store/types";

export interface BattleState {
  areaId: number;
  passage: ReadingPassage;
  currentQuestionIndex: number;
  revealedSentences: number;
  totalQuestions: number;
  correctAnswers: number;
  isDefeated: boolean;
}

export function initBattle(passage: ReadingPassage): BattleState {
  return {
    areaId: passage.areaId,
    passage,
    currentQuestionIndex: 0,
    revealedSentences: 1,
    totalQuestions: passage.questions.length,
    correctAnswers: 0,
    isDefeated: false,
  };
}

export function processAnswer(
  battle: BattleState,
  isCorrect: boolean,
): BattleState {
  const correctAnswers = isCorrect
    ? battle.correctAnswers + 1
    : battle.correctAnswers;
  const revealedSentences = isCorrect
    ? battle.revealedSentences + 1
    : battle.revealedSentences;
  const nextIndex = battle.currentQuestionIndex + 1;
  const isLastQuestion = nextIndex >= battle.totalQuestions;
  const isDefeated = isLastQuestion
    ? correctAnswers >= Math.ceil(battle.totalQuestions / 2)
    : false;

  return {
    ...battle,
    correctAnswers,
    revealedSentences,
    currentQuestionIndex: nextIndex,
    isDefeated,
  };
}

export function getVisiblePassage(
  passage: string,
  revealedSentences: number,
): string {
  // Split by '. ' keeping periods with each sentence
  const parts = passage.split(". ");
  const sentences = parts.map((part, i) =>
    i < parts.length - 1 ? part + "." : part,
  );

  if (revealedSentences >= sentences.length) return passage;

  return sentences.slice(0, revealedSentences).join(" ");
}

export function getBossHpPercent(battle: BattleState): number {
  const damage = (battle.correctAnswers / battle.totalQuestions) * 100;
  return Math.max(0, 100 - damage);
}
