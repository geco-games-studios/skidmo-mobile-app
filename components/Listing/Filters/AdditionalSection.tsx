import type React from "react"
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SectionHeader from "./UI/SectionHeader"

interface AdditionalSectionProps {
  additionalInfo: string
  onAdditionalInfoChange: (text: string) => void
}

const AdditionalSection: React.FC<AdditionalSectionProps> = ({ additionalInfo, onAdditionalInfoChange }) => {
  return (
    <View style={styles.section}>
      <SectionHeader title="Additional" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={additionalInfo}
          onChangeText={onAdditionalInfoChange}
          placeholder="Info"
          multiline
        />
        <TouchableOpacity style={styles.clearButton} onPress={() => onAdditionalInfoChange("")}>
          <Ionicons name="close" size={16} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
  },
})

export default AdditionalSection

