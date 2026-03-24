import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { THEME } from '@/utils/colors';
import { ThemedText } from '@/components/ui/ThemedText';

interface ProgressBarProps {
  readonly progress: number; // 0-1
  readonly color?: string;
  readonly label?: string;
}

export function ProgressBar({
  progress,
  color = THEME.accent,
  label,
}: ProgressBarProps): React.JSX.Element {
  const clamped = Math.max(0, Math.min(1, progress));

  const fillStyle = useAnimatedStyle(() => ({
    width: withTiming(`${clamped * 100}%` as unknown as number, { duration: 300 }),
  }));

  return (
    <View style={styles.container}>
      {label ? (
        <ThemedText variant="secondary" size="sm" style={styles.label}>
          {label}
        </ThemedText>
      ) : null}
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { backgroundColor: color }, fillStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  label: { marginBottom: 4 },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.bgButton,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 4 },
});
