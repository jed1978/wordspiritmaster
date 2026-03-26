import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { Question, WordEntry } from "@/store/types";
import { SPIRIT_TYPE_COLORS } from "@/utils/colors";
import { SpiritImage } from "@/components/spirits/SpiritImage";
import { PressableButton } from "@/components/ui/PressableButton";
import { ThemedText } from "@/components/ui/ThemedText";
import { WrongAnswerHint } from "@/components/explore/WrongAnswerHint";

type AnswerState = "waiting" | "correct" | "wrong";

interface QuestionCardProps {
  readonly question: Question;
  readonly word: WordEntry;
  readonly onAnswer: (isCorrect: boolean, wordId: string) => void;
}

export function QuestionCard({
  question,
  word,
  onAnswer,
}: QuestionCardProps): React.JSX.Element {
  const [answerState, setAnswerState] = useState<AnswerState>("waiting");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const spiritScale = useSharedValue(1);
  const spiritTranslateX = useSharedValue(0);

  const spiritAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: spiritScale.value },
      { translateX: spiritTranslateX.value },
    ],
  }));

  const handleSelect = useCallback(
    (index: number) => {
      if (answerState !== "waiting") return;

      setSelectedIndex(index);
      const isCorrect = index === question.correctIndex;

      if (isCorrect) {
        setAnswerState("correct");
        spiritScale.value = withSpring(1.2, { damping: 8 }, () => {
          spiritScale.value = withSpring(1, { damping: 10 });
        });
      } else {
        setAnswerState("wrong");
        spiritTranslateX.value = withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
          withTiming(0, { duration: 50 }),
        );
      }

      onAnswer(isCorrect, question.wordId);
    },
    [answerState, question, onAnswer, spiritScale, spiritTranslateX],
  );

  const glowColor = SPIRIT_TYPE_COLORS[question.spiritType];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.spiritArea, { shadowColor: glowColor }, spiritAnimStyle]}
      >
        <View
          style={[styles.spiritPlate, { backgroundColor: glowColor + "26" }]}
        >
          <SpiritImage
            type={question.spiritType}
            posCategory={question.posCategory}
            stage={question.stage}
            size={210}
          />
        </View>
      </Animated.View>

      <ThemedText size="xl" style={styles.prompt}>
        {question.prompt}
      </ThemedText>

      <View style={styles.options}>
        {question.options.map((option, i) => {
          let variant: "default" | "correct" | "wrong" = "default";
          if (answerState !== "waiting") {
            if (i === question.correctIndex) variant = "correct";
            else if (i === selectedIndex) variant = "wrong";
          }

          return (
            <PressableButton
              key={`${question.wordId}-${i}`}
              label={option}
              onPress={() => handleSelect(i)}
              variant={variant}
              disabled={answerState !== "waiting"}
              style={styles.optionButton}
            />
          );
        })}
      </View>

      {answerState === "wrong" ? (
        <WrongAnswerHint
          correctAnswer={
            question.type === "selectChinese" ? word.meaning : word.word
          }
          hint={word.hint}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16, alignItems: "center", paddingHorizontal: 16 },
  spiritArea: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 12,
  },
  spiritPlate: {
    width: 270,
    height: 270,
    borderRadius: 135,
    justifyContent: "center",
    alignItems: "center",
  },
  prompt: { fontWeight: "700", textAlign: "center" },
  options: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  optionButton: { flex: 1, minWidth: "45%", paddingVertical: 8, minHeight: 48 },
});
