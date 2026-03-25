import React, { useMemo } from "react";
import { View, ScrollView, Switch, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { MASTERED_STAGE } from "@/utils/constants";
import { useGame, useGameDispatch } from "@/store/GameContext";
import { getTitle, getLevel, getXpForNextLevel } from "@/core/progression";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function ProfileScreen(): React.JSX.Element {
  const { state } = useGame();
  const dispatch = useGameDispatch();

  const level = getLevel(state.totalXp);
  const title = getTitle(level);
  const xpForNext = getXpForNextLevel(level);

  // Calculate XP progress within current level
  const xpProgress = useMemo(() => {
    let consumed = 0;
    for (let l = 1; l < level; l++) {
      consumed += getXpForNextLevel(l);
    }
    const xpInLevel = state.totalXp - consumed;
    return xpInLevel / xpForNext;
  }, [state.totalXp, level, xpForNext]);

  const spirits = Object.values(state.spirits);
  const capturedCount = spirits.length;
  const masteredCount = spirits.filter(
    (s) => s.stage === MASTERED_STAGE,
  ).length;
  const totalReviews = spirits.reduce((sum, s) => sum + s.totalReviews, 0);
  const totalCorrect = spirits.reduce((sum, s) => sum + s.totalCorrect, 0);
  const accuracy =
    totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ThemedView>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText size="xl" style={styles.title}>
            {STRINGS.profileTitle}
          </ThemedText>

          {/* Level + Title */}
          <View style={styles.card}>
            <ThemedText variant="secondary" size="sm">
              {STRINGS.levelLabel}
            </ThemedText>
            <ThemedText size="xl" style={styles.levelText}>
              Lv. {level}
            </ThemedText>
            <ThemedText variant="secondary" size="md">
              {STRINGS.titleLabel}: {title}
            </ThemedText>
            <ProgressBar
              progress={xpProgress}
              color={COLORS.accent}
              label={`XP ${Math.round(xpProgress * xpForNext)}/${xpForNext}`}
            />
          </View>

          {/* Streak */}
          <View style={styles.card}>
            <ThemedText variant="secondary" size="sm">
              {STRINGS.streakLabel}
            </ThemedText>
            <ThemedText size="xl" style={styles.streakText}>
              🔥 {state.streak}
            </ThemedText>
          </View>

          {/* Stats */}
          <View style={styles.card}>
            <StatRow label={STRINGS.statsCaptures} value={capturedCount} />
            <StatRow label={STRINGS.statsMastered} value={masteredCount} />
            <StatRow label={STRINGS.totalReviewsLabel} value={totalReviews} />
            <StatRow label={STRINGS.accuracyLabel} value={`${accuracy}%`} />
          </View>

          {/* Settings */}
          <View style={styles.card}>
            <ToggleRow
              label={STRINGS.soundToggleLabel}
              value={state.settings.soundEnabled}
              onToggle={() => dispatch({ type: "TOGGLE_SOUND" })}
            />
            <ToggleRow
              label={STRINGS.hapticToggleLabel}
              value={state.settings.hapticEnabled}
              onToggle={() => dispatch({ type: "TOGGLE_HAPTIC" })}
            />
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

function StatRow({
  label,
  value,
}: {
  readonly label: string;
  readonly value: number | string;
}): React.JSX.Element {
  return (
    <View style={styles.statRow}>
      <ThemedText variant="secondary" size="md">
        {label}
      </ThemedText>
      <ThemedText size="md" style={styles.statValue}>
        {value}
      </ThemedText>
    </View>
  );
}

function ToggleRow({
  label,
  value,
  onToggle,
}: {
  readonly label: string;
  readonly value: boolean;
  readonly onToggle: () => void;
}): React.JSX.Element {
  return (
    <View style={styles.statRow}>
      <ThemedText variant="secondary" size="md">
        {label}
      </ThemedText>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.bgButton, true: COLORS.accent }}
        thumbColor={COLORS.textWhite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgPrimary },
  content: { padding: 20, gap: 16 },
  title: { fontWeight: "700" },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  levelText: { fontWeight: "700", color: COLORS.accent },
  streakText: { fontWeight: "700", color: COLORS.warning },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: { fontWeight: "600", color: COLORS.textPrimary },
});
