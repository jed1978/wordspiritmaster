import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "@/utils/colors";
import { ThemedText } from "@/components/ui/ThemedText";

interface ReviewBadgeProps {
  readonly count: number;
}

export function ReviewBadge({
  count,
}: ReviewBadgeProps): React.JSX.Element | null {
  if (count <= 0) return null;

  return (
    <View style={styles.badge}>
      <ThemedText size="sm" style={styles.text}>
        {count > 99 ? "99+" : String(count)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.wrong,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  text: { color: COLORS.textWhite, fontWeight: "700", fontSize: 11 },
});
