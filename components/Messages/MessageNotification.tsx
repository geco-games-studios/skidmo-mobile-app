import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from 'expo-router';

const MessagesNotification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("@/assets/container_icons/message.png")} style={styles.image} />
      </View>
      <Text style={styles.title}>Log in to see messages</Text>
      <Text style={styles.subtitle}>
        You can communicate with the vendors to find out more information
      </Text>
      <Link href="/messages/conversations" asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    backgroundColor: "#E6F4EA",
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#00A551",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MessagesNotification;
