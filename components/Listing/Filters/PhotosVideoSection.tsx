import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import SectionHeader from "./UI/SectionHeader"

interface PhotosVideoSectionProps {
  onAddPhotos: () => void
  onAddVideo: () => void
}

const PhotosVideoSection: React.FC<PhotosVideoSectionProps> = ({ onAddPhotos, onAddVideo }) => {
  return (
    <View style={styles.section}>
      <SectionHeader title="Photos/video" />
      <TouchableOpacity style={styles.addButton} onPress={onAddPhotos}>
        <Ionicons name="add" size={20} color="#4CAF50" />
        <Text style={styles.addButtonText}>Add photos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={onAddVideo}>
        <Ionicons name="add" size={20} color="#4CAF50" />
        <Text style={styles.addButtonText}>Add video</Text>
      </TouchableOpacity>
      <Text style={styles.helperText}>You can add up to 50 photos and 1 video</Text>
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: "#4CAF50",
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
})

export default PhotosVideoSection

