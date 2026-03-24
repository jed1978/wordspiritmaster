import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { THEME } from '@/utils/colors';

interface ThemedViewProps extends ViewProps {
  readonly variant?: 'primary' | 'panel';
}

export function ThemedView({
  variant = 'primary',
  style,
  ...props
}: ThemedViewProps): React.JSX.Element {
  return (
    <View
      style={[
        variant === 'primary' ? styles.primary : styles.panel,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  primary: { backgroundColor: THEME.bgPrimary, flex: 1 },
  panel: { backgroundColor: THEME.bgPanel, borderRadius: 12, padding: 16 },
});
