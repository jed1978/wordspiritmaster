import React from "react";
import { Modal as RNModal, View, Pressable, StyleSheet } from "react-native";
import { COLORS } from "@/utils/colors";

interface ModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

export function Modal({
  visible,
  onClose,
  children,
}: ModalProps): React.JSX.Element {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 360,
    maxHeight: "80%",
  },
});
