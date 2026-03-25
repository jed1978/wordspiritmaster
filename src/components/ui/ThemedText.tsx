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

// CJK characters need ~1.5× lineHeight; Android needs includeFontPadding:false
const LINE_HEIGHT_MAP: Record<string, number> = {
  sm: 18,
  md: 24,
  lg: 30,
  xl: 42,
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
          includeFontPadding: false,
          textAlignVertical: "center",
        },
        style,
      ]}
      {...props}
    />
  );
}
