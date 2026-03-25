import React, { useState, useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import type { SpiritType } from "@/store/types";
import { COLORS, SPIRIT_TYPE_COLORS, SPIRIT_TYPE_LABELS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { MASTERED_STAGE } from "@/utils/constants";
import { useGame } from "@/store/GameContext";
import { ALL_WORDS } from "@/data/words/index";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { SpiritGrid } from "@/components/spirits/SpiritGrid";

const SPIRIT_TYPES: readonly SpiritType[] = [
  "flame",
  "aqua",
  "nature",
  "metal",
  "bloom",
  "star",
  "moon",
  "crystal",
];

export default function CollectionScreen(): React.JSX.Element {
  const { state } = useGame();
  const router = useRouter();
  const [filter, setFilter] = useState<SpiritType | "all">("all");

  const filteredWords = useMemo(
    () =>
      filter === "all" ? ALL_WORDS : ALL_WORDS.filter((w) => w.type === filter),
    [filter],
  );

  const spiritValues = Object.values(state.spirits);
  const capturedCount = spiritValues.length;
  const masteredCount = spiritValues.filter(
    (s) => s.stage === MASTERED_STAGE,
  ).length;
  const shinyCount = spiritValues.filter((s) => s.isShiny).length;
  const completionPct = `${Math.round((capturedCount / ALL_WORDS.length) * 100)}%`;

  const handlePress = useCallback(
    (wordId: string) => {
      router.push(`/spirit/${wordId}`);
    },
    [router],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ThemedView>
        <View style={styles.header}>
          <ThemedText size="xl" style={styles.title}>
            {STRINGS.collectionTitle}
          </ThemedText>

          <View style={styles.stats}>
            <StatCard label={STRINGS.statsCaptures} value={capturedCount} />
            <StatCard label={STRINGS.statsMastered} value={masteredCount} />
            <StatCard label={STRINGS.statsShiny} value={shinyCount} />
            <StatCard label={STRINGS.statsCompletion} value={completionPct} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          <FilterChip
            label={STRINGS.collectionFilterAll}
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />
          {SPIRIT_TYPES.map((t) => (
            <FilterChip
              key={t}
              label={SPIRIT_TYPE_LABELS[t]}
              active={filter === t}
              color={SPIRIT_TYPE_COLORS[t]}
              onPress={() => setFilter(t)}
            />
          ))}
        </ScrollView>

        <View style={styles.gridContainer}>
          {capturedCount === 0 ? (
            <View style={styles.empty}>
              <ThemedText variant="secondary">
                {STRINGS.collectionEmpty}
              </ThemedText>
            </View>
          ) : (
            <SpiritGrid
              words={filteredWords}
              spirits={state.spirits}
              onPress={handlePress}
            />
          )}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

function StatCard({
  label,
  value,
}: {
  readonly label: string;
  readonly value: number | string;
}): React.JSX.Element {
  return (
    <View style={styles.statCard}>
      <ThemedText size="xl" style={styles.statValue}>
        {value}
      </ThemedText>
      <ThemedText variant="secondary" size="sm">
        {label}
      </ThemedText>
    </View>
  );
}

function FilterChip({
  label,
  active,
  color,
  onPress,
}: {
  readonly label: string;
  readonly active: boolean;
  readonly color?: string;
  readonly onPress: () => void;
}): React.JSX.Element {
  const bg = active ? (color ?? COLORS.accent) : COLORS.bgButton;
  const textColor = active ? COLORS.textWhite : COLORS.textSecondary;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { backgroundColor: active ? `${bg}33` : bg, borderColor: bg },
      ]}
    >
      <ThemedText size="sm" style={{ color: active ? bg : textColor }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgPrimary },
  header: { paddingHorizontal: 20, paddingTop: 16, gap: 12 },
  title: { fontWeight: "700" },
  stats: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statValue: { fontWeight: "700" },
  filterScroll: { marginTop: 12, height: 44 },
  filterContent: { paddingHorizontal: 16, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  gridContainer: { flex: 1, marginTop: 8 },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
});
