import type React from "react"
import { View, StyleSheet } from "react-native"
import SectionHeader from "./UI/SectionHeader"

interface PriceSectionProps {
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

const PriceSection: React.FC<PriceSectionProps> = ({ priceRange, onPriceRangeChange }) => {
  return (
    <View style={styles.section}>
      <SectionHeader title="Price" />
      <View style={styles.priceContainer}>
        {/* Price slider would go here */}
        <View style={styles.priceSlider} />
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
  priceContainer: {
    marginVertical: 8,
  },
  priceSlider: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
})

export default PriceSection

