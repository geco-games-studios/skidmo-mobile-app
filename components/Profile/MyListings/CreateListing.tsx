// MyListingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { ArrowLeft, Home, Search, Heart, MessageCircle, User, Plus } from 'react-native-feather';
import { Link, useNavigation, useRouter } from 'expo-router'; // Import expo-router hooks and components

const CreateListing = () => {
      const navigation = useNavigation(); // Use the useNavigation hook for navigation
      const router = useRouter(); // Use the useRouter hook for programmatic navigation
    
      // Set a custom title for the screen
      React.useEffect(() => {
        navigation.setOptions({ title: 'Create Listing' });
      }, [navigation]);
    
      // Handle the back button press
      const handleGoBack = () => {
        router.back();
      };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#000" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My listings</Text>
        <View style={{ width: 24 }} /> */}
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.folderIcon}>
            {/* Simple folder icon using View components */}
            <View style={styles.folderBase} />
            <View style={styles.folderFlap} />
            <View style={styles.folderLines}>
              <View style={styles.line} />
              <View style={styles.line} />
              <View style={styles.line} />
            </View>
          </View>
        </View>
        <Text style={styles.emptyTitle}>You don't have any ads posted yet</Text>
        <Text style={styles.emptySubtitle}>Your published ads will be stored here</Text>
        
        <Link href="/Listings" asChild>
        <TouchableOpacity style={styles.listButton}>
          <Plus stroke="#fff" width={20} height={20} />
          <Text style={styles.listButtonText}>List</Text>
        </TouchableOpacity>
        </Link>
      </View>

      {/* Bottom Tab Bar */}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e6f7e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  folderIcon: {
    width: 60,
    height: 50,
    position: 'relative',
  },
  folderBase: {
    position: 'absolute',
    bottom: 0,
    width: 60,
    height: 40,
    backgroundColor: '#0AAD4D',
    borderRadius: 4,
  },
  folderFlap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 15,
    backgroundColor: '#0AAD4D',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  folderLines: {
    position: 'absolute',
    top: 20,
    left: 15,
    width: 30,
    height: 15,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0AAD4D',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  listButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
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

export default CreateListing;