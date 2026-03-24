import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { SpiritStage } from '@/store/types';
import { THEME } from '@/utils/colors';

interface EvolutionDotsProps {
  readonly stage: SpiritStage;
}

const TOTAL_DOTS = 5;
const MASTERED_COLOR = '#fbbf24'; // gold

export function EvolutionDots({ stage }: EvolutionDotsProps): React.JSX.Element {
  const isMastered = stage === 6;

  return (
    <View style={styles.container}>
      {Array.from({ length: TOTAL_DOTS }, (_, i) => {
        const isLit = isMastered || i < stage;
        const color = isMastered
          ? MASTERED_COLOR
          : isLit
            ? THEME.accent
            : THEME.bgButtonBorder;
        return <View key={i} style={[styles.dot, { backgroundColor: color }]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 4, justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
