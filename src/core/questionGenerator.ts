import type { WordEntry, SpiritStage, Question, QuestionType } from '@/store/types';

export function shuffleArray<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getQuestionType(stage: SpiritStage): QuestionType {
  if (stage <= 1) return 'selectChinese';
  return 'selectEnglish';
  // Stage 3+ types handled in Phase 2-3
}

function buildSelectChineseOptions(
  word: WordEntry,
): { options: string[]; correctIndex: number } {
  const wrong = shuffleArray(word.confusers).slice(0, 3);
  const all = [...wrong, word.meaning];
  const shuffled = shuffleArray(all);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(word.meaning),
  };
}

function buildSelectEnglishOptions(
  word: WordEntry,
  allWords: readonly WordEntry[],
): { options: string[]; correctIndex: number } {
  const samePosWords = allWords.filter(
    (w) => w.pos === word.pos && w.id !== word.id,
  );
  const distractors = shuffleArray(samePosWords)
    .slice(0, 3)
    .map((w) => w.word);

  // Pad if not enough same-POS words
  while (distractors.length < 3) {
    const fallback = allWords.find(
      (w) => w.id !== word.id && !distractors.includes(w.word),
    );
    if (fallback) {
      distractors.push(fallback.word);
    } else {
      break;
    }
  }

  const all = [...distractors, word.word];
  const shuffled = shuffleArray(all);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(word.word),
  };
}

export function generateQuestion(
  word: WordEntry,
  allWords: readonly WordEntry[],
  stage: SpiritStage,
): Question {
  const type = getQuestionType(stage);

  const { options, correctIndex } =
    type === 'selectChinese'
      ? buildSelectChineseOptions(word)
      : buildSelectEnglishOptions(word, allWords);

  return {
    type,
    wordId: word.id,
    prompt: type === 'selectChinese' ? word.word : word.meaning,
    options,
    correctIndex,
    spiritType: word.type,
    posCategory: word.posCategory,
    stage,
  };
}
