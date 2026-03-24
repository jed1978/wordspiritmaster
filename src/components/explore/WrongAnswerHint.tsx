import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { THEME } from '@/utils/colors';
import { STRINGS } from '@/utils/strings';
import { ThemedText } from '@/components/ui/ThemedText';

interface WrongAnswerHintProps {
  readonly correctAnswer: string;
  readonly hint?: string;
}

export function WrongAnswerHint({
  correctAnswer,
  hint,
}: WrongAnswerHintProps): React.JSX.Element {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ThemedText variant="correct" size="lg" style={styles.answer}>
        {STRINGS.wrongAnswerPrefix}{correctAnswer}
      </ThemedText>
      {hint ? (
        <ThemedText variant="hint" size="sm" style={styles.hint}>
          {STRINGS.hintPrefix}{hint}
        </ThemedText>
      ) : null}
      <ThemedText variant="secondary" size="sm" style={styles.encourage}>
        {STRINGS.wrongFeedback}
      </ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.bgPanel,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    alignItems: 'center',
  },
  answer: { fontWeight: '700' },
  hint: { textAlign: 'center' },
  encourage: { textAlign: 'center', marginTop: 4 },
});
