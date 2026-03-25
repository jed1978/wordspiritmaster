import React from "react";
import { create, act, type ReactTestRenderer } from "react-test-renderer";
import { BossScene } from "../BossScene";
import type { ReadingPassage } from "@/store/types";

jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (init: number) => ({ value: init }),
    useAnimatedStyle: () => ({}),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
    FadeIn: { duration: () => ({}) },
  };
});

const mockBoss: ReadingPassage["boss"] = {
  name: "書蟲先生",
  emoji: "📖",
  personality: "傲慢",
  openingLine: "你以為你看得懂我嗎？",
  defeatLine: "不可能！",
};

describe("BossScene", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders intro phase with boss emoji and name", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BossScene boss={mockBoss} hpPercent={100} phase="intro" />,
      );
    });
    const json = renderer!.toJSON();
    expect(json).toBeTruthy();
    const text = JSON.stringify(json);
    expect(text).toContain("📖");
    expect(text).toContain("書蟲先生");
    act(() => {
      renderer!.unmount();
    });
  });

  it("renders battle phase with HP info", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BossScene boss={mockBoss} hpPercent={75} phase="battle" />,
      );
    });
    // Flush typewriter timers
    act(() => {
      jest.advanceTimersByTime(mockBoss.openingLine.length * 60 + 100);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("📖");
    expect(text).toContain("HP");
    act(() => {
      renderer!.unmount();
    });
  });

  it("renders defeated phase with defeat line", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BossScene boss={mockBoss} hpPercent={0} phase="defeated" />,
      );
    });
    act(() => {
      jest.advanceTimersByTime(mockBoss.openingLine.length * 60 + 100);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("不可能！");
    act(() => {
      renderer!.unmount();
    });
  });

  it("calls onIntroComplete when typewriter finishes", () => {
    const onComplete = jest.fn();
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(
        <BossScene
          boss={mockBoss}
          hpPercent={100}
          phase="intro"
          onIntroComplete={onComplete}
        />,
      );
    });
    act(() => {
      jest.advanceTimersByTime(mockBoss.openingLine.length * 60 + 100);
    });
    expect(onComplete).toHaveBeenCalled();
    act(() => {
      renderer!.unmount();
    });
  });
});
