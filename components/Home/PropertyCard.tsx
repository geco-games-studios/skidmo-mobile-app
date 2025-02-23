import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from "react-native";
import { MapPin, Star } from "lucide-react-native";

interface PropertyCardProps {
  imageUrl: string;
  price: number;
  rating: number;
  reviews: number;
  rooms: number;
  area: number;
  location: string;
}

const { width } = Dimensions.get("window");

export function PropertyCardScreen({ imageUrl, price, rating, reviews, rooms, area, location }: PropertyCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl || "https://via.placeholder.com/150" }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.priceRatingContainer}>
          <View style={styles.ratingContainer}>
            <Star size={16} fill="#000000FF" color="#000000FF" />
            <Text style={styles.ratingText}>
              {rating} ({reviews})
            </Text>
          </View>
          <Text style={styles.priceText}>K{price}/day</Text>
        </View>
        <Text style={styles.roomsAreaText}>
          {rooms} rooms, {area} m²
        </Text>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: (width - 48) / 2, // Half the width minus margins
    marginHorizontal: 8,
    marginVertical: 8,
  },
  imageContainer: {
    aspectRatio: 4 / 3,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  priceRatingContainer: {
    flexDirection: "column", // Align price and rating vertically
    gap: 8, // Add space between price and rating
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row", // Align star and rating text horizontally
    alignItems: "center", // Center items vertically
    gap: 4, // Add space between star and rating text
  },
  ratingText: {
    fontSize: 14,
  },
  roomsAreaText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: "row", // Align icon and location text horizontally
    alignItems: "center", // Center items vertically
    gap: 4, // Add space between icon and location text
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#6B7280",
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

// Example dataset with 10 properties
const properties = [
  {
    id: "1",
    imageUrl: "https://via.placeholder.com/150",
    price: 100,
    rating: 4.5,
    reviews: 120,
    rooms: 2,
    area: 80,
    location: "New York, USA",
  },
  {
    id: "2",
    imageUrl: "https://via.placeholder.com/150",
    price: 150,
    rating: 4.7,
    reviews: 90,
    rooms: 3,
    area: 100,
    location: "Los Angeles, USA",
  },
  {
    id: "3",
    imageUrl: "https://via.placeholder.com/150",
    price: 200,
    rating: 4.2,
    reviews: 80,
    rooms: 1,
    area: 50,
    location: "Chicago, USA",
  },
  {
    id: "4",
    imageUrl: "https://via.placeholder.com/150",
    price: 120,
    rating: 4.8,
    reviews: 150,
    rooms: 2,
    area: 70,
    location: "Miami, USA",
  },
  {
    id: "5",
    imageUrl: "https://via.placeholder.com/150",
    price: 180,
    rating: 4.6,
    reviews: 110,
    rooms: 3,
    area: 90,
    location: "San Francisco, USA",
  },
  {
    id: "6",
    imageUrl: "https://via.placeholder.com/150",
    price: 90,
    rating: 4.0,
    reviews: 70,
    rooms: 1,
    area: 60,
    location: "Seattle, USA",
  },
  {
    id: "7",
    imageUrl: "https://via.placeholder.com/150",
    price: 250,
    rating: 4.9,
    reviews: 200,
    rooms: 4,
    area: 120,
    location: "Boston, USA",
  },
  {
    id: "8",
    imageUrl: "https://via.placeholder.com/150",
    price: 130,
    rating: 4.3,
    reviews: 85,
    rooms: 2,
    area: 75,
    location: "Austin, USA",
  },
  {
    id: "9",
    imageUrl: "https://via.placeholder.com/150",
    price: 160,
    rating: 4.4,
    reviews: 95,
    rooms: 3,
    area: 85,
    location: "Denver, USA",
  },
  {
    id: "10",
    imageUrl: "https://via.placeholder.com/150",
    price: 140,
    rating: 4.1,
    reviews: 75,
    rooms: 2,
    area: 65,
    location: "Portland, USA",
  },
];

export default function PropertyListScreen() {
  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id}
      numColumns={2} // Display two items per row
      renderItem={({ item }) => (
        <PropertyCardScreen
          imageUrl={item.imageUrl}
          price={item.price}
          rating={item.rating}
          reviews={item.reviews}
          rooms={item.rooms}
          area={item.area}
          location={item.location}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}