import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { COLORS } from "@/utils/colors";
import {
  STRINGS,
  getRandomWrongFeedback,
  getGenericHint,
} from "@/utils/strings";
import { ThemedText } from "@/components/ui/ThemedText";
import { PressableButton } from "@/components/ui/PressableButton";

interface WrongAnswerHintProps {
  readonly correctAnswer: string;
  readonly hint?: string;
  readonly word?: string;
  readonly pos?: string;
  readonly onContinue?: () => void;
}

export function WrongAnswerHint({
  correctAnswer,
  hint,
  word,
  pos,
  onContinue,
}: WrongAnswerHintProps): React.JSX.Element {
  const hintText = hint ? hint : word && pos ? getGenericHint(word, pos) : null;

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ThemedText variant="correct" size="lg" style={styles.answer}>
        {STRINGS.wrongAnswerPrefix}
        {correctAnswer}
      </ThemedText>
      {hintText ? (
        <ThemedText variant="hint" size="sm" style={styles.hint}>
          {STRINGS.hintPrefix}
          {hintText}
        </ThemedText>
      ) : null}
      <ThemedText variant="secondary" size="sm" style={styles.encourage}>
        {getRandomWrongFeedback()}
      </ThemedText>
      {onContinue ? (
        <PressableButton
          label={STRINGS.continueButton}
          onPress={onContinue}
          variant="default"
          style={styles.continueBtn}
        />
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    alignItems: "center",
  },
  answer: { fontWeight: "700" },
  hint: { textAlign: "center" },
  encourage: { textAlign: "center", marginTop: 4 },
  continueBtn: { marginTop: 8, alignSelf: "stretch" },
});
