import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ownerAPI } from '@/services/api';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation();
  const router = useRouter();
    
  useEffect(() => {
    navigation.setOptions({ title: 'Signin' });  // Set custom title
    
    // Check if user is already logged in
    const checkAuth = async () => {
      const isAuthenticated = await ownerAPI.isAuthenticated();
      if (isAuthenticated) {
        router.push('/authentication/account');
      }
    };
    
    checkAuth();
  }, [navigation, router]);

  const handleLogin = async () => {
    // Basic validation
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    try {
      // Make login request using ownerAPI service
      const data = await ownerAPI.login(username, password);
      
      // Store tokens in AsyncStorage
      if (data.access && data.refresh) {
        await AsyncStorage.setItem('access_token', data.access);
        await AsyncStorage.setItem('refresh_token', data.refresh);
        
        // Set global access token for axios interceptors
        (global as any).access_token = data.access;
        
        // Navigate to account page
        router.push('/authentication/account');
      } else {
        Alert.alert('Login Error', 'Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Error', 
        'Failed to login. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Social login handlers
  const handleSocialLogin = (provider: string) => {
    Alert.alert('Info', `${provider} login not implemented yet`);
    // Here you would implement the specific social login logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#BDBDBD"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#BDBDBD" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Link href="/authentication/signup" asChild>
          <Text style={styles.signupLink}>Sign up</Text>
        </Link>
      </Text>
      
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.continueText}>Continue</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.socialButton}
        onPress={() => handleSocialLogin('Email')}
      >
        <Ionicons style={styles.socialIcon} name="mail-outline" size={20} color="black" />
        <Text style={styles.socialText}>Continue with Email</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.socialButton}
        onPress={() => handleSocialLogin('Facebook')}
      >
        <Ionicons style={styles.socialIcon} name="logo-facebook" size={20} color="blue" />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.socialButton}
        onPress={() => handleSocialLogin('Google')}
      >
        <Ionicons style={styles.socialIcon} name="logo-google" size={20} color="red" />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.socialButton}
        onPress={() => handleSocialLogin('Apple')}
      >
        <Ionicons style={styles.socialIcon} name="logo-apple" size={20} color="black" />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>
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
});

export default LoginScreen;