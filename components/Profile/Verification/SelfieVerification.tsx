import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'

interface SelfieCardProps {
  onUploadComplete: (photo: string) => void
}

const SelfieCard = ({ onUploadComplete }: SelfieCardProps) => {
  const [permissionsRequested, setPermissionsRequested] = useState(false)

  const requestPermissions = async () => {
    if (!permissionsRequested) {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
      
      if (!cameraPermission.granted) {
        Alert.alert(
          "Camera Permission Required",
          "Please grant camera permission to take a selfie for verification.",
          [{ text: "OK" }]
        )
      }
      
      setPermissionsRequested(true)
    }
  }

  const takeSelfie = async () => {
    await requestPermissions()
    
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        cameraType: ImagePicker.CameraType.front,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const photoUri = result.assets[0].uri
        onUploadComplete(photoUri)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take selfie. Please try again.")
      console.error("Error taking selfie:", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selfie Verification</Text>
      <Text style={styles.subtitle}>Take a selfie with your identity document visible</Text>
      
      <TouchableOpacity style={styles.selfieButton} onPress={takeSelfie}>
        <View style={styles.iconContainer}>
          <Ionicons name="camera" size={32} color="green" />
        </View>
        <Text style={styles.selfieText}>Take Selfie</Text>
      </TouchableOpacity>
      
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <View style={styles.instruction}>
          <Ionicons name="checkmark-circle" size={16} color="green" style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Hold your identity document next to your face</Text>
        </View>
        <View style={styles.instruction}>
          <Ionicons name="checkmark-circle" size={16} color="green" style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Ensure your face and document are clearly visible</Text>
        </View>
        <View style={styles.instruction}>
          <Ionicons name="checkmark-circle" size={16} color="green" style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Make sure you're in a well-lit environment</Text>
        </View>
        <View style={styles.instruction}>
          <Ionicons name="checkmark-circle" size={16} color="green" style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Remove glasses and hats</Text>
        </View>
        <View style={styles.instruction}>
          <Ionicons name="checkmark-circle" size={16} color="green" style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Look directly at the camera</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  selfieButton: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f9f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selfieText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  instructionsContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  instruction: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  instructionIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  instructionText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
})

export default SelfieCard