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
}

interface Token {
  raw: string;
  entry: WordEntry | undefined;
  isCaptured: boolean;
  typeColor: string | null;
}

function tokenize(
  text: string,
  capturedSet: ReadonlySet<string>,
  wordMap: ReadonlyMap<string, WordEntry>,
): readonly Token[] {
  const parts = text.split(/\s+/);
  return parts.map((raw) => {
    const clean = raw.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const entry = clean ? wordMap.get(clean) : undefined;
    const isCaptured = entry ? capturedSet.has(entry.id) : false;
    return {
      raw,
      entry: isCaptured ? entry : undefined,
      isCaptured,
      typeColor: entry && isCaptured ? SPIRIT_TYPE_COLORS[entry.type] : null,
    };
  });
}

export function PassageView({
  passage,
  capturedWordIds,
  words,
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
    () => tokenize(passage, capturedSet, wordMap),
    [passage, capturedSet, wordMap],
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
          {tokens.map((token, i) =>
            token.isCaptured && token.entry ? (
              <Pressable
                key={i}
                onLongPress={() => handleLongPress(token.entry!)}
                delayLongPress={300}
              >
                <View style={styles.highlightedWrap}>
                  <ThemedText
                    size="md"
                    style={[
                      styles.highlightedWord,
                      { backgroundColor: `${token.typeColor}33` },
                    ]}
                  >
                    {token.raw}
                  </ThemedText>
                  <ThemedText
                    variant="secondary"
                    size="sm"
                    style={styles.chineseAnnotation}
                  >
                    {token.entry.meaning}
                  </ThemedText>
                </View>
              </Pressable>
            ) : (
              <ThemedText key={i} size="md" style={styles.normalWord}>
                {token.raw}{" "}
              </ThemedText>
            ),
          )}
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
  highlightedWrap: {
    alignItems: "center",
    marginRight: 4,
    marginBottom: 4,
  },
  highlightedWord: {
    borderRadius: 4,
    paddingHorizontal: 2,
    color: COLORS.textPrimary,
    fontSize: 16,
    lineHeight: 24,
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
