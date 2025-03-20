"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { Ionicons, Feather } from "@expo/vector-icons"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { StatusBar } from "expo-status-bar"

import { propertyListings } from "@/types/propertyData"
import PropertyCard from "@/components/Explore/PropertyCard"
// import SearchHeader from "@/components/Explore/SearchHeader"

const { width, height } = Dimensions.get("window")

export default function ExploreScreen() {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const bottomSheetRef = useRef(null)

  const snapPoints = isFullScreen ? ["25%", "50%", "90%"] : ["25%", "50%"]

  const handleMarkerPress = (property) => {
    setSelectedProperty(property)
    setIsBottomSheetVisible(true)
    bottomSheetRef.current?.snapToIndex(0)
  }

  const handleViewMoreListings = () => {
    setIsFullScreen(true)
    bottomSheetRef.current?.snapToIndex(2)
  }

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false)
    setSelectedProperty(null)
    setIsFullScreen(false)
  }

  const renderListingsButton = () => (
    <TouchableOpacity style={styles.listingsButton} onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
      <Feather name="list" size={18} color="black" />
      <Text style={styles.listingsButtonText}>Listings</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />

      {/* <SearchHeader /> */}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -15.4167,
          longitude: 28.2833,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {propertyListings.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            onPress={() => handleMarkerPress(property)}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.markerText}>{property.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {!isBottomSheetVisible && renderListingsButton()}

      {isBottomSheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={handleCloseBottomSheet}
        >
          <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
            {selectedProperty ? (
              <View style={styles.propertyDetailContainer}>
                <View style={styles.propertyImageContainer}>
                  <Image source={{ uri: selectedProperty.imageUrl }} style={styles.propertyImage} />
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={styles.tourBadge}>
                    <Ionicons name="videocam-outline" size={16} color="black" />
                    <Text style={styles.tourText}>Online tour</Text>
                  </View>
                </View>

                <View style={styles.propertyInfo}>
                  <View style={styles.priceRatingRow}>
                    <Text style={styles.propertyPrice}>
                      {selectedProperty.price} <Text style={styles.perDay}>/day</Text>
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="black" />
                      <Text style={styles.ratingText}>
                        {selectedProperty.rating} ({selectedProperty.reviewCount})
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.propertyDetails}>
                    {selectedProperty.rooms} rooms, {selectedProperty.size} m²
                  </Text>

                  <Text style={styles.propertyLocation}>{selectedProperty.location}</Text>

                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.reserveButton}>
                      <Text style={styles.reserveButtonText}>Reserve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageButton}>
                      <Text style={styles.messageButtonText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {isFullScreen && (
                  <View style={styles.similarListingsContainer}>
                    <Text style={styles.similarListingsTitle}>Similar Listings</Text>
                    {propertyListings
                      .filter((p) => p.id !== selectedProperty.id)
                      .map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          onPress={() => setSelectedProperty(property)}
                        />
                      ))}
                  </View>
                )}

                {!isFullScreen && (
                  <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMoreListings}>
                    <Text style={styles.viewMoreButtonText}>View similar listings</Text>
                    <Ionicons name="chevron-down" size={16} color="#008000" />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={styles.listingsContainer}>
                <Text style={styles.listingsTitle}>Available Properties</Text>
                {propertyListings.map((property) => (
                  <PropertyCard key={property.id} property={property} onPress={() => setSelectedProperty(property)} />
                ))}
              </View>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    backgroundColor: "#000",
    borderRadius: 5,
    padding: 5,
    minWidth: 60,
    alignItems: "center",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  listingsButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  listingsButtonText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  bottomSheetContent: {
    paddingBottom: 30,
  },
  propertyDetailContainer: {
    padding: 0,
  },
  propertyImageContainer: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  propertyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  chatButton: {
    position: "absolute",
    top: 16,
    right: 60,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  tourBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  tourText: {
    marginLeft: 4,
    fontWeight: "500",
  },
  propertyInfo: {
    padding: 16,
  },
  priceRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },
  perDay: {
    fontSize: 16,
    fontWeight: "normal",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "500",
  },
  propertyDetails: {
    fontSize: 16,
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  reserveButton: {
    backgroundColor: "#00a651",
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  messageButton: {
    backgroundColor: "#00a651",
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  messageButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  viewMoreButtonText: {
    color: "#008000",
    fontWeight: "500",
    marginRight: 4,
  },
  similarListingsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  similarListingsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listingsContainer: {
    padding: 16,
  },
  listingsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
})

