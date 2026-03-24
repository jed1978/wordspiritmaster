import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import {
  CORRECT_ANSWER_DELAY_MS,
  WRONG_ANSWER_DELAY_MS,
} from "@/utils/constants";
import { useGame } from "@/store/GameContext";
import { useReviewQueue } from "@/hooks/useReviewQueue";
import { useDailySession } from "@/hooks/useDailySession";
import { useLightHaptic, useWarningHaptic } from "@/hooks/useHaptic";
import { ALL_WORDS, getWordById } from "@/data/words/index";
import { generateQuestion } from "@/core/questionGenerator";
import type { Question, WordEntry } from "@/store/types";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { PressableButton } from "@/components/ui/PressableButton";
import { QuestionCard } from "@/components/explore/QuestionCard";
import { CaptureResult } from "@/components/explore/CaptureResult";
import { WrongAnswerHint } from "@/components/explore/WrongAnswerHint";

type ExploreMode = "review" | "capture" | "idle";
type AnswerPhase = "question" | "result";

export default function ExploreScreen(): React.JSX.Element {
  const { state, dispatch, isLoaded } = useGame();
  const { dueWordIds, dueCount } = useReviewQueue();
  const { session } = useDailySession();
  const lightHaptic = useLightHaptic();
  const warningHaptic = useWarningHaptic();

  const [answerPhase, setAnswerPhase] = useState<AnswerPhase>("question");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentWord, setCurrentWord] = useState<WordEntry | null>(null);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Uncaptured words for capture mode (memoized by spirits reference)
  const uncapturedWords = useMemo(
    () => ALL_WORDS.filter((w) => !state.spirits[w.id]),
    [state.spirits],
  );

  // Derive mode inline — no useState/useEffect needed, always consistent with state
  const mode = useMemo((): ExploreMode => {
    if (!isLoaded || !state.hasSeenWelcome) return "idle";
    if (dueCount > 0) return "review";
    if (uncapturedWords.length > 0) return "capture";
    return "idle";
  }, [isLoaded, state.hasSeenWelcome, dueCount, uncapturedWords.length]);

  // Derive welcome visibility directly from state — no local flag needed
  const showWelcome = isLoaded && !state.hasSeenWelcome;

  // Stable ref: tracks the word currently being presented in capture mode
  const captureWordRef = useRef<WordEntry | null>(null);

  // Generate a new question when mode, reviewIndex, or answerPhase changes.
  // IMPORTANT: ENCOUNTER_WORD is NOT dispatched here — only in handleAnswer.
  // This prevents state mutations inside effects that could trigger re-renders.
  useEffect(() => {
    if (answerPhase !== "question") return;

    if (mode === "review" && dueWordIds.length > 0) {
      const wordId = dueWordIds[reviewIndex % dueWordIds.length];
      const word = getWordById(wordId);
      if (!word) return;
      const spirit = state.spirits[wordId];
      const stage = spirit?.stage ?? 1;
      captureWordRef.current = null;
      setCurrentWord(word);
      setCurrentQuestion(generateQuestion(word, ALL_WORDS, stage));
    } else if (mode === "capture" && uncapturedWords.length > 0) {
      const idx = Math.floor(Math.random() * uncapturedWords.length);
      const word = uncapturedWords[idx];
      captureWordRef.current = word;
      setCurrentWord(word);
      setCurrentQuestion(generateQuestion(word, ALL_WORDS, 1));
    }
    // Intentionally omitting dueWordIds, state.spirits, uncapturedWords, dispatch:
    // these are either stable refs or would cause spurious re-runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, reviewIndex, answerPhase]);

  const handleAnswer = useCallback(
    (isCorrect: boolean, wordId: string) => {
      setLastCorrect(isCorrect);

      if (isCorrect) {
        lightHaptic();
      } else {
        warningHaptic();
      }

      if (mode === "review") {
        dispatch({ type: "REVIEW_ANSWER", wordId, isCorrect });
      } else if (mode === "capture") {
        // Dispatch ENCOUNTER_WORD here (not in the question-generation effect)
        // to prevent state mutations during effect execution.
        dispatch({ type: "ENCOUNTER_WORD", wordId });
        if (isCorrect) {
          dispatch({ type: "CAPTURE_SPIRIT", wordId });
        }
      }

      setAnswerPhase("result");

      const delay = isCorrect ? CORRECT_ANSWER_DELAY_MS : WRONG_ANSWER_DELAY_MS;
      setTimeout(() => {
        setAnswerPhase("question");
        if (mode === "review") {
          setReviewIndex((prev) => prev + 1);
        }
      }, delay);
    },
    [mode, dispatch, lightHaptic, warningHaptic],
  );

  const handleDismissWelcome = useCallback(() => {
    dispatch({ type: "DISMISS_WELCOME" });
  }, [dispatch]);

  if (!isLoaded) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText variant="secondary">{STRINGS.loadingText}</ThemedText>
      </ThemedView>
    );
  }

  const modeTitle =
    mode === "review" ? STRINGS.reviewModeTitle : STRINGS.captureModeTitle;
  const progress =
    mode === "review" && dueCount > 0
      ? session.reviewsDone / (session.reviewsDone + dueCount)
      : 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ThemedView>
        <View style={styles.header}>
          <ThemedText size="lg" style={styles.title}>
            {mode === "idle" ? STRINGS.idleTitle : modeTitle}
          </ThemedText>
          {mode === "review" ? (
            <ProgressBar
              progress={progress}
              label={STRINGS.reviewModePrompt(
                session.reviewsDone,
                session.reviewsDone + dueCount,
              )}
              color={COLORS.accent}
            />
          ) : mode === "capture" ? (
            <ThemedText variant="secondary" size="sm">
              {STRINGS.capturedCount(session.capturesDone)}
            </ThemedText>
          ) : null}
        </View>

        <View style={styles.body}>
          {mode === "idle" && !showWelcome ? (
            <ThemedText variant="secondary" style={styles.idleText}>
              {STRINGS.idleMessage}
            </ThemedText>
          ) : null}

          {currentQuestion && currentWord && answerPhase === "question" ? (
            <QuestionCard
              question={currentQuestion}
              word={currentWord}
              onAnswer={handleAnswer}
            />
          ) : null}

          {answerPhase === "result" && currentWord ? (
            mode === "capture" ? (
              <CaptureResult
                success={lastCorrect}
                type={currentWord.type}
                posCategory={currentWord.posCategory}
                correctAnswer={currentWord.meaning}
                hint={currentWord.hint}
                word={currentWord.word}
                pos={currentWord.pos}
              />
            ) : lastCorrect ? (
              <View style={styles.center}>
                <ThemedText variant="correct" size="xl">
                  {STRINGS.correctFeedback}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.center}>
                <WrongAnswerHint
                  correctAnswer={
                    currentQuestion?.type === "selectChinese"
                      ? currentWord.meaning
                      : currentWord.word
                  }
                  hint={currentWord.hint}
                  word={currentWord.word}
                  pos={currentWord.pos}
                />
              </View>
            )
          ) : null}
        </View>

        <Modal visible={showWelcome} onClose={handleDismissWelcome}>
          <View style={styles.welcomeContent}>
            <ThemedText size="xl" style={styles.welcomeTitle}>
              {STRINGS.welcomeTitle}
            </ThemedText>
            <ThemedText variant="secondary" size="md" style={styles.welcomeSub}>
              {STRINGS.welcomeSubtitle}
            </ThemedText>
            <PressableButton
              label={STRINGS.welcomeButton}
              onPress={handleDismissWelcome}
              variant="accent"
            />
          </View>
        </Modal>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgPrimary },
  header: { paddingHorizontal: 20, paddingTop: 16, gap: 8 },
  title: { fontWeight: "700" },
  body: { flex: 1, justifyContent: "center", paddingVertical: 24 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  idleText: { textAlign: "center", paddingHorizontal: 32 },
  welcomeContent: { alignItems: "center", gap: 16 },
  welcomeTitle: { fontWeight: "700", textAlign: "center" },
  welcomeSub: { textAlign: "center" },
});
