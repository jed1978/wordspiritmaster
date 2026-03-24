import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { COLORS } from "@/utils/colors";
import { ThemedText } from "@/components/ui/ThemedText";

interface ToastProps {
  readonly message: string;
  readonly visible: boolean;
  readonly onDismiss: () => void;
  readonly duration?: number;
}

export function Toast({
  message,
  visible,
  onDismiss,
  duration = 2000,
}: ToastProps): React.JSX.Element | null {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      opacity.value = withDelay(
        duration,
        withTiming(0, { duration: 200 }, () => {
          runOnJS(onDismiss)();
        }),
      );
    } else {
      opacity.value = 0;
    }
  }, [visible, duration, opacity, onDismiss]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ThemedText size="sm">{message}</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 24,
    right: 24,
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderButton,
  },
});
