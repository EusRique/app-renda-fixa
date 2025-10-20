import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

type SelectModalProps<T> = {
  visible: boolean;
  options: { label: string; value: T }[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
  onClose: () => void;
  placeholder?: string;
  title?: string;
};

export function SelectModal<T>({
  visible,
  options,
  selectedValue,
  onSelect,
  onClose,
  placeholder = "Selecione",
  title,
}: SelectModalProps<T>) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.bottomSheet}>
        {title && <Text style={styles.title}>{title}</Text>}
        <FlatList
          data={options}
          keyExtractor={(item) => String(item.value)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                item.value === selectedValue ? styles.selectedOption : null,
              ]}
              onPress={() => {
                onSelect(item.value);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  item.value === selectedValue ? styles.selectedOptionText : null,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000055",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    maxHeight: "40%",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  option: {
    paddingVertical: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  selectedOption: {
    backgroundColor: "#e0f7fa",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "#007aff",
  },
});
