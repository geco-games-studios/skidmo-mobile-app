import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import SectionHeader from "./UI/SectionHeader"
import type { FilterType } from "../FilterScreen"

interface AmenitiesCategory {
  title: string
  items: string[]
}

interface AmenitiesSectionProps {
  selectedAmenities: Record<string, string[]>
  onToggleAmenity: (category: string, item: string) => void
  propertyType: FilterType
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ selectedAmenities, onToggleAmenity, propertyType }) => {
  // Define amenities categories based on property type
  const getAmenitiesCategories = (): AmenitiesCategory[] => {
    const commonCategories = [
      {
        title: "Bathroom",
        items: ["Bath", "Hair dryer", "Separate shower"],
      },
      {
        title: "Entertainment",
        items: ["Board games", "Exercise equipment", "TV"],
      },
      {
        title: "Heating and cooling",
        items: ["Air conditioning", "Heating"],
      },
      {
        title: "Home safety",
        items: ["Carbon monoxide alarm", "Smoke alarm"],
      },
      {
        title: "Other amenities",
        items: ["Beach essentials", "Self check-in", "Wifi"],
      },
    ]

    // Hotel room specific amenities
    if (propertyType === "Hotel room") {
      return [...commonCategories]
    }

    // House specific amenities
    if (propertyType === "House") {
      return [
        ...commonCategories,
        {
          title: "Bedroom and laundry",
          items: ["Clothes drying rack", "Iron", "Washer"],
        },
        {
          title: "Kitchen and dining",
          items: ["Dishwasher", "Dining table", "Stove"],
        },
      ]
    }

    // Boarding house specific amenities
    return [
      ...commonCategories,
      {
        title: "Bedroom and laundry",
        items: ["Clothes drying rack", "Iron", "Washer"],
      },
      {
        title: "Kitchen and dining",
        items: ["Dining table", "Stove", "Fridge"],
      },
    ]
  }

  const amenitiesCategories = getAmenitiesCategories()

  return (
    <View style={styles.section}>
      <SectionHeader title="Amenities" />

      {amenitiesCategories.map((category, index) => (
        <View key={index} style={styles.amenityCategory}>
          <Text style={styles.amenityCategoryTitle}>{category.title}</Text>
          <View style={styles.tagsContainer}>
            {category.items.map((item, itemIndex) => {
              const categoryKey = category.title.toLowerCase()
              const isSelected = selectedAmenities[categoryKey]?.includes(item)

              return (
                <TouchableOpacity
                  key={itemIndex}
                  style={[styles.amenityTag, isSelected && styles.selectedAmenityTag]}
                  onPress={() => onToggleAmenity(categoryKey, item)}
                >
                  <Text style={[styles.amenityTagText, isSelected && styles.selectedAmenityTagText]}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  amenityCategory: {
    marginBottom: 16,
  },
  amenityCategoryTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  amenityTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  selectedAmenityTag: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  amenityTagText: {
    fontSize: 14,
    color: "#333",
  },
  selectedAmenityTagText: {
    color: "#fff",
  },
})

export default AmenitiesSection

