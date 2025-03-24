import React, { useEffect } from "react"
import FilterScreen from "./FilterScreen"
import { Link, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';


const HotelFilterScreen: React.FC = () => {
  const navigation = useNavigation(); // Use the useNavigate hook for navigation
  const router = useRouter()


  useEffect(() => {
        navigation.setOptions({ title: "List Property" }) // Set custom title
      }, [navigation])

  return <FilterScreen listingType="hotel" />
}

export default HotelFilterScreen
