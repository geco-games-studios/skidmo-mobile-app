import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ownerAPI } from '@/services/api'; // Adjust the import path as needed

interface UserData {
  id?: number;
  username: string;
  email: string;
  phone_number?: string;
}

const EditProfileScreen = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Edit Account' }); // Set custom title
  }, [navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Step 1: Get user_id from AsyncStorage
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (!storedUserId) {
          throw new Error('User ID not found');
        }
        setUserId(storedUserId);

        // Step 2: Fetch user data using the user_id
        const userData = await ownerAPI.getUserInfo(storedUserId); // Pass user_id to the API
        setUser(userData);
        setName(userData.username);
        setPhone(userData.phone_number || '');
        setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.username?.charAt(0) || 'U'}</Text>
        </View>
      </View>

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Phone number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="black" />
        <Text style={styles.deleteText}>Delete account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="black" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  deleteText: { marginLeft: 10, fontSize: 16, color: 'black' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: { marginLeft: 10, fontSize: 16, color: 'black' },
});

export default EditProfileScreen;