import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { useGame, useGameDispatch } from "@/store/GameContext";
import { useLightHaptic, useHeavyHaptic } from "@/hooks/useHaptic";
import { ALL_WORDS, getWordById } from "@/data/words/index";
import { pullGacha, type GachaPullResult } from "@/core/gacha";
import type { WordEntry } from "@/store/types";
import { ThemedText } from "@/components/ui/ThemedText";
import { PressableButton } from "@/components/ui/PressableButton";
import { CrystalAnimation } from "@/components/gacha/CrystalAnimation";
import { RevealAnimation } from "@/components/gacha/RevealAnimation";

type GachaPhase = "crystal" | "reveal" | "empty";

export default function GachaScreen(): React.JSX.Element {
  const { state } = useGame();
  const dispatch = useGameDispatch();
  const router = useRouter();
  const lightHaptic = useLightHaptic();
  const heavyHaptic = useHeavyHaptic();

  const [phase, setPhase] = useState<GachaPhase>("crystal");
  const [pullResult, setPullResult] = useState<GachaPullResult | null>(null);
  const [revealWord, setRevealWord] = useState<WordEntry | null>(null);

  const canPull = state.gacha.freeRemainingToday > 0;

  const handlePull = useCallback(() => {
    if (!canPull) return;

    const result = pullGacha(state, ALL_WORDS);
    const word = getWordById(result.wordId);
    if (!word) return;

    heavyHaptic();
    dispatch({
      type: "GACHA_PULL",
      wordId: result.wordId,
      rarity: result.rarity,
    });

    setPullResult(result);
    setRevealWord(word);
    setPhase("reveal");
  }, [state, dispatch, heavyHaptic, canPull]);

  const handleAgain = useCallback(() => {
    if (!canPull) {
      setPhase("empty");
      return;
    }
    lightHaptic();
    setPhase("crystal");
    setPullResult(null);
    setRevealWord(null);
  }, [lightHaptic, canPull]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ThemedText size="xl" style={styles.title}>
          {STRINGS.gachaTitle}
        </ThemedText>

        <View style={styles.body}>
          {phase === "crystal" ? (
            <CrystalAnimation onPress={handlePull} />
          ) : null}

          {phase === "reveal" && pullResult && revealWord ? (
            <RevealAnimation result={pullResult} word={revealWord} />
          ) : null}

          {phase === "empty" ? (
            <ThemedText variant="secondary" size="lg" style={styles.emptyText}>
              {STRINGS.gachaNoFree}
            </ThemedText>
          ) : null}
        </View>

        <View style={styles.actions}>
          {phase === "reveal" ? (
            <>
              <PressableButton
                label={STRINGS.gachaAgain}
                onPress={handleAgain}
                variant="accent"
              />
              <PressableButton
                label={STRINGS.gachaClose}
                onPress={handleClose}
              />
            </>
          ) : null}

          {phase === "empty" ? (
            <PressableButton label={STRINGS.gachaClose} onPress={handleClose} />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgPrimary },
  container: { flex: 1, paddingHorizontal: 20, paddingVertical: 16 },
  title: { fontWeight: "700", textAlign: "center" },
  body: { flex: 1, justifyContent: "center", alignItems: "center" },
  actions: { gap: 12, paddingBottom: 16 },
  emptyText: { textAlign: "center" },
});
