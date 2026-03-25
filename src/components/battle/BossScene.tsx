import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type { ReadingPassage } from "@/store/types";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { ThemedText } from "@/components/ui/ThemedText";
import { ProgressBar } from "@/components/ui/ProgressBar";

type BossPhase = "intro" | "battle" | "defeated";

interface BossSceneProps {
  readonly boss: ReadingPassage["boss"];
  readonly hpPercent: number;
  readonly phase: BossPhase;
  readonly onIntroComplete?: () => void;
}

function useTypewriter(
  text: string,
  speed: number,
  onComplete?: () => void,
): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;
    const timer = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return displayed;
}

function getHpColor(hpPercent: number): string {
  if (hpPercent > 50) return COLORS.correct;
  if (hpPercent > 25) return COLORS.warning;
  return COLORS.wrong;
}

export function BossScene({
  boss,
  hpPercent,
  phase,
  onIntroComplete,
}: BossSceneProps): React.JSX.Element {
  const stableCallback = useCallback(() => {
    onIntroComplete?.();
  }, [onIntroComplete]);

  const openingText = useTypewriter(boss.openingLine, 60, stableCallback);
  const defeatOpacity = useSharedValue(1);
  const defeatScale = useSharedValue(1);

  useEffect(() => {
    if (phase === "defeated") {
      defeatOpacity.value = withTiming(0, { duration: 800 });
      defeatScale.value = withTiming(0, { duration: 800 });
    }
  }, [phase, defeatOpacity, defeatScale]);

  const defeatStyle = useAnimatedStyle(() => ({
    opacity: defeatOpacity.value,
    transform: [{ scale: defeatScale.value }],
  }));

  if (phase === "intro") {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.bigEmoji}>{boss.emoji}</ThemedText>
        <ThemedText size="lg" style={styles.name}>
          {boss.name}
        </ThemedText>
        <ThemedText variant="secondary" size="md" style={styles.line}>
          {openingText}
        </ThemedText>
      </View>
    );
  }

  if (phase === "defeated") {
    return (
      <Animated.View style={[styles.container, defeatStyle]}>
        <ThemedText style={styles.bigEmoji}>{boss.emoji}</ThemedText>
        <ThemedText variant="secondary" size="md" style={styles.line}>
          {boss.defeatLine}
        </ThemedText>
      </Animated.View>
    );
  }

  // battle phase
  const hpColor = getHpColor(hpPercent);

  return (
    <View style={styles.battleRow}>
      <ThemedText style={styles.smallEmoji}>{boss.emoji}</ThemedText>
      <View style={styles.hpContainer}>
        <ProgressBar
          progress={hpPercent / 100}
          color={hpColor}
          label={`${STRINGS.bossHpLabel} ${Math.round(hpPercent)}%`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 12, padding: 16 },
  bigEmoji: { fontSize: 64, textAlign: "center" },
  smallEmoji: { fontSize: 32 },
  name: { fontWeight: "700", color: COLORS.textPrimary },
  line: { textAlign: "center", paddingHorizontal: 16 },
  battleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  hpContainer: { flex: 1 },
});
