import { generateQuestion, shuffleArray } from "@/core/questionGenerator";
import type { WordEntry, SpiritStage } from "@/store/types";

const testWords: WordEntry[] = [
  {
    id: "happy",
    word: "happy",
    pos: "adj",
    posCategory: "adj",
    meaning: "快樂的",
    type: "aqua",
    pack: 1,
    confusers: ["悲傷的", "生氣的", "疲倦的"],
  },
  {
    id: "sad",
    word: "sad",
    pos: "adj",
    posCategory: "adj",
    meaning: "悲傷的",
    type: "aqua",
    pack: 1,
    confusers: ["快樂的", "興奮的", "無聊的"],
  },
  {
    id: "angry",
    word: "angry",
    pos: "adj",
    posCategory: "adj",
    meaning: "生氣的",
    type: "flame",
    pack: 1,
    confusers: ["快樂的", "悲傷的", "害怕的"],
  },
  {
    id: "tired",
    word: "tired",
    pos: "adj",
    posCategory: "adj",
    meaning: "疲倦的",
    type: "moon",
    pack: 1,
    confusers: ["精神的", "快樂的", "生氣的"],
  },
  {
    id: "run",
    word: "run",
    pos: "v",
    posCategory: "verb",
    meaning: "跑",
    type: "flame",
    pack: 1,
    confusers: ["走", "跳", "游泳"],
  },
  {
    id: "jump",
    word: "jump",
    pos: "v",
    posCategory: "verb",
    meaning: "跳",
    type: "flame",
    pack: 1,
    confusers: ["跑", "走", "飛"],
  },
  {
    id: "eat",
    word: "eat",
    pos: "v",
    posCategory: "verb",
    meaning: "吃",
    type: "nature",
    pack: 1,
    confusers: ["喝", "煮", "切"],
  },
  {
    id: "walk",
    word: "walk",
    pos: "v",
    posCategory: "verb",
    meaning: "走",
    type: "nature",
    pack: 1,
    confusers: ["跑", "跳", "站"],
  },
  {
    id: "dog",
    word: "dog",
    pos: "n",
    posCategory: "noun",
    meaning: "狗",
    type: "nature",
    pack: 1,
    confusers: ["貓", "鳥", "魚"],
  },
  {
    id: "cat",
    word: "cat",
    pos: "n",
    posCategory: "noun",
    meaning: "貓",
    type: "nature",
    pack: 1,
    confusers: ["狗", "鳥", "兔子"],
  },
  {
    id: "bird",
    word: "bird",
    pos: "n",
    posCategory: "noun",
    meaning: "鳥",
    type: "nature",
    pack: 2,
    confusers: ["狗", "魚", "蟲"],
  },
  {
    id: "fish",
    word: "fish",
    pos: "n",
    posCategory: "noun",
    meaning: "魚",
    type: "aqua",
    pack: 2,
    confusers: ["鳥", "蝦", "貝"],
  },
  {
    id: "big",
    word: "big",
    pos: "adj",
    posCategory: "adj",
    meaning: "大的",
    type: "crystal",
    pack: 2,
    confusers: ["小的", "高的", "矮的"],
  },
  {
    id: "small",
    word: "small",
    pos: "adj",
    posCategory: "adj",
    meaning: "小的",
    type: "crystal",
    pack: 2,
    confusers: ["大的", "長的", "短的"],
  },
  {
    id: "book",
    word: "book",
    pos: "n",
    posCategory: "noun",
    meaning: "書",
    type: "metal",
    pack: 2,
    confusers: ["筆", "紙", "桌子"],
  },
  {
    id: "pen",
    word: "pen",
    pos: "n",
    posCategory: "noun",
    meaning: "筆",
    type: "metal",
    pack: 2,
    confusers: ["書", "尺", "橡皮擦"],
  },
  {
    id: "fast",
    word: "fast",
    pos: "adj",
    posCategory: "adj",
    meaning: "快的",
    type: "crystal",
    pack: 2,
    confusers: ["慢的", "強的", "弱的"],
  },
  {
    id: "slow",
    word: "slow",
    pos: "adj",
    posCategory: "adj",
    meaning: "慢的",
    type: "crystal",
    pack: 2,
    confusers: ["快的", "重的", "輕的"],
  },
  {
    id: "swim",
    word: "swim",
    pos: "v",
    posCategory: "verb",
    meaning: "游泳",
    type: "aqua",
    pack: 2,
    confusers: ["跑", "走", "飛"],
  },
  {
    id: "fly",
    word: "fly",
    pos: "v",
    posCategory: "verb",
    meaning: "飛",
    type: "star",
    pack: 2,
    confusers: ["跑", "游泳", "爬"],
  },
];

