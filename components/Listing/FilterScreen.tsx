"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ScrollView, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native"

// Import all section components
import TypeSection from "./Filters/TypeSection"
import AddressSection from "./Filters/AddressSection"
import PriceSection from "./Filters/PriceSection"
import SizeRatingSection from "./Filters/SizeRatingSection"
import PropertySection from "./Filters/PropertySection"
import BathroomSection from "./Filters/BathroomSection"
import CounterSection from "./Filters/CounterSection"
import TagsSection from "./Filters/TagsSection"
import SwitchSection from "./Filters/SwitchSection"
import AmenitiesSection from "./Filters/AmenitiesSection"
import PhotosVideoSection from "./Filters/PhotosVideoSection"
import AdditionalSection from "./Filters/AdditionalSection"
import ContactSection from "./Filters/ContactSection"
import OwnerSection from "./Filters/OwnerSection"
import OnlineKeySection from "./Filters/OnlineKeySection"
import TermsSection from "./Filters/TermsSection"
import ActionButtons from "./Filters/ActionButtons"
import MealOptionsSection from "./Filters/MealOptionsSection"
import AccessibilitySection from "./Filters/AccessibilitySection"
import SecuritySection from "./Filters/SecuritySection"
import RoomTypeSection from "./Filters/RoomTypeSection"
import BedTypeSection from "./Filters/BedTypeSection"
import ViewTypeSection from "./Filters/ViewTypeSection"
import BalconySection from "./Filters/BalconySection"
import { Checkbox } from "react-native-paper"

// Type definitions
export type FilterType = "House" | "Boarding house" | "Hotel room"
export type ListingType = "short-term" | "long-term" | "hotel"

interface FilterScreenProps {
  listingType: ListingType
}

