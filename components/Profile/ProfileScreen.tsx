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
  const navigation = useNavigation()
  const router = useRouter()

  useEffect(() => {
    navigation.setOptions({ title: "Profile" })

    const fetchUserData = async () => {
      try {
          const userId = await AsyncStorage.getItem('user_id');
          if (userId) {
              const userData = await ownerAPI.getUserInfo(userId);
              setUser(userData);
          }
      } catch (error) {
          console.error('Error fetching user profile:', error);
      } finally {
          // Set loading to false regardless of success or failure
          setLoading(false);
      }
    };

    fetchUserData();
  }, [navigation])

  const handleLogout = async () => {
    try {
      await ownerAPI.logout()
      // Navigate to login screen or wherever appropriate
      // This depends on your navigation setup
    } catch (error) {
      console.error("Error logging out:", error)
      Alert.alert("Error", "Failed to log out")
    }
  }

  const handleListProperty = () => {
    setModalVisible(true)
  }

  const handleProceed = () => {
    setModalVisible(false)
    // Navigate to edit profile page
    router.push("/authentication/edit")
  }

  const handleClickProceed = () => {
    setModalVisible(false)
    // Navigate to verification screen
    router.push("/authentication/verification")
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
            {/* <Text style={styles.phone}>{user?.phone_number || user?.email || ""}</Text> */}
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
        <MenuItem icon="list" text="Dashboard" />
        <MenuItem icon="heart-outline" text="Booking history" />
        <MenuItem icon="card-outline" text="Payment methods" />
        <MenuItem icon="help-circle-outline" text="Get help" />
        <MenuItem icon="settings-outline" text="Settings" />
        <MenuItem icon="log-out-outline" text="Log out" onPress={handleLogout} />
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