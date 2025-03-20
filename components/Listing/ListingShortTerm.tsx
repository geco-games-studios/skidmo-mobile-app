import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  SafeAreaView,
  Switch
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';

const ShortTermRentalScreen = () => {
  const [propertyType, setPropertyType] = useState('House');
  const [petFriendly, setPetFriendly] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Room count state
  const [bedrooms, setBedrooms] = useState(0);
  const [kitchen, setKitchen] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [livingroom, setLivingroom] = useState(0);
  const [diningroom, setDiningroom] = useState(0);

  const navigation = useNavigation(); // Use the useNavigate hook for navigation
    const router = useRouter()
    
       useEffect(() => {
          navigation.setOptions({ title: "Short-Term Property" }) // Set custom title
        }, [navigation])
    
      const handleGoBack = () => {
        router.back()
      }
  
  const PropertyTypeButton = ({ title, selected, onPress }) => (
    <TouchableOpacity 
      style={[styles.typeButton, selected === title && styles.selectedTypeButton]} 
      onPress={() => onPress(title)}
    >
      <Text style={styles.typeButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  
  const AmenityButton = ({ title }) => (
    <TouchableOpacity style={styles.amenityButton}>
      <Text style={styles.amenityButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  
  const RoomCounter = ({ count, setCount, label }) => (
    <View style={styles.roomCounterContainer}>
      <Text style={styles.roomCounterLabel}>{label}</Text>
      <View style={styles.roomCounterButtons}>
        {[0, 1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity 
            key={num} 
            style={[styles.roomCountButton, count === num && styles.selectedRoomCount]}
            onPress={() => setCount(num)}
          >
            <Text style={[styles.roomCountText, count === num && styles.selectedRoomCountText]}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
  const SectionTitle = ({ title }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Type</Text> */}
      </View>
      
      <ScrollView style={styles.formScrollView}>
        <View style={styles.typeButtonsContainer}>
          <PropertyTypeButton 
            title="House" 
            selected={propertyType} 
            onPress={setPropertyType} 
          />
          <PropertyTypeButton 
            title="Boarding house" 
            selected={propertyType} 
            onPress={setPropertyType} 
          />
          <PropertyTypeButton 
            title="Hotel room" 
            selected={propertyType} 
            onPress={setPropertyType} 
          />
        </View>
        
        <SectionTitle title="Address" />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Lorelie Lylian Smith 114"
          />
        </View>
        
        <SectionTitle title="Price" />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter price"
            keyboardType="numeric"
          />
        </View>
        
        <SectionTitle title="Property" />
        <Text style={styles.subsectionTitle}>Number of rooms</Text>
        
        <View style={styles.roomsContainer}>
          <RoomCounter count={bedrooms} setCount={setBedrooms} label="Bedroom" />
          <RoomCounter count={kitchen} setCount={setKitchen} label="Kitchen" />
          <RoomCounter count={bathroom} setCount={setBathroom} label="Bathroom" />
          <RoomCounter count={livingroom} setCount={setLivingroom} label="Livingroom" />
          <RoomCounter count={diningroom} setCount={setDiningroom} label="Diningroom" />
        </View>
        
        <Text style={styles.subsectionTitle}>Bathroom</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Bath" />
          <AmenityButton title="Toilet" />
          <AmenityButton title="Shower" />
        </View>
        
        <Text style={styles.subsectionTitle}>Balcony</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Yes" />
          <AmenityButton title="No" />
        </View>
        
        <Text style={styles.subsectionTitle}>Floor</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="1" />
          <AmenityButton title="2" />
          <AmenityButton title="3+" />
        </View>
        
        <Text style={styles.subsectionTitle}>Pool</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Private" />
          <AmenityButton title="Common" />
          <AmenityButton title="No" />
        </View>
        
        <Text style={styles.subsectionTitle}>Garden</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Private" />
          <AmenityButton title="Common" />
          <AmenityButton title="No" />
        </View>
        
        <Text style={styles.subsectionTitle}>Pet friendly</Text>
        <View style={styles.switchContainer}>
          <Text>Allows kids</Text>
          <Switch
            value={petFriendly}
            onValueChange={setPetFriendly}
            trackColor={{ false: "#e5e5e5", true: "#22c55e" }}
            thumbColor="#ffffff"
          />
        </View>
        
        <SectionTitle title="Amenities" />
        
        <Text style={styles.subsectionTitle}>Bathroom</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Bath" />
          <AmenityButton title="Toilet" />
          <AmenityButton title="Shower gel" />
        </View>
        
        <Text style={styles.subsectionTitle}>Bedroom and laundry</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Clothes storage" />
          <AmenityButton title="Iron" />
          <AmenityButton title="Hair dryer" />
          <AmenityButton title="Washer" />
          <AmenityButton title="Extra pillows and blankets" />
        </View>
        
        <Text style={styles.subsectionTitle}>Kitchen and dining</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Refrigerator" />
          <AmenityButton title="Stove" />
          <AmenityButton title="Microwave" />
          <AmenityButton title="Cooking basics" />
          <AmenityButton title="Kitchen" />
          <AmenityButton title="Dishes" />
          <AmenityButton title="Coffee maker" />
          <AmenityButton title="Toaster" />
        </View>
        
        <Text style={styles.subsectionTitle}>Entertainment</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="TV" />
          <AmenityButton title="Books and reading material" />
          <AmenityButton title="Gaming" />
        </View>
        
        <Text style={styles.subsectionTitle}>Heating and cooling</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Air conditioning" />
          <AmenityButton title="Heating" />
          <AmenityButton title="Portable fans" />
        </View>
        
        <Text style={styles.subsectionTitle}>Home safety</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Smoke alarm" />
          <AmenityButton title="Carbon monoxide alarm" />
          <AmenityButton title="Fire extinguisher" />
          <AmenityButton title="First aid kit" />
        </View>
        
        <Text style={styles.subsectionTitle}>Other amenities</Text>
        <View style={styles.amenitiesContainer}>
          <AmenityButton title="Board games" />
          <AmenityButton title="Wifi" />
          <AmenityButton title="Dedicated workspace" />
          <AmenityButton title="Parking space" />
          <AmenityButton title="Fitness center" />
          <AmenityButton title="Bar" />
          <AmenityButton title="Breakfast included" />
          <AmenityButton title="Cleaning service" />
        </View>
        
        <SectionTitle title="Photos/video" />
        <TouchableOpacity style={styles.uploadButton}>
          <AntDesign name="plus" size={16} color="#000" />
          <Text style={styles.uploadButtonText}>Add photos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.uploadButton}>
          <AntDesign name="plus" size={16} color="#000" />
          <Text style={styles.uploadButtonText}>Add video</Text>
        </TouchableOpacity>
        
        <SectionTitle title="Additional" />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Info"
            multiline
          />
        </View>
        
        <SectionTitle title="Contact" />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Your contact email"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Your contact phone"
            keyboardType="phone-pad"
          />
        </View>
        
        <Text style={styles.subsectionTitle}>Owner</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <AntDesign name="plus" size={16} color="#000" />
          <Text style={styles.uploadButtonText}>Add proof of ownership</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.uploadButton}>
          <AntDesign name="plus" size={16} color="#000" />
          <Text style={styles.uploadButtonText}>Add photo of specific condition</Text>
        </TouchableOpacity>
        
        <Text style={styles.subsectionTitle}>Online payment</Text>
        <View style={styles.switchContainer}>
          <Text>By accepting to publish your listing on our platform, you agree that the data you have provided are correct and you have read and agreed to our terms and conditions.</Text>
          <Switch
            value={onlinePayment}
            onValueChange={setOnlinePayment}
            trackColor={{ false: "#e5e5e5", true: "#22c55e" }}
            thumbColor="#ffffff"
          />
        </View>
        
        <View style={styles.termsContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <Ionicons name="checkmark" size={16} color="#22c55e" />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I have read and agree to the terms and conditions
          </Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.publishButton}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  formScrollView: {
    flex: 1,
    padding: 16,
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTypeButton: {
    backgroundColor: '#f0f0f0',
  },
  typeButtonText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  roomsContainer: {
    marginBottom: 16,
  },
  roomCounterContainer: {
    marginBottom: 12,
  },
  roomCounterLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  roomCounterButtons: {
    flexDirection: 'row',
  },
  roomCountButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedRoomCount: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  roomCountText: {
    fontSize: 14,
  },
  selectedRoomCountText: {
    color: '#fff',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  amenityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginRight: 8,
    marginBottom: 8,
  },
  amenityButtonText: {
    fontSize: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#22c55e',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  publishButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});

export default ShortTermRentalScreen;