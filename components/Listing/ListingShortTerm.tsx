import React, { useEffect } from "react"
import FilterScreen from "./FilterScreen"
import { Link, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';


const ShortTermFilterScreen: React.FC = () => {

  const navigation = useNavigation(); // Use the useNavigate hook for navigation
    const router = useRouter()
  
  
    useEffect(() => {
          navigation.setOptions({ title: "Short-Term Listing" }) // Set custom title
        }, [navigation])

  return <FilterScreen listingType="short-term" />
}

export default ShortTermFilterScreen

