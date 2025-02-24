import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
// import { Home, Lamp } from "lucide-react-native"
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function ActionButtons() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          {/* <Lamp style={styles.icon} /> */}
          <MaterialCommunityIcons name="lamp-outline" size={24} color="#16a34a" />
        </View>
        <Text style={styles.buttonText}>Rent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          {/* <Home style={styles.icon} /> */}
          <Feather name="home" size={24} color="#16a34a" />
        </View>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: "#f0fdf4",
    padding: 16,
  },
  iconContainer: {
    borderRadius: 9999,
    backgroundColor: "#dcfce7",
    padding: 12,
  },
  icon: {
    width: 24,
    height: 24,
    color: "#16a34a",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
})

