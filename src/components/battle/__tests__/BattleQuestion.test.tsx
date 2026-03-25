import React from "react";
import { create, act, type ReactTestRenderer } from "react-test-renderer";
import { BattleQuestion } from "../BattleQuestion";
import type { ReadingQuestion } from "@/store/types";

jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (c: unknown) => c },
    useSharedValue: (init: number) => ({ value: init }),
    useAnimatedStyle: () => ({}),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
    createAnimatedComponent: (c: unknown) => c,
  };
});

const mockQuestion: ReadingQuestion = {
  question: "Where does Tom go?",
  questionZh: "Tom 去哪裡？",
  options: [
    { text: "School", textZh: "學校" },
    { text: "Park", textZh: "公園" },
    { text: "Store", textZh: "商店" },
    { text: "Home", textZh: "家" },
  ],
  correctIndex: 0,
  explanation: "文章說 Tom goes to school。",
};

describe("BattleQuestion", () => {
  it("renders question text in both languages", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BattleQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
          showExplanation={false}
        />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("Where does Tom go?");
    expect(text).toContain("Tom 去哪裡？");
  });

  it("renders all 4 options", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BattleQuestion
          question={mockQuestion}
          onAnswer={jest.fn()}
          showExplanation={false}
        />,
      );
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("School");
    expect(text).toContain("Park");
    expect(text).toContain("Store");
    expect(text).toContain("Home");
  });

  it("calls onAnswer with true when correct option pressed", () => {
    const onAnswer = jest.fn();
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BattleQuestion
          question={mockQuestion}
          onAnswer={onAnswer}
          showExplanation={false}
        />,
      );
    });
    // Find the first option button (correct one at index 0)
    const root = renderer!.root;
    const buttons = root.findAllByProps({ label: "School  學校" });
    expect(buttons.length).toBeGreaterThan(0);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(onAnswer).toHaveBeenCalledWith(true);
  });

  it("calls onAnswer with false when wrong option pressed", () => {
    const onAnswer = jest.fn();
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BattleQuestion
          question={mockQuestion}
          onAnswer={onAnswer}
          showExplanation={false}
        />,
      );
    });
    const root = renderer!.root;
    const buttons = root.findAllByProps({ label: "Park  公園" });
    act(() => {
      buttons[0].props.onPress();
    });
    expect(onAnswer).toHaveBeenCalledWith(false);
  });

  it("shows explanation when showExplanation is true and answer is wrong", () => {
    const onAnswer = jest.fn();
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BattleQuestion
          question={mockQuestion}
          onAnswer={onAnswer}
          showExplanation={true}
        />,
      );
    });
    // Select wrong answer to trigger explanation
    const root = renderer!.root;
    const buttons = root.findAllByProps({ label: "Park  公園" });
    act(() => {
      buttons[0].props.onPress();
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("文章說 Tom goes to school");
  });
});
