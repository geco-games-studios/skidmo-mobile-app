import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { ActionButtons } from "@/components/Home/ActionButton";
import { PropertyCardScreen } from "@/components/Home/PropertyCard";
import { SearchBar } from "@/components/Home/SearchBar";

const SAMPLE_PROPERTIES = [
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 350,
    rating: 4.84,
    reviews: 19,
    rooms: 2,
    area: 44.7,
    location: "Lusaka, Sibweni Road, 16",
  },
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 350,
    rating: 4.84,
    reviews: 19,
    rooms: 2,
    area: 44.7,
    location: "Lusaka, Sibweni Road, 16",
  },
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
  {
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    price: 320,
    rating: 4.72,
    reviews: 10,
    rooms: 1,
    area: 40.2,
    location: "Lusaka, Libala South, 1",
  },
];

export default function Home() {
  const renderItem = ({ item, index }: { item: typeof SAMPLE_PROPERTIES[0]; index: number }) => (
    <PropertyCardScreen key={index} {...item} />
  );

  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <ActionButtons />
      <View style={styles.listingsContainer}>
        <Text style={styles.listingsTitle}>Recent listings</Text>
        <FlatList
          data={SAMPLE_PROPERTIES}
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
