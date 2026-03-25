import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { useGame } from "@/store/GameContext";
import { ALL_PASSAGES } from "@/data/passages/index";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";

type AreaStatus = "defeated" | "unlocked" | "locked";

interface AreaNode {
  readonly areaId: number;
  readonly status: AreaStatus;
  readonly bossName: string;
  readonly bossEmoji: string;
  readonly bossPersonality: string;
}

function getAreaStatus(
  areaId: number,
  unlockedAreas: readonly number[],
  defeatedAreas: readonly number[],
): AreaStatus {
  if (defeatedAreas.includes(areaId)) return "defeated";
  if (unlockedAreas.includes(areaId)) return "unlocked";
  return "locked";
}

const STATUS_BG: Record<AreaStatus, string> = {
  defeated: COLORS.correct,
  unlocked: COLORS.accent,
  locked: COLORS.bgButton,
};

export default function BattleScreen(): React.JSX.Element {
  const { state } = useGame();
  const router = useRouter();

  const unlockedAreas = state.progress?.unlockedAreas ?? [1];
  const defeatedAreas = state.progress?.defeatedAreas ?? [];

  const nodes: readonly AreaNode[] = useMemo(
    () =>
      ALL_PASSAGES.map((p) => ({
        areaId: p.areaId,
        status: getAreaStatus(p.areaId, unlockedAreas, defeatedAreas),
        bossName: p.boss.name,
        bossEmoji: p.boss.emoji,
        bossPersonality: p.boss.personality,
      })),
    [unlockedAreas, defeatedAreas],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ThemedView>
        <ThemedText size="xl" style={styles.title}>
          {STRINGS.battleTabTitle}
        </ThemedText>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {nodes.map((node, index) => (
            <View key={node.areaId} style={styles.nodeContainer}>
              {index > 0 ? <View style={styles.connector} /> : null}
              <View style={styles.nodeRow}>
                <Pressable
                  style={[
                    styles.node,
                    { backgroundColor: STATUS_BG[node.status] },
                    node.status === "locked" && styles.nodeDisabled,
                  ]}
                  onPress={() =>
                    router.push(`/battle/${node.areaId}` as `/battle/${number}`)
                  }
                  disabled={node.status === "locked"}
                  accessibilityLabel={`${STRINGS.areaLabel(node.areaId)} ${node.bossName}`}
                  accessibilityRole="button"
                >
                  <ThemedText size="xl">
                    {node.status === "defeated"
                      ? "✓"
                      : node.status === "locked"
                        ? "🔒"
                        : node.bossEmoji}
                  </ThemedText>
                </Pressable>
                <View style={styles.nodeLabel}>
                  <ThemedText
                    size="md"
                    style={{
                      color:
                        node.status === "locked"
                          ? COLORS.textHint
                          : COLORS.textPrimary,
                      fontWeight: "600",
                    }}
                  >
                    {node.bossName}
                  </ThemedText>
                  <ThemedText
                    size="sm"
                    style={{
                      color:
                        node.status === "defeated"
                          ? COLORS.correct
                          : node.status === "locked"
                            ? COLORS.textHint
                            : COLORS.textSecondary,
                    }}
                  >
                    {node.status === "defeated"
                      ? STRINGS.areaDefeated
                      : node.status === "locked"
                        ? STRINGS.areaLocked
                        : node.bossPersonality}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgPrimary },
  title: { fontWeight: "700", paddingHorizontal: 20, paddingTop: 16 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  nodeContainer: { alignItems: "center", width: "100%" },
  connector: {
    width: 2,
    height: 28,
    backgroundColor: COLORS.borderButton,
    marginVertical: 4,
  },
  nodeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
    justifyContent: "center",
  },
  node: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.borderButton,
  },
  nodeDisabled: { opacity: 0.4 },
  nodeLabel: { width: 120, gap: 2 },
});
