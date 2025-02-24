import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const SignUpScreen = () => {


      const navigation = useNavigation();
    
      useEffect(() => {
        navigation.setOptions({ title: 'Signup' });  // Set custom title
      }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor="#aaa" keyboardType="phone-pad" />
      
      <Text style={styles.termsText}>
        By selecting Agree and continue, I agree to the Terms of service, Open source licences.
      </Text>
      <Text style={styles.linkText}>Read the terms and conditions</Text>
      
      <TouchableOpacity style={styles.agreeButton}>
        <Text style={styles.agreeText}>Agree and continue</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.authButton}>
        <Ionicons name="mail-outline" size={20} color="black" />
        <Text style={styles.authText}>Continue with Email</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.authButton}>
        <Ionicons name="logo-facebook" size={20} color="blue" />
        <Text style={styles.authText}>Continue with Facebook</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.authButton}>
        <Ionicons name="logo-google" size={20} color="red" />
        <Text style={styles.authText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.authButton}>
        <Ionicons name="logo-apple" size={20} color="black" />
        <Text style={styles.authText}>Continue with Apple</Text>
      </TouchableOpacity>
      
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="black" />
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="black" />
          <Text style={styles.navText}>Wishlists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="black" />
          <Text style={styles.navText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F1F1F1',
    padding: 20,
    borderRadius: 8,
    marginBottom: 25,
  },
  termsText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  linkText: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  agreeButton: {
    backgroundColor: '#0AAD4D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  agreeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 10,
  },
  authText: {
    fontSize: 16,
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'black',
  },
});

export default SignUpScreen;
