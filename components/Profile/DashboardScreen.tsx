import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft, Home, Search, Heart, MessageCircle, User } from 'react-native-feather';
import { Link, useNavigation, useRouter } from 'expo-router'; // Import expo-router hooks and components
import BottomNavigation from '../BottomNavigation';

const Dashboard = () => {
  const navigation = useNavigation(); // Use the useNavigation hook for navigation
  const router = useRouter(); // Use the useRouter hook for programmatic navigation

  // Set a custom title for the screen
  React.useEffect(() => {
    navigation.setOptions({ title: 'Dashboard' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft stroke="#000" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={{ width: 24 }} /> */}
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <Link href="/dashboard/mylistings" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>My listings</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/dashboard/bookings" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Bookings</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/dashboard/statistics" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Statistics</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Bottom Tab Bar */}
      {/* <BottomNavigation/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  menuItem: {
    paddingVertical: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#000',
  },
  tabLabelActive: {
    fontSize: 12,
    marginTop: 4,
    color: '#00a67e',
    fontWeight: '500',
  },
});

export default Dashboard;