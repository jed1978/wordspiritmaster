import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { useGame, useGameDispatch } from "@/store/GameContext";
import { useLightHaptic, useWarningHaptic } from "@/hooks/useHaptic";
import { getPassageByAreaId } from "@/data/passages/index";
import {
  initBattle,
  processAnswer as processBattleAnswer,
  getBossHpPercent,
  type BattleState,
} from "@/core/combat";
import { ALL_WORDS } from "@/data/words/index";
import { BossScene } from "@/components/battle/BossScene";
import { PassageView } from "@/components/battle/PassageView";
import { BattleQuestion } from "@/components/battle/BattleQuestion";
import { ThemedText } from "@/components/ui/ThemedText";
import { PressableButton } from "@/components/ui/PressableButton";

type ScreenPhase = "intro" | "battle" | "defeated" | "failed";

export default function BattleScreen(): React.JSX.Element {
  const { areaId } = useLocalSearchParams<{ areaId: string }>();
  const router = useRouter();
  const { state } = useGame();
  const dispatch = useGameDispatch();
  const lightHaptic = useLightHaptic();
  const warningHaptic = useWarningHaptic();

  const areaIdNum = Number(areaId);
  const passage = getPassageByAreaId(areaIdNum);

  const [battle, setBattle] = useState<BattleState | null>(() =>
    passage ? initBattle(passage) : null,
  );
  const [phase, setPhase] = useState<ScreenPhase>("intro");
  const [answerDisabled, setAnswerDisabled] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  const capturedWordIds = Object.keys(state.spirits);

  const handleIntroComplete = useCallback(() => {
    setPhase("battle");
  }, []);

  // Auto-transition fallback from intro
  useEffect(() => {
    if (phase !== "intro") return;
    const timer = setTimeout(() => setPhase("battle"), 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleSkipIntro = useCallback(() => {
    if (phase === "intro") setPhase("battle");
  }, [phase]);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (!battle || !passage || answerDisabled) return;

      const question = passage.questions[battle.currentQuestionIndex];
      if (!question) return;

      setAnswerDisabled(true);

      if (isCorrect) {
        lightHaptic();
      } else {
        warningHaptic();
        setShowExplanation(question.explanation);
      }

      const updated = processBattleAnswer(battle, isCorrect);
      setBattle(updated);

      // Check end conditions
      const isLast = updated.currentQuestionIndex >= updated.totalQuestions;

      setTimeout(
        () => {
          setShowExplanation(null);
          setAnswerDisabled(false);

          if (isLast) {
            if (updated.isDefeated) {
              dispatch({ type: "DEFEAT_BOSS", areaId: areaIdNum });
              dispatch({ type: "UNLOCK_AREA", areaId: areaIdNum + 1 });
              setPhase("defeated");
            } else {
              setPhase("failed");
            }
          }
        },
        isCorrect ? 1000 : 2500,
      );
    },
    [
      battle,
      passage,
      answerDisabled,
      lightHaptic,
      warningHaptic,
      dispatch,
      areaIdNum,
    ],
  );

  if (!passage || !battle) {
    return (
      <SafeAreaView style={styles.safe}>
        <ThemedText variant="secondary" style={styles.center}>
          Area not found
        </ThemedText>
      </SafeAreaView>
    );
  }

  const hpPercent = getBossHpPercent(battle);
  const currentQuestion = passage.questions[battle.currentQuestionIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Boss scene */}
        <BossScene
          boss={passage.boss}
          hpPercent={hpPercent}
          phase={
            phase === "defeated"
              ? "defeated"
              : phase === "intro"
                ? "intro"
                : "battle"
          }
          onIntroComplete={handleIntroComplete}
        />

        {/* Intro skip */}
        {phase === "intro" ? (
          <PressableButton
            label={STRINGS.battleSkip}
            onPress={handleSkipIntro}
            style={styles.skipButton}
          />
        ) : null}

        {/* Passage + Question */}
        {phase === "battle" ? (
          <View style={styles.battleContent}>
            <PassageView
              passage={passage.passage}
              revealedSentences={battle.revealedSentences}
              capturedWordIds={capturedWordIds}
              words={ALL_WORDS}
            />

            {currentQuestion ? (
              <BattleQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                showExplanation={answerDisabled && showExplanation !== null}
              />
            ) : null}
          </View>
        ) : null}

        {/* Victory */}
        {phase === "defeated" ? (
          <View style={styles.result}>
            <ThemedText variant="correct" size="xl">
              {STRINGS.battleVictory}
            </ThemedText>
            <PressableButton
              label={STRINGS.continueButton}
              onPress={() => router.back()}
              variant="accent"
            />
          </View>
        ) : null}

        {/* Failed */}
        {phase === "failed" ? (
          <View style={styles.result}>
            <ThemedText variant="secondary" size="lg">
              {STRINGS.battleResult}
            </ThemedText>
            <PressableButton
              label={STRINGS.continueButton}
              onPress={() => router.back()}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgPrimary },
  container: { flex: 1, paddingVertical: 16 },
  center: { flex: 1, textAlign: "center", padding: 32 },
  skipButton: { alignSelf: "center", marginTop: 16, paddingHorizontal: 32 },
  battleContent: { flex: 1, gap: 16 },
  result: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 32,
  },
});
