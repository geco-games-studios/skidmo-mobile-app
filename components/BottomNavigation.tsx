import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router'; // Assuming you're using Expo Router
import { AntDesign, Feather, EvilIcons } from '@expo/vector-icons'; // Import the icons

const BottomNavigation = () => {
  return (
    <View style={styles.tabBar}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <AntDesign name="home" size={24} color="#000" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/explore" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <AntDesign name="search1" size={24} color="#000" />
          <Text style={styles.tabLabel}>Explore</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/wishlists" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <AntDesign name="hearto" size={24} color="#000" />
          <Text style={styles.tabLabel}>Wishlists</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/messages" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="message-circle" size={24} color="#000" />
          <Text style={styles.tabLabel}>Messages</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <EvilIcons name="user" size={24} color="#00a67e" />
          <Text style={styles.tabLabelActive}>Profile</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    position: Platform.OS === 'ios' ? 'absolute' : 'relative', // Adjust for iOS
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
  },
  tabLabelActive: {
    fontSize: 12,
    color: '#00a67e',
    marginTop: 4,
  },
});

export default BottomNavigation;