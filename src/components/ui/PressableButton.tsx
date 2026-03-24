import React, { useCallback } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { THEME } from '@/utils/colors';
import { ThemedText } from '@/components/ui/ThemedText';

type ButtonVariant = 'default' | 'correct' | 'wrong' | 'accent';

interface PressableButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: ButtonVariant;
  readonly disabled?: boolean;
  readonly style?: ViewStyle;
}

const VARIANT_BG: Record<ButtonVariant, string> = {
  default: THEME.bgButton,
  correct: THEME.correct,
  wrong: THEME.wrong,
  accent: THEME.accent,
};

const VARIANT_BORDER: Record<ButtonVariant, string> = {
  default: THEME.bgButtonBorder,
  correct: THEME.correct,
  wrong: THEME.wrong,
  accent: THEME.accent,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressableButton({
  label,
  onPress,
  variant = 'default',
  disabled = false,
  style,
}: PressableButtonProps): React.JSX.Element {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(0.95, { duration: 100 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1, { duration: 100 });
  }, [scale]);

  const textVariant = variant === 'default' ? 'primary' : 'primary';

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: VARIANT_BG[variant],
          borderColor: VARIANT_BORDER[variant],
          opacity: disabled ? 0.5 : 1,
        },
        animatedStyle,
        style,
      ]}
    >
      <ThemedText variant={textVariant} size="md" style={styles.label}>
        {label}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: { textAlign: 'center', fontWeight: '600' },
});
