import React, { useState, useCallback, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { SpiritType } from "@/store/types";
import { COLORS, SPIRIT_TYPE_COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { ThemedText } from "@/components/ui/ThemedText";

interface LetterToken {
  readonly letter: string;
  readonly id: number;
}

interface SpellInputProps {
  readonly word: string;
  readonly meaning: string;
  readonly spiritType: SpiritType;
  readonly onComplete: (isCorrect: boolean) => void;
}

function shuffleLetters(word: string): LetterToken[] {
  const tokens = [...word].map((letter, id) => ({ letter, id }));
  for (let i = tokens.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
  }
  return tokens;
}

export function SpellInput({
  word,
  meaning,
  spiritType,
  onComplete,
}: SpellInputProps): React.JSX.Element {
  const [filled, setFilled] = useState<LetterToken[]>([]);
  const [available, setAvailable] = useState<LetterToken[]>(() =>
    shuffleLetters(word),
  );
  const [resolved, setResolved] = useState(false);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  const typeColor = SPIRIT_TYPE_COLORS[spiritType];

  const handlePickLetter = useCallback(
    (token: LetterToken) => {
      if (resolved) return;
      setFilled((prev) => [...prev, token]);
      setAvailable((prev) => prev.filter((t) => t.id !== token.id));
    },
    [resolved],
  );

  const handleRemoveLetter = useCallback(
    (index: number) => {
      if (resolved) return;
      setFilled((prev) => {
        const removed = prev[index];
        const next = [...prev];
        next.splice(index, 1);
        setAvailable((a) => [...a, removed]);
        return next;
      });
    },
    [resolved],
  );

  // Auto-check when all letters filled
  useEffect(() => {
    if (resolved) return;
    if (filled.length !== word.length) return;

    const attempt = filled.map((t) => t.letter).join("");
    const isCorrect = attempt.toLowerCase() === word.toLowerCase();
    setResolved(true);

    if (isCorrect) {
      scale.value = withSpring(1.05, { damping: 8 }, () => {
        scale.value = withSpring(1);
      });
      const timer = setTimeout(() => onComplete(true), 1000);
      return () => clearTimeout(timer);
    } else {
      translateX.value = withSequence(
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(-6, { duration: 60 }),
        withTiming(6, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
      const timer = setTimeout(() => onComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [filled, word, resolved, scale, translateX, onComplete]);

  const isCorrect =
    resolved && filled.map((t) => t.letter).join("").toLowerCase() === word.toLowerCase();

  return (
    <View style={styles.container}>
      <ThemedText size="lg" style={styles.prompt}>
        {STRINGS.spellPrompt}
      </ThemedText>
      <ThemedText size="xl" style={[styles.meaning, { color: typeColor }]}>
        {meaning}
      </ThemedText>

      {/* Slots */}
      <Animated.View style={[styles.slots, containerStyle]}>
        {Array.from({ length: word.length }, (_, i) => {
          const token = filled[i];
          const slotColor = resolved
            ? isCorrect
              ? COLORS.correct
              : COLORS.wrong
            : COLORS.borderButton;
          return (
            <Pressable
              key={i}
              onPress={() => token && handleRemoveLetter(i)}
              style={[styles.slot, { borderBottomColor: slotColor }]}
            >
              {token ? (
                <ThemedText size="xl" style={styles.slotLetter}>
                  {token.letter}
                </ThemedText>
              ) : null}
            </Pressable>
          );
        })}
      </Animated.View>

      {/* Wrong answer reveal */}
      {resolved && !isCorrect ? (
        <ThemedText variant="wrong" size="md" style={styles.reveal}>
          {STRINGS.spellWrong} {word}
        </ThemedText>
      ) : null}

      {/* Correct feedback */}
      {resolved && isCorrect ? (
        <ThemedText variant="correct" size="md" style={styles.reveal}>
          {STRINGS.spellCorrect}
        </ThemedText>
      ) : null}

      {/* Available letters */}
      <View style={styles.pool}>
        {available.map((token) => (
          <Pressable
            key={token.id}
            onPress={() => handlePickLetter(token)}
            style={({ pressed }) => [
              styles.letterBlock,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <ThemedText size="lg" style={styles.letterText}>
              {token.letter}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <ThemedText variant="hint" size="sm" style={styles.hint}>
        {STRINGS.spellHint}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: 20, gap: 16 },
  prompt: { fontWeight: "600" },
  meaning: { fontWeight: "700" },
  slots: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  slot: {
    width: 36,
    height: 44,
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  slotLetter: { fontWeight: "600", color: COLORS.textPrimary },
  reveal: { textAlign: "center", marginTop: 4 },
  pool: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 8,
  },
  letterBlock: {
    minWidth: 40,
    minHeight: 40,
    backgroundColor: COLORS.bgButton,
    borderColor: COLORS.borderButton,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  letterText: { fontWeight: "600", color: COLORS.textPrimary },
  hint: { textAlign: "center", marginTop: 4 },
});
