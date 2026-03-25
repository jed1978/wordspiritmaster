import React from "react";
import { View, StyleSheet } from "react-native";
import type { SpiritType } from "@/store/types";
import { SPIRIT_TYPE_COLORS, SPIRIT_TYPE_LABELS } from "@/utils/colors";
import { ThemedText } from "@/components/ui/ThemedText";

interface TypeBadgeProps {
  readonly type: SpiritType;
}

export function TypeBadge({ type }: TypeBadgeProps): React.JSX.Element {
  const color = SPIRIT_TYPE_COLORS[type];
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: `${color}33`, borderColor: color },
      ]}
    >
      <ThemedText size="sm" style={{ color }}>
        {SPIRIT_TYPE_LABELS[type]}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
});