const FilterScreen: React.FC<FilterScreenProps> = ({ listingType }) => {
  // State for various filter options
  const [filterType, setFilterType] = useState<FilterType>("House")
  const [address, setAddress] = useState("Levete Utca Smith 114")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [rooms, setRooms] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [balcony, setBalcony] = useState("Yes")
  const [patio, setPatio] = useState("Yes")
  const [poolOption, setPoolOption] = useState("Private")
  const [gardenOption, setGardenOption] = useState("Private")
  const [allowsPets, setAllowsPets] = useState(true)
  const [allowsKids, setAllowsKids] = useState(true)
  const [allowsSmoking, setAllowsSmoking] = useState(false)
  const [onlineKey, setOnlineKey] = useState(true)
  const [adults, setAdults] = useState(0)
  const [infants, setInfants] = useState(0)
  const [sizeRating, setSizeRating] = useState(0)
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [sortByOption, setSortByOption] = useState("Price")
  const [roomType, setRoomType] = useState("Private")
  const [bedType, setBedType] = useState("Single bed")
  const [viewType, setViewType] = useState("Mountain view")
  const [mealOptions, setMealOptions] = useState<string[]>([])

  const [petFriendly, setPetFriendly] = useState(false);
  const [allowKids, setAllowKids] = useState(false);
  const [allowSmoking, setAllowSmoking] = useState(false);
  const [inUnitLaundry, setInUnitLaundry] = useState(false);


  // Selected amenities
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, string[]>>({
    bathroom: [],
    bedroom: [],
    kitchen: [],
    entertainment: [],
    heating: [],
    safety: [],
    other: [],
    accessibility: [],
    security: [],
  })

  // Reset certain fields when filter type changes
  useEffect(() => {
    // Reset specific fields based on the new filter type
    if (filterType === "Hotel room") {
      setRooms(1)
      setBathrooms(1)
    }
  }, [filterType])

  // Toggle selection of an amenity
  const toggleAmenity = (category: string, item: string) => {
    setSelectedAmenities((prev) => {
      const updated = { ...prev }
      if (updated[category]?.includes(item)) {
        updated[category] = updated[category].filter((i) => i !== item)
      } else {
        if (!updated[category]) {
          updated[category] = []
        }
        updated[category] = [...updated[category], item]
      }
      return updated
    })
  }

  // Toggle meal option
  const toggleMealOption = (option: string) => {
    setMealOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]))
  }

  // Handle save and publish actions
  const handleSave = () => {
    console.log("Saving filter settings...")
  }

  const handlePublish = () => {
    console.log("Publishing listing...")
  }

  // Handle photo and video uploads
  const handleAddPhotos = () => {
    console.log("Adding photos...")
  }

  const handleAddVideo = () => {
    console.log("Adding video...")
  }

  // Handle owner document uploads
  const handleAddOwnership = () => {
    console.log("Adding ownership proof...")
  }

  const handleAddCertificate = () => {
    console.log("Adding certificate...")
  }

  // Determine which sections to show based on filter type and listing type
  const shouldShowSection = (sectionName: string): boolean => {
    // Common sections for all types
    const commonSections = ["type", "address", "contact", "owner", "onlineKey", "terms", "actions", "photosVideo"]

    if (commonSections.includes(sectionName)) {
      return true
    }

    // Hotel room specific sections
    if (filterType === "Hotel room") {
      const hotelSections = [
        "sizeRating",
        "roomType",
        "bedType",
        "viewType",
        "mealOptions",
        "accessibility",
        "security",
      ]

      if (hotelSections.includes(sectionName)) {
        return true
      }

      // Some sections are only for hotel listing type
      if (sectionName === "guests" && listingType === "hotel") {
        return true
      }

      // Don't show these sections for hotel rooms
      const excludedForHotel = ["price", "rooms", "bathroom", "balcony", "additional"]

      if (excludedForHotel.includes(sectionName)) {
        return false
      }
    }

    // House specific sections
    if (filterType === "House") {
      const houseSections = ["price", "rooms", "bathroom", "balcony", "additional"]

      if (houseSections.includes(sectionName)) {
        return true
      }
    }

    // Boarding house specific sections
    if (filterType === "Boarding house") {
      const boardingSections = ["price", "rooms", "bathroom", "additional"]

      if (boardingSections.includes(sectionName)) {
        return true
      }

      // No balcony for boarding houses
      if (sectionName === "balcony") {
        return false
      }
    }

    // Common sections for all property types
    const allPropertySections = ["patio", "pool", "garden", "petFriendly", "amenities", "sortBy"]

    return allPropertySections.includes(sectionName)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TypeSection selectedType={filterType} onTypeChange={setFilterType} />

        {shouldShowSection("address") && <AddressSection address={address} onAddressChange={setAddress} />}

        {shouldShowSection("price") && <PriceSection priceRange={priceRange} onPriceRangeChange={setPriceRange} />}

        {shouldShowSection("sizeRating") && <SizeRatingSection rating={sizeRating} onRatingChange={setSizeRating} />}

        {shouldShowSection("guests") && (
          <PropertySection
            listingType="hotel"
            rooms={rooms}
            onRoomsChange={setRooms}
            adults={adults}
            onAdultsChange={setAdults}
            infants={infants}
            onInfantsChange={setInfants}
          />
        )}

        {shouldShowSection("rooms") && (
          <PropertySection
            listingType={listingType}
            rooms={rooms}
            onRoomsChange={setRooms}
            adults={adults}
            onAdultsChange={setAdults}
            infants={infants}
            onInfantsChange={setInfants}
          />
        )}

        {shouldShowSection("roomType") && <RoomTypeSection selectedType={roomType} onTypeChange={setRoomType} />}

        {shouldShowSection("bedType") && <BedTypeSection selectedType={bedType} onTypeChange={setBedType} />}

        {shouldShowSection("viewType") && <ViewTypeSection selectedType={viewType} onTypeChange={setViewType} />}

        {shouldShowSection("bathroom") && <BathroomSection bathrooms={bathrooms} onBathroomsChange={setBathrooms} />}

        {shouldShowSection("balcony") && (
          <TagsSection
            title="Balcony"
            options={["Yes", "No"]}
            selectedOption={balcony}
            onSelect={setBalcony}
           />
           )}

        {shouldShowSection("patio") && (
          <TagsSection
          title="Patio"
          options={["Yes", "No"]}
          selectedOption={patio}
          onSelect={setPatio}
        />
        )}

        {shouldShowSection("pool") && (
          <TagsSection
            title="Pool"
            options={["Private", "Common", "No"]}
            selectedOption={poolOption}
            onSelect={setPoolOption}
          />
        )}
        {shouldShowSection("garden") && (
          <View>
            <TagsSection
              title="Garden"
              options={["Private", "Common", "No"]}
              selectedOption={gardenOption}
              onSelect={setGardenOption}
            />
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Additional Features</Text>
              {[
                { label: "Pet Friendly", state: petFriendly, setState: setPetFriendly },
                { label: "Allow Kids", state: allowKids, setState: setAllowKids },
                { label: "Allow Smoking", state: allowSmoking, setState: setAllowSmoking },
                { label: "In-unit Laundry", state: inUnitLaundry, setState: setInUnitLaundry },
              ].map(({ label, state, setState }) => (
                <TouchableOpacity
                  key={label}
                  style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}
                  onPress={() => setState(!state)}
                >
                  <Checkbox value={state} onValueChange={setState} />
                  <Text style={{ marginLeft: 8, fontSize: 16 }}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}


        
        {shouldShowSection("mealOptions") && (
          <MealOptionsSection selectedOptions={mealOptions} onToggleOption={toggleMealOption} />
        )}

        {shouldShowSection("amenities") && (
          <AmenitiesSection
            selectedAmenities={selectedAmenities}
            onToggleAmenity={toggleAmenity}
            propertyType={filterType}
          />
        )}

        {shouldShowSection("accessibility") && (
          <AccessibilitySection
            selectedOptions={selectedAmenities.accessibility || []}
            onToggleOption={(option) => toggleAmenity("accessibility", option)}
          />
        )}

        {shouldShowSection("security") && (
          <SecuritySection
            selectedOptions={selectedAmenities.security || []}
            onToggleOption={(option) => toggleAmenity("security", option)}
          />
        )}

        {/* {shouldShowSection("sortBy") && (
          <TagsSection
            title="Sort by relevance"
            options={["Price", "Area", "Newest", "Other"]}
            selectedOption={sortByOption}
            onSelect={setSortByOption}
          />
        )} */}

        {shouldShowSection("photosVideo") && (
          <PhotosVideoSection onAddPhotos={handleAddPhotos} onAddVideo={handleAddVideo} />
        )}

        {shouldShowSection("additional") && (
          <AdditionalSection additionalInfo={additionalInfo} onAdditionalInfoChange={setAdditionalInfo} />
        )}

        {shouldShowSection("contact") && (
          <ContactSection
            name={contactName}
            onNameChange={setContactName}
            phone={contactPhone}
            onPhoneChange={setContactPhone}
          />
        )}

        {shouldShowSection("owner") && (
          <OwnerSection onAddOwnership={handleAddOwnership} onAddCertificate={handleAddCertificate} />
        )}

        {shouldShowSection("onlineKey") && <OnlineKeySection onlineKey={onlineKey} onOnlineKeyChange={setOnlineKey} />}

        {shouldShowSection("terms") && <TermsSection />}

        {shouldShowSection("actions") && <ActionButtons onSave={handleSave} onPublish={handlePublish} />}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
})

export default FilterScreen

