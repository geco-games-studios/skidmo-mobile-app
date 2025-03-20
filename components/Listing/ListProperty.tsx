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


const SellPropertyScreen = () => {
  const [propertyType, setPropertyType] = useState('House');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [onlineTour, setOnlineTour] = useState(false);
  const [isOwner, setIsOwner] = useState(true);

    const navigation = useNavigation(); // Use the useNavigate hook for navigation
    const router = useRouter()
  
     useEffect(() => {
        navigation.setOptions({ title: "List Property" }) // Set custom title
      }, [navigation])
  
    const handleGoBack = () => {
      router.back()
    }
  
  
  // Room count state
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  
  const PropertyTypeButton = ({ title, selected, onPress }) => (
    <TouchableOpacity 
      style={[styles.typeButton, selected === title && styles.selectedTypeButton]} 
      onPress={() => onPress(title)}
    >
      <Text style={styles.typeButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  
  const OptionButton = ({ title, selected, onPress }) => (
    <TouchableOpacity 
      style={[styles.optionButton, selected && styles.selectedOptionButton]} 
      onPress={onPress}
    >
      <Text style={[styles.optionButtonText, selected && styles.selectedOptionButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
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
          <PropertyTypeButton 
            title="Apartment flat" 
            selected={propertyType} 
            onPress={setPropertyType} 
          />
          <PropertyTypeButton 
            title="Lodge" 
            selected={propertyType} 
            onPress={setPropertyType} 
          />
          <PropertyTypeButton 
            title="Commercial" 
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
            placeholder="Price, ZMW"
            keyboardType="numeric"
          />
        </View>
        
        <SectionTitle title="Property" />
        <Text style={styles.subsectionTitle}>Number of rooms</Text>
        
        <View style={styles.optionsRow}>
          <OptionButton title="Studio apartment" selected={false} onPress={() => {}} />
          <OptionButton title="1" selected={false} onPress={() => {}} />
          <OptionButton title="2" selected={true} onPress={() => {}} />
          <OptionButton title="3" selected={false} onPress={() => {}} />
          <OptionButton title="4" selected={false} onPress={() => {}} />
          <OptionButton title="5+" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Number of bedrooms</Text>
        <View style={styles.optionsRow}>
          <OptionButton title="1" selected={false} onPress={() => {}} />
          <OptionButton title="2" selected={true} onPress={() => {}} />
          <OptionButton title="3" selected={false} onPress={() => {}} />
          <OptionButton title="4" selected={false} onPress={() => {}} />
          <OptionButton title="5+" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Square feet, m²</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter square footage"
            keyboardType="numeric"
          />
        </View>
        
        <Text style={styles.subsectionTitle}>Bathroom</Text>
        <View style={styles.optionsRow}>
          <OptionButton title="Self contained" selected={true} onPress={() => {}} />
          <OptionButton title="1" selected={false} onPress={() => {}} />
          <OptionButton title="2" selected={false} onPress={() => {}} />
          <OptionButton title="3" selected={false} onPress={() => {}} />
          <OptionButton title="4" selected={false} onPress={() => {}} />
          <OptionButton title="5+" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Balcony</Text>
        <View style={styles.optionsRow}>
          <OptionButton title="Yes" selected={true} onPress={() => {}} />
          <OptionButton title="No" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Patio</Text>
        <View style={styles.optionsRow}>
          <OptionButton title="Yes" selected={true} onPress={() => {}} />
          <OptionButton title="No" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Pool</Text>
        <View style={styles.optionsRow}>
          <OptionButton title="Private" selected={false} onPress={() => {}} />
          <OptionButton title="Common" selected={true} onPress={() => {}} />
          <OptionButton title="No" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Garden</Text>
        <View style={styles.optionsRow}>
          <OptionButton title="Private" selected={true} onPress={() => {}} />
          <OptionButton title="Common" selected={false} onPress={() => {}} />
          <OptionButton title="No" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Security</Text>
        <View style={styles.optionsRow}>
          <OptionButton title="Yes" selected={true} onPress={() => {}} />
          <OptionButton title="No" selected={false} onPress={() => {}} />
        </View>
        
        <Text style={styles.subsectionTitle}>Near-by Infrastructure</Text>
        <View style={styles.amenitiesContainer}>
          <OptionButton title="School" selected={true} onPress={() => {}} />
          <OptionButton title="Park" selected={true} onPress={() => {}} />
          <OptionButton title="Hospital" selected={false} onPress={() => {}} />
          <OptionButton title="Clinic" selected={false} onPress={() => {}} />
          <OptionButton title="Shopping mall" selected={true} onPress={() => {}} />
          <OptionButton title="Gym" selected={false} onPress={() => {}} />
          <OptionButton title="Police station" selected={false} onPress={() => {}} />
          <OptionButton title="Recreation" selected={false} onPress={() => {}} />
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
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Tell us more about the apartment and the infrastructure nearby
          </Text>
        </View>
        
        <SectionTitle title="Additional" />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Year of construction"
            keyboardType="numeric"
          />
        </View>
        
        <SectionTitle title="Contact" />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Maria"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Your number phone"
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, isOwner && styles.selectedRoleButton]}
            onPress={() => setIsOwner(true)}
          >
            <View style={styles.radioButton}>
              {isOwner && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.roleText}>Owner</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roleButton, !isOwner && styles.selectedRoleButton]}
            onPress={() => setIsOwner(false)}
          >
            <View style={styles.radioButton}>
              {!isOwner && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.roleText}>Agent</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.uploadButton}>
          <AntDesign name="plus" size={16} color="#000" />
          <Text style={styles.uploadButtonText}>Add proof of ownership</Text>
        </TouchableOpacity>
        
        {!isOwner && (
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Agent ID"
            />
          </View>
        )}
        
        {!isOwner && (
          <TouchableOpacity style={styles.uploadButton}>
            <AntDesign name="plus" size={16} color="#000" />
            <Text style={styles.uploadButtonText}>Add photo of agent certificate</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.subsectionTitle}>Online tour</Text>
        <View style={styles.switchContainer}>
          <Text>If you are ready to show the property via video communication</Text>
          <Switch
            value={onlineTour}
            onValueChange={setOnlineTour}
            trackColor={{ false: "#e5e5e5", true: "#22c55e" }}
            thumbColor="#ffffff"
          />
        </View>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By proceeding to publish your listing on our platform, you agree to pay the service fee and acknowledge that you have read and accepted the terms and conditions.
          </Text>
          <TouchableOpacity>
            <Text style={styles.termsLink}>Read the terms and conditions</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <Ionicons name="checkmark" size={16} color="#22c55e" />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
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
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOptionButton: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  optionButtonText: {
    fontSize: 12,
  },
  selectedOptionButtonText: {
    color: '#fff',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
  },
  roleText: {
    fontSize: 14,
  },
  termsContainer: {
    marginVertical: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  termsLink: {
    fontSize: 14,
    color: '#22c55e',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  checkboxText: {
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

export default SellPropertyScreen;