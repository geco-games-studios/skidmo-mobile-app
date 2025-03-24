import type React from "react"
import { View, StyleSheet } from "react-native"
import SectionHeader from "./UI/SectionHeader"
import Tag from "./UI/Tag"

type FilterType = "House" | "Boarding house" | "Hotel room"

interface TypeSectionProps {
  selectedType: FilterType
  onTypeChange: (type: FilterType) => void
}

const TypeSection: React.FC<TypeSectionProps> = ({ selectedType, onTypeChange }) => {
  return (
    <View style={styles.section}>
      <SectionHeader title="Type" />
      <View style={styles.typeContainer}>
        <Tag text="House" isSelected={selectedType === "House"} onPress={() => onTypeChange("House")} />
        <Tag
          text="Boarding house"
          isSelected={selectedType === "Boarding house"}
          onPress={() => onTypeChange("Boarding house")}
        />
        <Tag text="Hotel room" isSelected={selectedType === "Hotel room"} onPress={() => onTypeChange("Hotel room")} />
      </View>
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
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
})

export default TypeSection

