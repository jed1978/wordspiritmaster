import React from "react";
import { create, act, type ReactTestRenderer } from "react-test-renderer";
import { PassageView } from "../PassageView";
import type { WordEntry } from "@/store/types";

jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (init: number) => ({ value: init }),
    useAnimatedStyle: () => ({}),
    withTiming: jest.fn(),
  };
});

const mockWords: WordEntry[] = [
  {
    id: "school",
    word: "school",
    pos: "n",
    posCategory: "noun",
    meaning: "學校",
    type: "metal",
    pack: 1,
    confusers: ["公園", "商店", "醫院"],
    example: "I go to school every day.",
  },
  {
    id: "book",
    word: "book",
    pos: "n",
    posCategory: "noun",
    meaning: "書",
    type: "metal",
    pack: 1,
    confusers: ["筆", "桌子", "椅子"],
  },
];

const passage =
  "Tom goes to school every day. He likes to read books. His favorite subject is math.";

describe("PassageView", () => {
  it("renders full passage", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <PassageView
          passage={passage}
          capturedWordIds={[]}
          words={mockWords}
        />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("Tom");
    expect(text).toContain("school");
  });

  it("renders all sentences without hiding", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <PassageView
          passage={passage}
          capturedWordIds={[]}
          words={mockWords}
        />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("math");
    expect(text).not.toContain("???");
  });

  it("renders captured word with Chinese meaning annotation", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <PassageView
          passage={passage}
          capturedWordIds={["school"]}
          words={mockWords}
        />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("學校");
  });

  it("renders without crashing with empty capturedWordIds", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <PassageView
          passage={passage}
          capturedWordIds={[]}
          words={[]}
        />,
      );
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });
});
