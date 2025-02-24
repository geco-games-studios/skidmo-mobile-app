import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from "react-native";
// import { MapPin, Star } from "lucide-react-native";

interface PropertyCardProps {
  image: string | number; // ✅ Allow local images (require()) too
  price: number;
  rating: number;
  reviews: number;
  rooms: number;
  area: number;
  location: string;
}


const { width } = Dimensions.get("window");

export function PropertyCardScreen({ image, price, rating, reviews, rooms, area, location }: PropertyCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
      <Image
        source={
          image
            ? (typeof image === "string"
                ? { uri: image } 
                : image) 
            : require("@/assets/placeholder/1.png") 
        }
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.priceRatingContainer}>
          <View style={styles.ratingContainer}>
            {/* <Star size={16} fill="#000000FF" color="#000000FF" /> */}
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
          {/* <MapPin size={16} color="#6B7280" /> */}
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

