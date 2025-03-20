import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'

interface BankStatementCardProps {
  onUploadComplete: (photo: string) => void
}

const BankStatementCard = ({ onUploadComplete }: BankStatementCardProps) => {
  const [permissionsRequested, setPermissionsRequested] = useState(false)

  const requestPermissions = async () => {
    if (!permissionsRequested) {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
        Alert.alert(
          "Permissions Required",
          "Please grant camera and photo library permissions to upload your bank statement.",
          [{ text: "OK" }]
        )
      }
      
      setPermissionsRequested(true)
    }
  }

  const takePhoto = async () => {
    await requestPermissions()
    
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const photoUri = result.assets[0].uri
        onUploadComplete(photoUri)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo. Please try again.")
      console.error("Error taking photo:", error)
    }
  }

  const pickImage = async () => {
    await requestPermissions()
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const photoUri = result.assets[0].uri
        onUploadComplete(photoUri)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image. Please try again.")
      console.error("Error selecting image:", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Bank Statement</Text>
      <Text style={styles.subtitle}>Please upload a clear photo of your bank statement</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
          <View style={styles.iconContainer}>
            <Ionicons name="camera" size={24} color="green" />
          </View>
          <Text style={styles.optionText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
          <View style={styles.iconContainer}>
            <Ionicons name="image" size={24} color="green" />
          </View>
          <Text style={styles.optionText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips for good photos:</Text>
        <Text style={styles.tipItem}>• Make sure all text is clearly visible</Text>
        <Text style={styles.tipItem}>• Ensure your name and address are visible</Text>
        <Text style={styles.tipItem}>• Statement should be less than 3 months old</Text>
        <Text style={styles.tipItem}>• Avoid glare or shadows</Text>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  optionButton: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f9f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  tipsContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
})

export default BankStatementCard