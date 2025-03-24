"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Link, useNavigation, useRouter } from "expo-router"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ownerAPI } from "@/services/api" // Adjust path as needed

interface UserData {
  id?: number
  username: string
  email: string
  user_type?: string
  phone_number?: string
  profile_picture?: string | null
}

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap
  text: string
  onPress?: () => void
}


const ProfileScreen = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [isVerified, setIsVerified] = useState(false) // Track verification status
  const navigation = useNavigation()
  const router = useRouter()

  useEffect(() => {
    navigation.setOptions({ title: "Profile" })

    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id')
        const verifiedStatus = await AsyncStorage.getItem('is_verified') // Retrieve verification status

        if (verifiedStatus) {
          setIsVerified(verifiedStatus === 'true') // Convert string to boolean
        }

        if (userId) {
          const userData = await ownerAPI.getUserInfo(userId)
          setUser(userData)

          // If verified, redirect to the list screen
          if (isVerified) {
            router.push("/Listings") // Adjust the route as needed
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        Alert.alert("Error", "Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigation, router, isVerified]) // Add isVerified as a dependency

  const handleListProperty = () => {
    console.log("List Property button pressed. isVerified:", isVerified); // Debugging output
  
    if (isVerified) {
      // If verified, redirect to the list screen
      console.log("User is verified. Redirecting to Listings..."); // Debugging output
      router.push("/Listings"); // Adjust the route as needed
    } else {
      // If not verified, show the modal
      console.log("User is not verified. Showing modal..."); // Debugging output
      setModalVisible(true);
    }
  };

  const handleProceed = () => {
    setModalVisible(false)
    router.push("/authentication/edit") // Navigate to edit profile
  }

  const handleClickProceed = () => {
    setModalVisible(false)
    router.push("/authentication/verification") // Navigate to verification
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user?.user_type || "No User"}</Text>
            <Text style={styles.name}>{user?.username || "No User"}</Text>
          </View>
        </View>
        <Link href="/authentication/edit" asChild>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity style={styles.listButton} onPress={handleListProperty}>
        <Text style={styles.listButtonText}>+ List Property</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>You're one step away</Text>
            <Text style={styles.modalText}>
              Before listing your property on Skidmo, please complete your profile and verify your identity.
            </Text>
            <TouchableOpacity style={styles.proceedButton} onPress={handleClickProceed}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.menu}>
        <MenuItem icon="list" text="Dashboard" onPress={() => router.push("/dashboard")} />
        <MenuItem icon="heart-outline" text="Booking history" onPress={() => router.push("/dashboard/bookings")} />
        <MenuItem icon="card-outline" text="Payment methods" onPress={() => Alert.alert("Info", "Feature coming soon")} />
        <MenuItem icon="help-circle-outline" text="Get help" onPress={() => Alert.alert("Info", "Feature coming soon")} />
        <MenuItem icon="settings-outline" text="Settings" onPress={() => Alert.alert("Info", "Feature coming soon")} />
        <MenuItem icon="log-out-outline" text="Log out"/>
      </View>
    </View>
  )
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="black" style={styles.icon} />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "gray",
  },
  listButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  listButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  menu: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  proceedButton: {
    backgroundColor: 'green',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ProfileScreen