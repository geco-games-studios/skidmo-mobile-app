import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

const LoginScreen = () => {

  
  const navigation = useNavigation();
    
  useEffect(() => {
        navigation.setOptions({ title: 'Signin' });  // Set custom title
      }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#BDBDBD" />
      <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor="#BDBDBD" keyboardType="phone-pad" />
      
      <Text style={styles.signupText}>Don't have an account? 
        <Link href="/authentication/signup" asChild>
          <Text style={styles.signupLink}>Sign up</Text>
        </Link>
      </Text>
      
      <Link href="/authentication/account" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </Link>
      
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons style={styles.socialIcon} name="mail-outline" size={20} color="black" />
        <Text style={styles.socialText}>Continue with Email</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons style={styles.socialIcon} name="logo-facebook" size={20} color="blue" />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons style={styles.socialIcon} name="logo-google" size={20} color="red" />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons style={styles.socialIcon} name="logo-apple" size={20} color="black" />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>
      
      {/* <View style={styles.bottomNav}>
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
      </View> */}
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 25,
  },
  signupText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  signupLink: {
    color: 'black',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#0AAD4D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButton: {
    flexDirection: 'row',
   
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    
    justifyContent: 'center',
    textAlign: 'center',
  },
  socialIcon: {
    position: 'absolute',
    left: 0,
    top: 10,
    marginLeft: 10,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16,
    alignItems: 'center',
    
    
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

export default LoginScreen;
