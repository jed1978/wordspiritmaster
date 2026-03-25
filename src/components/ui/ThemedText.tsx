import React from "react";
import { Text, type TextProps, StyleSheet, Platform } from "react-native";
import { COLORS } from "@/utils/colors";

type TextVariant = "primary" | "secondary" | "hint" | "correct" | "wrong";

interface ThemedTextProps extends TextProps {
  readonly variant?: TextVariant;
  readonly size?: "sm" | "md" | "lg" | "xl";
}

const VARIANT_COLORS: Record<TextVariant, string> = {
  primary: COLORS.textPrimary,
  secondary: COLORS.textSecondary,
  hint: COLORS.textHint,
  correct: COLORS.correct,
  wrong: COLORS.wrong,
};

const SIZE_MAP: Record<string, number> = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
};

// CJK characters need generous lineHeight; Android also needs includeFontPadding:false
const LINE_HEIGHT_MAP: Record<string, number> = {
  sm: 22,
  md: 28,
  lg: 34,
  xl: 48,
};

export function ThemedText({
  variant = "primary",
  size = "md",
  style,
  ...props
}: ThemedTextProps): React.JSX.Element {
  return (
    <Text
      style={[
        {
          color: VARIANT_COLORS[variant],
          fontSize: SIZE_MAP[size],
          lineHeight: LINE_HEIGHT_MAP[size],
          // Android: remove hidden font padding that pushes CJK chars up into clip zone
          includeFontPadding: false,
        },
        style,
      ]}
      {...props}
    />
  );
}
