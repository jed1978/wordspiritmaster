import React from "react";
import { create, act, type ReactTestRenderer } from "react-test-renderer";
import { RevealAnimation } from "../RevealAnimation";
import type { WordEntry } from "@/store/types";

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (init: number) => ({ value: init }),
    useAnimatedStyle: () => ({}),
    withTiming: jest.fn(),
    withRepeat: jest.fn(),
    withSequence: jest.fn(),
    withSpring: jest.fn(),
  };
});

// Mock SpiritImage to avoid deep Reanimated dependency
jest.mock("@/components/spirits/SpiritImage", () => ({
  SpiritImage: () => {
    const { Text } = jest.requireActual("react-native");
    return <Text>spirit-mock</Text>;
  },
}));

const mockWord: WordEntry = {
  id: "happy",
  word: "happy",
  pos: "adj",
  posCategory: "adj",
  meaning: "快樂的",
  type: "aqua",
  pack: 1,
  confusers: ["悲傷的", "飢餓的", "重要的"],
};

const mockResult = {
  wordId: "happy",
  rarity: 3,
  isNew: true,
};

describe("RevealAnimation", () => {
  it("renders without crashing", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <RevealAnimation result={mockResult} word={mockWord} />,
      );
    });
    expect(renderer).toBeDefined();
  });

  it("displays the word and meaning", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <RevealAnimation result={mockResult} word={mockWord} />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("happy");
    expect(text).toContain("快樂的");
  });

  it("displays rarity stars", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <RevealAnimation result={mockResult} word={mockWord} />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("★★★");
  });

  it("shows new partner label when isNew is true", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <RevealAnimation result={mockResult} word={mockWord} />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("新夥伴");
  });

  it("shows duplicate label when isNew is false", () => {
    const dupeResult = { ...mockResult, isNew: false };
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <RevealAnimation result={dupeResult} word={mockWord} />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("覺醒石");
  });
});
