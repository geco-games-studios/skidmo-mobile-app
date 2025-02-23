import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const listings = [
  {
    id: "1",
    price: "K320",
    rooms: "1 room, 40,2 m2",
    location: "Lusaka, Libala South, 16J",
    image: require("@/assets/appartments/1.jpg"),
    status: "active",
  },
  {
    id: "2",
    price: "K350",
    rooms: "2 rooms, 44,7 m2",
    location: "Lusaka, Sibweni Road, 16",
    image: require("@/assets/appartments/1.jpg"),
    status: "active",
  },
  {
    id: "3",
    price: "K290",
    rooms: "2 rooms, 46,2 m2",
    location: "Lusaka, Libala South, 1",
    image: require("@/assets/appartments/1.jpg"),
    status: "removed",
  },
];

const ConversationCard = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.status === "removed" && styles.removedCard]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={[styles.price, item.status === "removed" && styles.removedText]}>{item.price} /day</Text>
              <Text style={[styles.details, item.status === "removed" && styles.removedText]}>{item.rooms}</Text>
              <Text style={[styles.location, item.status === "removed" && styles.removedText]}>{item.location}</Text>
            </View>
            {item.status === "removed" && <Text style={styles.removedTag}>Removed from publication</Text>}
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  removedCard: {
    opacity: 0.5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "gray",
  },
  location: {
    fontSize: 12,
    color: "gray",
  },
  removedText: {
    color: "gray",
  },
  removedTag: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#F8D7DA",
    color: "#D8000C",
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
});

export default ConversationCard;
