import React, { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { WordEntry } from "@/store/types";
import { COLORS, SPIRIT_TYPE_COLORS } from "@/utils/colors";
import { ThemedText } from "@/components/ui/ThemedText";
import { Modal } from "@/components/ui/Modal";

interface PassageViewProps {
  readonly passage: string;
  readonly capturedWordIds: readonly string[];
  readonly words: readonly WordEntry[];
  readonly annotations?: Record<string, string>;
}

interface Token {
  raw: string;
  // Set when word is in game vocabulary AND captured by player
  capturedEntry: WordEntry | undefined;
  // Set when word is outside game vocabulary and has a Chinese annotation
  outsideAnnotation: string | undefined;
}

function tokenize(
  text: string,
  capturedSet: ReadonlySet<string>,
  wordMap: ReadonlyMap<string, WordEntry>,
  annotations: Record<string, string>,
): readonly Token[] {
  const parts = text.split(/\s+/);
  return parts.map((raw) => {
    const clean = raw.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const entry = clean ? wordMap.get(clean) : undefined;
    if (entry) {
      // Word is in the 1200-word game vocabulary — highlight if captured, no Chinese
      const isCaptured = capturedSet.has(entry.id);
      return {
        raw,
        capturedEntry: isCaptured ? entry : undefined,
        outsideAnnotation: undefined,
      };
    }
    // Word is outside game vocabulary — show annotation if available
    const annotation = clean ? annotations[clean] : undefined;
    return { raw, capturedEntry: undefined, outsideAnnotation: annotation };
  });
}

export function PassageView({
  passage,
  capturedWordIds,
  words,
  annotations = {},
}: PassageViewProps): React.JSX.Element {
  const [tooltipEntry, setTooltipEntry] = useState<WordEntry | null>(null);
  const opacity = useSharedValue(0);

  const capturedSet = useMemo(
    () => new Set(capturedWordIds),
    [capturedWordIds],
  );

  const wordMap = useMemo(() => {
    const map = new Map<string, WordEntry>();
    for (const w of words) {
      map.set(w.word.toLowerCase(), w);
    }
    return map;
  }, [words]);

  const tokens = useMemo(
    () => tokenize(passage, capturedSet, wordMap, annotations),
    [passage, capturedSet, wordMap, annotations],
  );

  React.useEffect(() => {
    opacity.value = 0;
    opacity.value = withTiming(1, { duration: 400 });
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleLongPress = useCallback((entry: WordEntry) => {
    setTooltipEntry(entry);
  }, []);

  const handleCloseTooltip = useCallback(() => {
    setTooltipEntry(null);
  }, []);

  return (
    <>
      <Animated.View style={[styles.container, animStyle]}>
        <View style={styles.passage}>
          {tokens.map((token, i) => {
            // Captured game-vocab word: highlight + inline Chinese, long-press for example
            if (token.capturedEntry) {
              const typeColor = SPIRIT_TYPE_COLORS[token.capturedEntry.type];
              return (
                <Pressable
                  key={i}
                  onLongPress={() => handleLongPress(token.capturedEntry!)}
                  delayLongPress={300}
                  style={styles.capturedWrap}
                >
                  <ThemedText
                    size="md"
                    style={[
                      styles.highlightedWord,
                      { backgroundColor: `${typeColor}33` },
                    ]}
                  >
                    {token.raw}{" "}
                  </ThemedText>
                  <ThemedText
                    variant="hint"
                    size="sm"
                    style={styles.chineseAnnotation}
                  >
                    {token.capturedEntry.meaning}
                  </ThemedText>
                </Pressable>
              );
            }
            // Out-of-vocabulary word with annotation: show Chinese below
            if (token.outsideAnnotation) {
              return (
                <View key={i} style={styles.annotatedWrap}>
                  <ThemedText size="md" style={styles.annotatedWord}>
                    {token.raw}
                  </ThemedText>
                  <ThemedText
                    variant="hint"
                    size="sm"
                    style={styles.chineseAnnotation}
                  >
                    {token.outsideAnnotation}
                  </ThemedText>
                </View>
              );
            }
            // Plain word
            return (
              <ThemedText key={i} size="md" style={styles.normalWord}>
                {token.raw}{" "}
              </ThemedText>
            );
          })}
        </View>
      </Animated.View>

      <Modal visible={tooltipEntry !== null} onClose={handleCloseTooltip}>
        {tooltipEntry ? (
          <View style={styles.tooltip}>
            <ThemedText size="lg" style={styles.tooltipWord}>
              {tooltipEntry.word}
            </ThemedText>
            <ThemedText variant="secondary" size="md">
              {tooltipEntry.meaning}
            </ThemedText>
            {tooltipEntry.example ? (
              <ThemedText
                variant="secondary"
                size="sm"
                style={styles.tooltipExample}
              >
                {tooltipEntry.example}
              </ThemedText>
            ) : null}
          </View>
        ) : null}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
  },
  passage: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  highlightedWord: {
    borderRadius: 4,
    paddingHorizontal: 2,
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  capturedWrap: {
    alignItems: "center",
    marginRight: 2,
    marginBottom: 4,
  },
  annotatedWrap: {
    alignItems: "center",
    marginRight: 4,
    marginBottom: 4,
  },
  annotatedWord: {
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: COLORS.textHint,
  },
  chineseAnnotation: {
    fontSize: 10,
    lineHeight: 12,
    marginTop: -2,
  },
  normalWord: { color: COLORS.textPrimary },
  hidden: { textAlign: "center", marginTop: 8 },
  tooltip: { gap: 8 },
  tooltipWord: { fontWeight: "700", color: COLORS.textPrimary },
  tooltipExample: { marginTop: 4, fontStyle: "italic" },
});
