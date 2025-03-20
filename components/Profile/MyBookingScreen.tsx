import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { ArrowLeft, Home, Search, Heart, MessageCircle, User } from 'react-native-feather';
import { Link, useNavigation, useRouter } from 'expo-router'; // Import expo-router hooks and components
import BottomNavigation from '../BottomNavigation';

const BOOKINGS_DATA = [
  {
    id: '1',
    name: 'Anna',
    dateRange: '12/02/2025-15/02/2025',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bookings-epuFwtddZYnMrK8vUBUSFMAHJfcEfL.png', // Replace with actual property image URL
  },
  {
    id: '2',
    name: 'David',
    dateRange: '07/03/2025-12/03/2025',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bookings-epuFwtddZYnMrK8vUBUSFMAHJfcEfL.png', // Replace with actual property image URL
  },
  {
    id: '3',
    name: 'Martin',
    dateRange: '13/03/2025-21/03/2025',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bookings-epuFwtddZYnMrK8vUBUSFMAHJfcEfL.png', // Replace with actual property image URL
  },
];

const MyBookingsScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook for navigation
  const router = useRouter(); // Use the useRouter hook for programmatic navigation

  // Set a custom title for the screen
  React.useEffect(() => {
    navigation.setOptions({ title: 'Bookings' });
  }, [navigation]);

  // Handle the back button press
  const handleGoBack = () => {
    router.back();
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Image source={{ uri: item.image }} style={styles.bookingImage} />
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingName}>{item.name}</Text>
        <Text style={styles.bookingDate}>{item.dateRange}</Text>
      </View>
      <TouchableOpacity style={styles.messageButton}>
        <MessageCircle stroke="#000" width={24} height={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft stroke="#000" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={{ width: 24 }} /> */}
      </View>

      {/* Bookings List */}
      <FlatList
        data={BOOKINGS_DATA}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

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
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bookingImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
  },
  messageButton: {
    padding: 8,
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

export default MyBookingsScreen;