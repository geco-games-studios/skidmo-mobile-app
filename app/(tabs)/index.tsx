import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { ActionButtons } from "@/components/Home/ActionButton";
import { PropertyCardScreen } from "@/components/Home/PropertyCard";
import { SearchBar } from "@/components/Home/SearchBar";

const Properties = [
  {
    image: require("@/assets/appartments/1.jpg"), 
    price: 350,
    rating: 4.84,
    reviews: 19,
    rooms: 2,
    area: 44.7,
    location: "Lusaka, Sibweni Road, 16",
  },
  {
    image: require("@/assets/appartments/2.jpg"),
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    image: require("@/assets/appartments/2.jpg"),
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    image: require("@/assets/appartments/1.jpg"),
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    image: require("@/assets/appartments/1.jpg"), 
    price: 350,
    rating: 4.84,
    reviews: 19,
    rooms: 2,
    area: 44.7,
    location: "Lusaka, Sibweni Road, 16",
  },
  {
    image: require("@/assets/appartments/2.jpg"),
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
];


export default function Home() {
  const renderItem = ({ item, index }: { item: typeof Properties[0]; index: number }) => (
    <PropertyCardScreen key={index} {...item} />
  );

  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <ActionButtons />
      <View style={styles.listingsContainer}>
        <Text style={styles.listingsTitle}>Recent listings</Text>
        <FlatList
          data={Properties}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listingsContainer: {
    paddingHorizontal: 16,
  },
  listingsTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
