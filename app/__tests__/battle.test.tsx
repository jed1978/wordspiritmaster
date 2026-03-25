import React from "react";
import { create, act, type ReactTestRenderer } from "react-test-renderer";
import BattleScreen from "../(tabs)/battle";

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

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const mockState = {
  spirits: {},
  currentPack: 1,
  wordsEncountered: [],
  streak: 0,
  lastSessionDate: null,
  dailySession: { date: "", reviewsDone: 0, capturesDone: 0, newWordsEncountered: 0 },
  totalXp: 0,
  level: 1,
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

describe("BattleScreen", () => {
  it("renders without crashing", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<BattleScreen />);
    });
    expect(renderer).toBeDefined();
  });

  it("displays the battle title", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<BattleScreen />);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("Boss 戰鬥");
  });

  it("displays boss names from passages", () => {
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<BattleScreen />);
    });
    const text = JSON.stringify(renderer!.toJSON());
    // area01 boss should be present
    expect(text).toContain("書蟲先生");
  });
});
