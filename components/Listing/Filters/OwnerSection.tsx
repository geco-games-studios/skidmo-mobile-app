import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SectionHeader from "./UI/SectionHeader"

interface OwnerSectionProps {
  onAddOwnership: () => void
  onAddCertificate: () => void
}

const OwnerSection: React.FC<OwnerSectionProps> = ({ onAddOwnership, onAddCertificate }) => {
  return (
    <View style={styles.section}>
      <SectionHeader title="Owner" />
      <TouchableOpacity style={styles.ownerButton} onPress={onAddOwnership}>
        <Ionicons name="add" size={20} color="#4CAF50" />
        <Text style={styles.ownerButtonText}>Add proof of ownership</Text>
      </TouchableOpacity>
      <View style={styles.agentRow}>
        <View style={styles.agentCheckmark}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        </View>
        <Text style={styles.agentText}>Agent</Text>
      </View>
      <TouchableOpacity style={styles.ownerButton} onPress={onAddCertificate}>
        <Ionicons name="add" size={20} color="#4CAF50" />
        <Text style={styles.ownerButtonText}>Add place of specific certificate</Text>
      </TouchableOpacity>
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
  ownerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
  },
  ownerButtonText: {
    fontSize: 14,
    color: "#4CAF50",
    marginLeft: 8,
  },
  agentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  agentCheckmark: {
    marginRight: 8,
  },
  agentText: {
    fontSize: 14,
    color: "#333",
  },
})

export default OwnerSection

