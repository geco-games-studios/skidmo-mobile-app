import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Image,
  SafeAreaView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ArrowLeft, Home, Search, Heart, MessageCircle, User } from 'react-native-feather';
import { Link, useNavigation, useRouter } from 'expo-router'; // Import expo-router hooks and components

// Sample data for listings
const SAMPLE_LISTINGS = [
  {
    id: '1',
    title: '2 rooms, 46,2 m2',
    location: 'Lusaka, Libala South, 1',
    price: 'K290',
    priceUnit: '/day',
    daysLeft: 12,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20listings%20%281%29-qFBCiLZxSY8trglYW8O4ooRaMwKUvh.png', // This would be a local image in a real app
    status: 'active'
  },
  {
    id: '2',
    title: 'Southern Sun Ridgeway Lusaka',
    location: 'Lusaka, Corner Church Road & Independence Avenue',
    price: 'K388',
    priceUnit: '/night',
    daysLeft: 21,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20listings%20%281%29-qFBCiLZxSY8trglYW8O4ooRaMwKUvh.png', // This would be a local image in a real app
    status: 'active'
  },
  {
    id: '3',
    title: '2 rooms, 46,2 m2',
    location: 'Lusaka, Libala South, 1',
    price: 'K290',
    priceUnit: '/day',
    daysLeft: 0,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My%20listings%20%281%29-qFBCiLZxSY8trglYW8O4ooRaMwKUvh.png', // This would be a local image in a real app
    status: 'removed'
  }
];

const MyListingsScreen = () => {
    const [listings, setListings] = useState(SAMPLE_LISTINGS);
    const [showEmptyState, setShowEmptyState] = useState(false); // Toggle this to show empty state
    const navigation = useNavigation(); // Use the useNavigation hook for navigation
    const router = useRouter(); // Use the useRouter hook for programmatic navigation
  
    // Set a custom title for the screen
    React.useEffect(() => {
      navigation.setOptions({ title: 'My Listing' });
    }, [navigation]);
  
    // Handle the back button press
    const handleGoBack = () => {
      router.back();
    };
  

  const renderListingItem = ({ item }) => (
    <View style={styles.listingItem}>
      {item.status === 'active' ? (
        <View style={styles.daysLeftBadge}>
          <Text style={styles.daysLeftText}>There are {item.daysLeft} days left</Text>
        </View>
      ) : (
        <View style={styles.removedBadge}>
          <Text style={styles.removedText}>Removed from publication</Text>
        </View>
      )}
      
      <View style={styles.listingContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.listingImage}
          resizeMode="cover"
        />
        
        <View style={styles.listingDetails}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.priceUnit}>{item.priceUnit}</Text>
          </View>
          
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit-2" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateIconContainer}>
        <Feather name="folder" size={50} color="#22c55e" />
      </View>
      
      <Text style={styles.emptyStateTitle}>You don't have any ads posted yet</Text>
      <Text style={styles.emptyStateSubtitle}>Your published ads will be stored here</Text>
      

    <Link href="/Listings/index" asChild>
    <TouchableOpacity 
        style={styles.listButton}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.listButtonText}>List</Text>
      </TouchableOpacity>
    </Link>

      
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My listings</Text>
      </View>
      
      {!showEmptyState && (
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={16} color="#fff" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      )}
      
      {showEmptyState ? (
        <EmptyState />
      ) : (
        <FlatList
          data={listings}
          renderItem={renderListingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      
       <View style={styles.tabBar}>
              <Link href="/" asChild>
                <TouchableOpacity style={styles.tabItem}>
                  <Home stroke="#000" width={24} height={24} />
                  <Text style={styles.tabLabel}>Home</Text>
                </TouchableOpacity>
              </Link>
      
              <Link href="/explore" asChild>
                <TouchableOpacity style={styles.tabItem}>
                  <Search stroke="#000" width={24} height={24} />
                  <Text style={styles.tabLabel}>Explore</Text>
                </TouchableOpacity>
              </Link>
      
              <Link href="/wishlists" asChild>
                <TouchableOpacity style={styles.tabItem}>
                  <Heart stroke="#000" width={24} height={24} />
                  <Text style={styles.tabLabel}>Wishlists</Text>
                </TouchableOpacity>
              </Link>
      
              <Link href="/messages" asChild>
                <TouchableOpacity style={styles.tabItem}>
                  <MessageCircle stroke="#000" width={24} height={24} />
                  <Text style={styles.tabLabel}>Messages</Text>
                </TouchableOpacity>
              </Link>
      
             <Link href="/authentication/account" asChild>
                       <TouchableOpacity style={styles.tabItem}>
                         <User stroke="#00a67e" width={24} height={24} />
                         <Text style={styles.tabLabelActive}>Account</Text>
                       </TouchableOpacity>
              </Link>
            </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 16,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  filterButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  listingItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  daysLeftBadge: {
    backgroundColor: '#FFF3CD',
    padding: 8,
  },
  daysLeftText: {
    color: '#856404',
    fontSize: 14,
  },
  removedBadge: {
    backgroundColor: '#FFEBEE',
    padding: 8,
  },
  removedText: {
    color: '#C62828',
    fontSize: 14,
  },
  listingContent: {
    flexDirection: 'row',
    padding: 12,
  },
  listingImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  listingDetails: {
    flex: 1,
    marginLeft: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  title: {
    fontSize: 14,
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyStateIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  listButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    color: '#22c55e',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#22c55e',
  },
});

export default MyListingsScreen;