import {
  calculateXp,
  getLevel,
  getXpForNextLevel,
  getTitle,
  getStreakBonus,
} from "@/core/progression";
import {
  XP_PER_CAPTURE,
  XP_PER_REVIEW_CORRECT,
  XP_LEVEL_BASE,
  XP_LEVEL_MULTIPLIER,
} from "@/utils/constants";
import type { SpiritStage } from "@/store/types";

describe("calculateXp", () => {
  it("correct answer at stage 1 → 5 * 1 = 5", () => {
    expect(calculateXp(true, 1)).toBe(XP_PER_REVIEW_CORRECT * 1);
  });

  it("correct answer at stage 3 → 5 * 3 = 15", () => {
    expect(calculateXp(true, 3)).toBe(XP_PER_REVIEW_CORRECT * 3);
  });

  it("wrong answer → 0 xp regardless of stage", () => {
    expect(calculateXp(false, 1)).toBe(0);
    expect(calculateXp(false, 5)).toBe(0);
  });
});

describe("XP_PER_CAPTURE", () => {
  it("equals 10", () => {
    expect(XP_PER_CAPTURE).toBe(10);
  });
});

describe("getLevel", () => {
  it("0 xp → level 1", () => {
    expect(getLevel(0)).toBe(1);
  });

  it("99 xp → level 1 (not yet 100)", () => {
    expect(getLevel(99)).toBe(1);
  });

  it("100 xp → level 2", () => {
    expect(getLevel(XP_LEVEL_BASE)).toBe(2);
  });

  it("250 xp → level 3 (100 + 150 = 250)", () => {
    // Level 2 needs 100, level 3 needs 100*1.5=150 → total 250
    expect(getLevel(250)).toBe(3);
  });

  it("levels increase with xp", () => {
    expect(getLevel(1000)).toBeGreaterThan(getLevel(500));
  });
});

describe("getXpForNextLevel", () => {
  it("level 1 → 100 xp needed", () => {
    expect(getXpForNextLevel(1)).toBe(XP_LEVEL_BASE);
  });

  it("level 2 → 150 xp needed", () => {
    expect(getXpForNextLevel(2)).toBe(
      Math.floor(XP_LEVEL_BASE * XP_LEVEL_MULTIPLIER),
    );
  });

  it("xp requirement increases each level", () => {
    expect(getXpForNextLevel(3)).toBeGreaterThan(getXpForNextLevel(2));
  });
});

describe("getTitle", () => {
  it("level 1 → 精靈見習生", () => {
    expect(getTitle(1)).toBe("精靈見習生");
  });

  it("level 4 → 精靈見習生", () => {
    expect(getTitle(4)).toBe("精靈見習生");
  });

  it("level 5 → 捕獲師", () => {
    expect(getTitle(5)).toBe("捕獲師");
  });

  it("level 10 → 探索家", () => {
    expect(getTitle(10)).toBe("探索家");
  });

  it("level 20 → 精靈達人", () => {
    expect(getTitle(20)).toBe("精靈達人");
  });

  it("level 30 → 精靈大師", () => {
    expect(getTitle(30)).toBe("精靈大師");
  });

  it("level 50 → 精靈大師", () => {
    expect(getTitle(50)).toBe("精靈大師");
  });
});

describe("getStreakBonus", () => {
  it("streak 0 → 0 bonus pulls", () => {
    expect(getStreakBonus(0)).toBe(0);
  });

  it("streak 2 → 0 bonus pulls", () => {
    expect(getStreakBonus(2)).toBe(0);
  });

  it("streak 3 → 1 bonus pull", () => {
    expect(getStreakBonus(3)).toBe(1);
  });

  it("streak 7 → 2 bonus pulls", () => {
    expect(getStreakBonus(7)).toBe(2);
  });

  it("streak 14 → 3 bonus pulls", () => {
    expect(getStreakBonus(14)).toBe(3);
  });

  it("streak 30 → 5 bonus pulls", () => {
    expect(getStreakBonus(30)).toBe(5);
  });

  it("streak 100 → 5 bonus pulls (capped)", () => {
    expect(getStreakBonus(100)).toBe(5);
  });
});
