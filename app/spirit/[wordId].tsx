import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "@/utils/colors";
import { STRINGS, getPosLabel, formatNextReview } from "@/utils/strings";
import { STAGE_NAMES } from "@/utils/constants";
import { useGame } from "@/store/GameContext";
import { getWordById } from "@/data/words/index";
import { SpiritImage } from "@/components/spirits/SpiritImage";
import { EvolutionDots } from "@/components/spirits/EvolutionDots";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { ThemedText } from "@/components/ui/ThemedText";
import { PressableButton } from "@/components/ui/PressableButton";

export default function SpiritDetailScreen(): React.JSX.Element {
  const { wordId } = useLocalSearchParams<{ wordId: string }>();
  const router = useRouter();
  const { state } = useGame();

  const word = wordId ? getWordById(wordId) : undefined;
  const spirit = wordId ? state.spirits[wordId] : undefined;

  if (!word) {
    return (
      <SafeAreaView style={styles.safe}>
        <ThemedText variant="secondary" style={styles.center}>
          Spirit not found
        </ThemedText>
      </SafeAreaView>
    );
  }

  const stage = spirit?.stage ?? 1;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Spirit image with idle animation */}
        <View style={styles.imageContainer}>
          <SpiritImage
            type={word.type}
            posCategory={word.posCategory}
            stage={stage}
            size={120}
          />
        </View>

        {/* Word + meaning */}
        <ThemedText size="xl" style={styles.word}>
          {word.word}
        </ThemedText>
        <ThemedText variant="secondary" size="lg">
          {word.meaning}
        </ThemedText>

        {/* Type + POS */}
        <View style={styles.badges}>
          <TypeBadge type={word.type} />
          <ThemedText variant="secondary" size="sm">
            {getPosLabel(word.pos)}
          </ThemedText>
        </View>

        {/* Phonetic */}
        {word.phonetic ? (
          <ThemedText variant="hint" size="md">
            {word.phonetic}
          </ThemedText>
        ) : null}

        {/* Example sentence */}
        {word.example ? (
          <View style={styles.exampleCard}>
            <ThemedText variant="secondary" size="sm">
              {word.example}
            </ThemedText>
          </View>
        ) : null}

        {/* Evolution + SRS info */}
        {spirit ? (
          <View style={styles.card}>
            <View style={styles.row}>
              <ThemedText variant="secondary" size="sm">
                {STRINGS.spiritDetailStage}
              </ThemedText>
              <ThemedText size="sm" style={styles.stageText}>
                {STAGE_NAMES[stage]}
              </ThemedText>
            </View>
            <EvolutionDots stage={stage} />
            <View style={styles.row}>
              <ThemedText variant="secondary" size="sm">
                {STRINGS.spiritDetailNextReview}
              </ThemedText>
              <ThemedText size="sm" style={styles.value}>
                {formatNextReview(spirit.nextReviewAt)}
              </ThemedText>
            </View>
            <View style={styles.row}>
              <ThemedText variant="secondary" size="sm">
                {STRINGS.spiritDetailTotalReviews}
              </ThemedText>
              <ThemedText size="sm" style={styles.value}>
                {spirit.totalReviews}
              </ThemedText>
            </View>
          </View>
        ) : null}

        <PressableButton
          label={STRINGS.spiritDetailClose}
          onPress={() => router.back()}
          style={styles.closeButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgPrimary },
  center: { flex: 1, textAlign: "center", padding: 32 },
  content: { alignItems: "center", padding: 24, gap: 12 },
  imageContainer: { marginBottom: 8 },
  word: { fontWeight: "700", color: COLORS.textPrimary },
  badges: { flexDirection: "row", alignItems: "center", gap: 12 },
  exampleCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 12,
    width: "100%",
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stageText: { fontWeight: "600", color: COLORS.accent },
  value: { fontWeight: "600", color: COLORS.textPrimary },
  closeButton: { marginTop: 8, width: "100%" },
});
