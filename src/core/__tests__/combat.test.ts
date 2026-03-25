import { initBattle, processAnswer, getVisiblePassage, getBossHpPercent } from '../combat';
import type { ReadingPassage } from '@/store/types';

const mockPassage: ReadingPassage = {
  areaId: 1,
  boss: {
    name: '書蟲先生',
    emoji: '📖',
    personality: '傲慢',
    openingLine: '你以為你看得懂我嗎？哼！',
    defeatLine: '不...不可能！你居然讀懂了！',
  },
  passage: 'Tom goes to school every day. He likes to read books. His favorite subject is math. He also enjoys playing basketball after school.',
  questions: [
    {
      question: 'Where does Tom go every day?',
      questionZh: 'Tom 每天去哪裡？',
      options: [
        { text: 'School', textZh: '學校' },
        { text: 'Park', textZh: '公園' },
        { text: 'Store', textZh: '商店' },
        { text: 'Hospital', textZh: '醫院' },
      ],
      correctIndex: 0,
      explanation: '文章說 Tom goes to school every day，所以是學校。',
    },
    {
      question: 'What is Tom\'s favorite subject?',
      questionZh: 'Tom 最喜歡的科目是什麼？',
      options: [
        { text: 'English', textZh: '英文' },
        { text: 'Math', textZh: '數學' },
        { text: 'Science', textZh: '自然' },
        { text: 'Art', textZh: '美術' },
      ],
      correctIndex: 1,
      explanation: '文章說 His favorite subject is math，所以是數學。',
    },
    {
      question: 'What does Tom do after school?',
      questionZh: 'Tom 放學後做什麼？',
      options: [
        { text: 'Swimming', textZh: '游泳' },
        { text: 'Running', textZh: '跑步' },
        { text: 'Playing basketball', textZh: '打籃球' },
        { text: 'Singing', textZh: '唱歌' },
      ],
      correctIndex: 2,
      explanation: '文章說 He also enjoys playing basketball after school，所以是打籃球。',
    },
  ],
};

describe('combat', () => {
  describe('initBattle', () => {
    it('should return initial BattleState with correct defaults', () => {
      const battle = initBattle(mockPassage);

      expect(battle.areaId).toBe(1);
      expect(battle.passage).toBe(mockPassage);
      expect(battle.currentQuestionIndex).toBe(0);
      expect(battle.revealedSentences).toBe(1);
      expect(battle.totalQuestions).toBe(3);
      expect(battle.correctAnswers).toBe(0);
      expect(battle.isDefeated).toBe(false);
    });
  });

  describe('processAnswer', () => {
    it('should increment correctAnswers and revealedSentences on correct answer', () => {
      const battle = initBattle(mockPassage);
      const next = processAnswer(battle, true);

      expect(next.correctAnswers).toBe(1);
      expect(next.revealedSentences).toBe(2);
      expect(next.currentQuestionIndex).toBe(1);
    });

    it('should not increment revealedSentences on wrong answer', () => {
      const battle = initBattle(mockPassage);
      const next = processAnswer(battle, false);

      expect(next.correctAnswers).toBe(0);
      expect(next.revealedSentences).toBe(1);
      expect(next.currentQuestionIndex).toBe(1);
    });

    it('should not mutate original battle state', () => {
      const battle = initBattle(mockPassage);
      const original = { ...battle };
      processAnswer(battle, true);

      expect(battle.correctAnswers).toBe(original.correctAnswers);
      expect(battle.revealedSentences).toBe(original.revealedSentences);
      expect(battle.currentQuestionIndex).toBe(original.currentQuestionIndex);
    });

    it('should set isDefeated to true when majority correct on last question', () => {
      let battle = initBattle(mockPassage);
      // Answer 2 correct, 1 wrong → ceil(3/2) = 2, so defeated
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, false);

      expect(battle.isDefeated).toBe(true);
    });

    it('should set isDefeated to false when not enough correct on last question', () => {
      let battle = initBattle(mockPassage);
      // Answer 1 correct, 2 wrong → need 2, only got 1
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, false);
      battle = processAnswer(battle, false);

      expect(battle.isDefeated).toBe(false);
    });

    it('should not set isDefeated before all questions answered', () => {
      let battle = initBattle(mockPassage);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);

      expect(battle.isDefeated).toBe(false);
      expect(battle.currentQuestionIndex).toBe(2);
    });

    it('should handle all correct answers', () => {
      let battle = initBattle(mockPassage);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);

      expect(battle.isDefeated).toBe(true);
      expect(battle.correctAnswers).toBe(3);
      expect(battle.revealedSentences).toBe(4);
    });

    it('should handle all wrong answers', () => {
      let battle = initBattle(mockPassage);
      battle = processAnswer(battle, false);
      battle = processAnswer(battle, false);
      battle = processAnswer(battle, false);

      expect(battle.isDefeated).toBe(false);
      expect(battle.correctAnswers).toBe(0);
      expect(battle.revealedSentences).toBe(1);
    });
  });

  describe('getVisiblePassage', () => {
    const passage = 'First sentence. Second sentence. Third sentence. Fourth sentence.';

    it('should return only first sentence when revealedSentences is 1', () => {
      const result = getVisiblePassage(passage, 1);
      expect(result).toBe('First sentence.');
    });

    it('should return first two sentences when revealedSentences is 2', () => {
      const result = getVisiblePassage(passage, 2);
      expect(result).toBe('First sentence. Second sentence.');
    });

    it('should return full passage when revealedSentences >= total sentences', () => {
      const result = getVisiblePassage(passage, 10);
      expect(result).toBe(passage);
    });

    it('should return full passage when revealedSentences equals total', () => {
      const result = getVisiblePassage(passage, 4);
      expect(result).toBe(passage);
    });

    it('should handle single sentence passage', () => {
      const result = getVisiblePassage('Only one sentence.', 1);
      expect(result).toBe('Only one sentence.');
    });

    it('should handle passage without trailing period', () => {
      const result = getVisiblePassage('First sentence. Second part', 1);
      expect(result).toBe('First sentence.');
    });
  });

  describe('getBossHpPercent', () => {
    it('should return 100 when no correct answers', () => {
      const battle = initBattle(mockPassage);
      expect(getBossHpPercent(battle)).toBe(100);
    });

    it('should decrease by correct proportion per correct answer', () => {
      let battle = initBattle(mockPassage);
      battle = processAnswer(battle, true);

      // 1 correct out of 3 total → 100 - (100/3) ≈ 66.67
      const hp = getBossHpPercent(battle);
      expect(hp).toBeCloseTo(66.67, 0);
    });

    it('should return 0 when all answers correct', () => {
      let battle = initBattle(mockPassage);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);

      expect(getBossHpPercent(battle)).toBe(0);
    });

    it('should not decrease on wrong answers', () => {
      let battle = initBattle(mockPassage);
      battle = processAnswer(battle, false);

      expect(getBossHpPercent(battle)).toBe(100);
    });

    it('should never go below 0', () => {
      let battle = initBattle(mockPassage);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);
      battle = processAnswer(battle, true);

      expect(getBossHpPercent(battle)).toBeGreaterThanOrEqual(0);
    });
  });
});
