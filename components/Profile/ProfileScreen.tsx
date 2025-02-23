import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
  }

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>Alevtina</Text>
            <Text style={styles.phone}>+7 909 686 73 45</Text>
          </View>
        </View>
        <Link href="/authentication/editprofile" asChild>
        <Ionicons name="chevron-forward" size={24} color="black" />
        </Link>
      </View>
      
      <TouchableOpacity style={styles.listButton}>
        <Text style={styles.listButtonText}>+ List</Text>
      </TouchableOpacity>
      
      <View style={styles.menu}>
        <MenuItem icon="list" text="My listings" />
        <MenuItem icon="heart-outline" text="Booking history" />
        <MenuItem icon="card-outline" text="Payment methods" />
        <MenuItem icon="help-circle-outline" text="Get help" />
        <MenuItem icon="settings-outline" text="Settings" />
        <MenuItem icon="log-out-outline" text="Log out" />
      </View>
    </View>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, text }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="black" style={styles.icon} />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  profileInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { fontSize: 14, color: 'gray' },
  listButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  listButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  menu: { marginTop: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: { marginRight: 10 },
  menuText: { fontSize: 16 },
});

export default AccountScreen;