describe("generateQuestion", () => {
  describe("stage 1 (selectChinese)", () => {
    it("prompt is English word, 4 Chinese options, correct answer present", () => {
      const word = testWords[0]; // happy
      const q = generateQuestion(word, testWords, 1);

      expect(q.type).toBe("selectChinese");
      expect(q.prompt).toBe("happy");
      expect(q.options).toHaveLength(4);
      expect(q.options[q.correctIndex]).toBe("快樂的");
    });

    it("confusers appear in options", () => {
      const word = testWords[0]; // happy
      const q = generateQuestion(word, testWords, 1);
      const wrongOptions = q.options.filter((_, i) => i !== q.correctIndex);
      // All wrong options should be from confusers
      for (const opt of wrongOptions) {
        expect(word.confusers).toContain(opt);
      }
    });

    it("sets wordId, spiritType, posCategory, stage", () => {
      const word = testWords[0];
      const q = generateQuestion(word, testWords, 1);

      expect(q.wordId).toBe("happy");
      expect(q.spiritType).toBe("aqua");
      expect(q.posCategory).toBe("adj");
      expect(q.stage).toBe(1);
    });
  });

  describe("stage 3 (spellWord)", () => {
    it("type is spellWord, prompt is Chinese meaning", () => {
      const word = testWords[0]; // happy
      const q = generateQuestion(word, testWords, 3);

      expect(q.type).toBe("spellWord");
      expect(q.prompt).toBe("快樂的");
    });

    it("options are shuffled letters of the word", () => {
      const word = testWords[0]; // happy
      const q = generateQuestion(word, testWords, 3);

      const sortedOptions = [...q.options].sort();
      const sortedLetters = [...word.word].sort();
      expect(sortedOptions).toEqual(sortedLetters);
    });

    it("correctAnswer is the original word", () => {
      const word = testWords[0]; // happy
      const q = generateQuestion(word, testWords, 3);

      expect(q.correctAnswer).toBe("happy");
    });

    it("correctIndex is -1 for spell type", () => {
      const word = testWords[0];
      const q = generateQuestion(word, testWords, 3);

      expect(q.correctIndex).toBe(-1);
    });

    it("works with short words", () => {
      const word = testWords[4]; // run
      const q = generateQuestion(word, testWords, 3);

      expect(q.options).toHaveLength(3);
      expect(q.correctAnswer).toBe("run");
    });
  });

  describe("stage 2 (selectEnglish)", () => {
    it("prompt is Chinese meaning, 4 English options, correct answer present", () => {
      const word = testWords[0]; // happy
      const q = generateQuestion(word, testWords, 2);

      expect(q.type).toBe("selectEnglish");
      expect(q.prompt).toBe("快樂的");
      expect(q.options).toHaveLength(4);
      expect(q.options[q.correctIndex]).toBe("happy");
    });

    it("distractors are same POS English words", () => {
      const word = testWords[4]; // run (verb)
      const q = generateQuestion(word, testWords, 2);

      const wrongOptions = q.options.filter((_, i) => i !== q.correctIndex);
      const verbWords = testWords
        .filter((w) => w.pos === "v" && w.id !== "run")
        .map((w) => w.word);

      for (const opt of wrongOptions) {
        expect(verbWords).toContain(opt);
      }
    });
  });
});

describe("shuffleArray", () => {
  it("returns array of same length with same elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleArray(arr);

    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("does not mutate original array", () => {
    const arr = [1, 2, 3, 4, 5];
    const copy = [...arr];
    shuffleArray(arr);

    expect(arr).toEqual(copy);
  });

  it("produces different orderings over multiple calls", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set<string>();
    for (let i = 0; i < 20; i++) {
      results.add(JSON.stringify(shuffleArray(arr)));
    }
    // With 10 elements, probability of all 20 being identical is negligible
    expect(results.size).toBeGreaterThan(1);
  });
});
