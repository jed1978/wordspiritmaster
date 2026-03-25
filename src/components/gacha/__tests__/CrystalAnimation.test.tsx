import React from "react";
import { create, act, type ReactTestRenderer } from "react-test-renderer";
import { CrystalAnimation } from "../CrystalAnimation";

// Mock react-native-reanimated before component import
jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (init: number) => ({ value: init }),
    useAnimatedStyle: () => ({}),
    withRepeat: jest.fn(),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
    Easing: { linear: undefined },
  };
});

describe("CrystalAnimation", () => {
  it("renders without crashing", () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<CrystalAnimation onPress={onPress} />);
    });
    expect(renderer).toBeDefined();
  });

  it("displays the crystal emoji", () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<CrystalAnimation onPress={onPress} />);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("💎");
  });

  it("displays the tap hint text", () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer | undefined;
    act(() => {
      renderer = create(<CrystalAnimation onPress={onPress} />);
    });
    const text = JSON.stringify(renderer!.toJSON());
    expect(text).toContain("點擊水晶召喚");
  });
});
