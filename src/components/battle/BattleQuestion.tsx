import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import type { ReadingQuestion } from "@/store/types";
import { COLORS } from "@/utils/colors";
import { STRINGS } from "@/utils/strings";
import { ThemedText } from "@/components/ui/ThemedText";
import { PressableButton } from "@/components/ui/PressableButton";

interface BattleQuestionProps {
  readonly question: ReadingQuestion;
  readonly onAnswer: (isCorrect: boolean) => void;
  readonly showExplanation: boolean;
}

export function BattleQuestion({
  question,
  onAnswer,
  showExplanation,
}: BattleQuestionProps): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const answered = selectedIndex !== null;
  const isCorrect = selectedIndex === question.correctIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedIndex(index);
      onAnswer(index === question.correctIndex);
    },
    [answered, onAnswer, question.correctIndex],
  );

  const getVariant = (index: number) => {
    if (!answered) return "default" as const;
    if (index === question.correctIndex) return "correct" as const;
    if (index === selectedIndex) return "wrong" as const;
    return "default" as const;
  };

  return (
    <View style={styles.container}>
      <ThemedText size="md" style={styles.questionEn}>
        {question.question}
      </ThemedText>
      <ThemedText variant="secondary" size="sm" style={styles.questionZh}>
        {question.questionZh}
      </ThemedText>

      <View style={styles.options}>
        {question.options.map((opt, i) => (
          <PressableButton
            key={i}
            label={`${opt.text}  ${opt.textZh}`}
            onPress={() => handleSelect(i)}
            variant={getVariant(i)}
            disabled={answered}
            style={styles.optionButton}
          />
        ))}
      </View>

      {showExplanation && answered && !isCorrect ? (
        <View style={styles.explanationBox}>
          <ThemedText variant="secondary" size="sm">
            {STRINGS.battleExplanation}{question.explanation}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, gap: 12 },
  questionEn: { fontWeight: "600", color: COLORS.textPrimary },
  questionZh: { marginBottom: 4 },
  options: { gap: 8 },
  optionButton: { alignItems: "flex-start" },
  explanationBox: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
  },
});
