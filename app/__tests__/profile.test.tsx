import React from "react";
import { create, act, type ReactTestRenderer } from "react-test-renderer";
import ProfileScreen from "../(tabs)/profile";

jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (init: number) => ({ value: init }),
    useAnimatedStyle: () => ({}),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
  };
});

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const mockState = {
  spirits: {},
  currentPack: 1,
  wordsEncountered: [],
  streak: 5,
  lastSessionDate: null,
  dailySession: { date: "", reviewsDone: 0, capturesDone: 0, newWordsEncountered: 0 },
  totalXp: 250,
  level: 2,
  hasSeenWelcome: true,
  settings: { hapticEnabled: true, soundEnabled: true },
  gacha: { pityCounter: 0 },
  sessionFlags: { dailyReviewCompleted: false, dailyReviewRewardClaimed: false },
  progress: { unlockedAreas: [1], defeatedAreas: [] },
};

jest.mock("@/store/GameContext", () => ({
  useGame: () => ({
    state: mockState,
    dispatch: jest.fn(),
    isLoaded: true,
  }),
  useGameDispatch: () => jest.fn(),
}));

describe("ProfileScreen", () => {
  it("renders without crashing", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<ProfileScreen />);
    });
    expect(renderer).toBeDefined();
  });

  it("displays level information", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<ProfileScreen />);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("Lv.");
    expect(text).toContain("等級");
  });

  it("displays streak count", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<ProfileScreen />);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("🔥");
    expect(text).toContain("5");
  });

  it("displays profile title", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<ProfileScreen />);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("我的精靈師");
  });
});
