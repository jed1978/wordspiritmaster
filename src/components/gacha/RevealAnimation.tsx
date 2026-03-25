import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type { WordEntry } from "@/store/types";
import { COLORS, SPIRIT_TYPE_COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { ThemedText } from "@/components/ui/ThemedText";
import { SpiritImage } from "@/components/spirits/SpiritImage";

interface RevealAnimationProps {
  readonly result: {
    readonly wordId: string;
    readonly rarity: number;
    readonly isNew: boolean;
  };
  readonly word: WordEntry;
}

export function RevealAnimation({
  result,
  word,
}: RevealAnimationProps): React.JSX.Element {
  const bgOpacity = useSharedValue(0);
  const typeColor = SPIRIT_TYPE_COLORS[word.type];

  useEffect(() => {
    bgOpacity.value = withTiming(0.3, { duration: 600 });
  }, [bgOpacity]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
    backgroundColor: typeColor,
  }));

  const rarityLabel = STRINGS.rarityLabels[result.rarity - 1] ?? "★";
  const newLabel = result.isNew ? STRINGS.gachaNew : STRINGS.gachaDuplicate;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glow, glowStyle]} />
      <View style={styles.content}>
        <SpiritImage
          type={word.type}
          posCategory={word.posCategory}
          stage={1}
          size={100}
        />
        <ThemedText size="xl" style={styles.word}>
          {word.word}
        </ThemedText>
        <ThemedText variant="secondary" size="lg">
          {word.meaning}
        </ThemedText>
        <ThemedText style={[styles.rarity, { color: typeColor }]}>
          {rarityLabel}
        </ThemedText>
        <ThemedText
          variant={result.isNew ? "correct" : "secondary"}
          size="md"
          style={styles.newLabel}
        >
          {newLabel}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  content: {
    alignItems: "center",
    gap: 12,
    zIndex: 1,
  },
  word: { fontWeight: "700", color: COLORS.textPrimary },
  rarity: { fontSize: 24, fontWeight: "700" },
  newLabel: { fontWeight: "600" },
});
