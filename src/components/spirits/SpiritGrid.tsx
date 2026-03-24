import React, { useCallback } from "react";
import { FlatList, Pressable, View, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { WordEntry, CapturedSpirit } from "@/store/types";
import { COLORS } from "@/utils/colors";
import { MASTERED_STAGE } from "@/utils/constants";
import { ThemedText } from "@/components/ui/ThemedText";
import { SpiritCard } from "@/components/spirits/SpiritCard";

interface SpiritGridProps {
  readonly words: readonly WordEntry[];
  readonly spirits: Record<string, CapturedSpirit>;
  readonly onPress: (wordId: string) => void;
}

interface GridItem {
  readonly word: WordEntry;
  readonly spirit: CapturedSpirit | undefined;
}

export function SpiritGrid({
  words,
  spirits,
  onPress,
}: SpiritGridProps): React.JSX.Element {
  const data: readonly GridItem[] = words.map((w) => ({
    word: w,
    spirit: spirits[w.id],
  }));

  const renderItem = useCallback(
    ({ item, index }: { item: GridItem; index: number }) => {
      const { word, spirit } = item;
      const isCaptured = spirit !== undefined;

      return (
        <Animated.View
          entering={FadeInDown.delay(index * 30).duration(300)}
          style={styles.cell}
        >
          <Pressable
            onPress={() => isCaptured && onPress(word.id)}
            style={styles.pressable}
          >
            {isCaptured ? (
              <View>
                <SpiritCard
                  word={word.word}
                  type={word.type}
                  posCategory={word.posCategory}
                  stage={spirit.stage}
                  size={56}
                  compact
                />
                {spirit.stage === MASTERED_STAGE ? (
                  <ThemedText style={styles.crown}>👑</ThemedText>
                ) : null}
              </View>
            ) : (
              <View style={styles.unknown}>
                <ThemedText variant="hint" size="lg">
                  ?
                </ThemedText>
              </View>
            )}
          </Pressable>
        </Animated.View>
      );
    },
    [onPress],
  );

  const keyExtractor = useCallback((item: GridItem) => item.word.id, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={4}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  grid: { paddingHorizontal: 8, paddingBottom: 24 },
  cell: { flex: 1, padding: 4, maxWidth: "25%" },
  pressable: { alignItems: "center", minHeight: 80 },
  unknown: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.bgButton,
    justifyContent: "center",
    alignItems: "center",
  },
  crown: {
    position: "absolute",
    top: -2,
    right: -2,
    fontSize: 12,
    color: COLORS.warning,
  },
});
