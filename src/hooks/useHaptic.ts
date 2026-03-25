import { useCallback } from "react";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { useGame } from "@/store/GameContext";

function useHapticCallback(fn: () => Promise<void>): () => void {
  const { state } = useGame();
  return useCallback(() => {
    // expo-haptics logs console.error on web — skip entirely on non-native
    if (Platform.OS === "web") return;
    if (state.settings.hapticEnabled) {
      fn().catch(() => {});
    }
  }, [state.settings.hapticEnabled, fn]);
}

export function useLightHaptic(): () => void {
  return useHapticCallback(
    useCallback(
      () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
      [],
    ),
  );
}

export function useWarningHaptic(): () => void {
  return useHapticCallback(
    useCallback(
      () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
      [],
    ),
  );
}

export function useMediumHaptic(): () => void {
  return useHapticCallback(
    useCallback(
      () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
      [],
    ),
  );
}

export function useHeavyHaptic(): () => void {
  return useHapticCallback(
    useCallback(
      () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
      [],
    ),
  );
}
