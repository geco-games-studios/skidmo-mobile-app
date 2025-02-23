import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";


const hotels = [
  {
    id: "1",
    name: "Radisson Blu Hotel Lusaka",
    location: "Lusaka, Great East Road 19029",
    price: "K440",
    rating: 4.9,
    reviews: 1899,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/123456789.jpg", 
  },
  {
    id: "2",
    name: "Southern Sun Ridgeway Lusaka",
    location: "Lusaka, Corner Church Road & Independence Avenue",
    price: "K388",
    rating: 4.8,
    reviews: 78,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/987654321.jpg", // Replace with an actual image URL
  },
  {
    id: "2",
    name: "Southern Sun Ridgeway Lusaka",
    location: "Lusaka, Corner Church Road & Independence Avenue",
    price: "K388",
    rating: 4.8,
    reviews: 78,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/987654321.jpg", // Replace with an actual image URL
  },
  {
    id: "2",
    name: "Southern Sun Ridgeway Lusaka",
    location: "Lusaka, Corner Church Road & Independence Avenue",
    price: "K388",
    rating: 4.8,
    reviews: 78,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/987654321.jpg", // Replace with an actual image URL
  },
];

const WishlistScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity style={styles.heartIcon}>
              {/* <Icon name="heart-outline" size={24} color="green" /> */}
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>{item.price} /night</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {item.rating} ({item.reviews})</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Reserve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  infoContainer: {
    padding: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  location: {
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default WishlistScreen;
