import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import type { SpiritType, PosCategory } from '@/store/types';
import { STRINGS } from '@/utils/strings';
import { ThemedText } from '@/components/ui/ThemedText';
import { SpiritImage } from '@/components/spirits/SpiritImage';
import { WrongAnswerHint } from '@/components/explore/WrongAnswerHint';

interface CaptureResultProps {
  readonly success: boolean;
  readonly type: SpiritType;
  readonly posCategory: PosCategory;
  readonly correctAnswer: string;
  readonly hint?: string;
}

export function CaptureResult({
  success,
  type,
  posCategory,
  correctAnswer,
  hint,
}: CaptureResultProps): React.JSX.Element {
  if (success) {
    return (
      <Animated.View entering={ZoomIn.duration(400)} style={styles.container}>
        <SpiritImage type={type} posCategory={posCategory} stage={1} size={120} />
        <ThemedText variant="correct" size="xl" style={styles.title}>
          {STRINGS.captureSuccess}
        </ThemedText>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ThemedText variant="wrong" size="lg" style={styles.title}>
        {STRINGS.captureFail}
      </ThemedText>
      <WrongAnswerHint correctAnswer={correctAnswer} hint={hint} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 16, padding: 16 },
  title: { fontWeight: '700' },
});
