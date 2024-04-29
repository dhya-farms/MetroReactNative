import React, { useRef, useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator} 
from 'react-native';
import SlidingCarousel from '../../components/SlidingCarousel';
import { SafeAreaView } from 'react-native';
import LayoutHeader from '../../components/LayoutHeader';
import { TabBar } from '../../components/TabComponent';
import EnquireContainer from '../../components/EnquireContainer';
import HeaderContainer from '../../components/HeaderContainer';
import styles from '../../constants/styles/commonpropertydetailsstyles';
import axios from 'axios';
import AddClientModal from '../../modals/AddClientModal';
import { postCrmLead } from '../../apifunctions/postCrmLeadApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSoCustomersList } from '../../apifunctions/fetchSoCustomerList';



const amenityIcons = {
  'play ground': require('../../../assets/images/playground.png'),
  'swimming pool': require('../../../assets/images/pool.png'),
  'market': require('../../../assets/images/market.png'),
  'kids park': require('../../../assets/images/kidspark.png'),
  'bus stand': require('../../../assets/images/busstand.png'),
  'walking area': require('../../../assets/images/walkingarea.png'),
  'school': require('../../../assets/images/school.png'),
  'gym': require('../../../assets/images/gym.png'),
  'private beach': require('../../../assets/images/sunbed.png'),
  'community pool': require('../../../assets/images/pool.png'),
  'fitness center': require('../../../assets/images/gym.png'),
  
};

const defaultIcon = require('../../../assets/images/amenites.png');

const getAmenityIcon = (amenityName) => {
  const lowerCaseAmenityName = amenityName.toLowerCase();
  return Object.keys(amenityIcons).reduce((icon, key) => {
    if (key === lowerCaseAmenityName) {
      return amenityIcons[key];
    }
    return icon;
  }, defaultIcon);
};



const galleryImages = [
  { source: require('../../../assets/images/land.webp'), id: '1' },
  { source: require('../../../assets/images/land.webp'), id: '2' },
  { source: require('../../../assets/images/land.webp'), id: '3' },
  { source: require('../../../assets/images/land.webp'), id: '4' },
  { source: require('../../../assets/images/land.webp'), id: '5' },
  { source: require('../../../assets/images/land.webp'), id: '6' },
  // ... add other images as needed
];





const SOpropertiesDetails = ({route, navigation}) => {
  const { propertyId } = route.params?.params || {};
  const [customers, setCustomers] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [isAddClientModalVisible, setAddClientModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [textShown, setTextShown] = useState(false);
  const [prId, setPrId] = useState(null)
  const scrollViewRef = useRef();
  const desRef = useRef();
  const amRef = useRef();
  const gmRef = useRef();




  useEffect(() => {
    const paramsToken = route.params?.token;
    const paramsSoId = route.params?.userId;
    const effectivePropertyId = propertyId || route.params?.propertyId;
    setPrId(effectivePropertyId)
    console.log("Effective Property ID for use:", effectivePropertyId);

    const fetchPropertyDetails = async () => {
      if (!effectivePropertyId) {
        console.log("No Property ID provided");
        setError("No property ID provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`https://splashchemicals.in/metro/api/properties/${effectivePropertyId}/`);
        console.log("Fetch success:", response.data);
        setPropertyDetails(response.data);

        const fetchedCustomers = await fetchSoCustomersList(paramsToken, paramsSoId);
        if (!fetchedCustomers.error) {
          const sortedCustomers = fetchedCustomers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setCustomers(sortedCustomers);
          console.log(sortedCustomers);
        } else {
          console.error('Error fetching customers:', fetchedCustomers.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId, route.params]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!propertyDetails) {
    return <Text>No property details available.</Text>;
  }

  const ImageToggle = ()=>{
    setImageModalVisible(!imageModalVisible)
  }


  const getPlotTypeText = (propertyType) => {
    switch(propertyType) {
      case 1:
        return 'DTCP PLOTS';
      case 2:
        return 'Farmlands';
      case 3:
        return 'Flat';
      case 4:
        return 'Villa';
      default:
        return 'Unknown Plot Type';
    }
  };

  const propertyType = propertyDetails.property_type ? propertyDetails.property_type.id : 0;
  const isPlotOrFarmland = propertyType === 1;
  const isSpecialUnit = propertyType === 2;  // Treat property type 2 as a special case

  const numberOfUnitsLabel = isPlotOrFarmland ? 'No of Plots:' : (isSpecialUnit ? 'No of Units:' : (propertyType === 3 ? 'No of Homes:' : 'No of Villas:'));
  const numberOfUnits = propertyDetails.details ? 
    (isPlotOrFarmland ? propertyDetails.details.plots_available : 
      (isSpecialUnit ? propertyDetails.details.units_available : 
        (propertyType === 3 ? propertyDetails.details.homes_available : propertyDetails.details.villas_available))) : 'N/A';


  
  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current.measureLayout(
      scrollViewRef.current,
      (x, y, width, height) => {
        scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
      },
      () => {} // Error callback method
    );
  };

  const calculatePricePerSqFt = () => {
    if (propertyDetails && propertyDetails.price && propertyDetails.details.sq_ft_from) {
      const price = parseFloat(propertyDetails.price);
      const sqFtFrom = parseFloat(propertyDetails.details.sq_ft_from);
      return (price / sqFtFrom).toFixed(2); // Keeping two decimal places for the result.
    }
    return "N/A"; // Return "N/A" if the data is not available to perform the calculation.
  };

  if (!propertyDetails) {
    return <><Text>Property details not found.</Text> {console.log(propertyId)}</>;
  }

  const amenitiesArray = propertyDetails.details.amenities.map(item => item.trim()).filter(Boolean);

  const handleCustomerSelect = (selectedName) => {
    // Find the customer with the selected name
    const customer = customers.find(c => c.name === selectedName);
    if (customer) {
      console.log(`Selected customer ID: ${customer.id}`); // Log the customer ID
      setSelectedCustomer(customer); // Store the selected customer object
      setSelectedValue(selectedName); // Update the selected value to be the customer's name
    }
  };

  const handleDone = async () => {
    const paramsToken = route.params?.token;
    const assignedSoId = route.params?.userId || await AsyncStorage.getItem('userId');
    if (!selectedCustomer || !propertyDetails) {
      console.log("Required information is missing.");
      return;
    }
    try {
      const response = await postCrmLead(paramsToken, propertyDetails.id, selectedCustomer.id, assignedSoId);
      if (response && response.id) { // Checking if the response has 'id'
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigation.navigate("SO Client", { 
            screen: "SO Customer Details",
            params: { customerId: response.id } // Pass customerId to the detail screen
        }) // Navigate and pass customerId using response.id
          setAddClientModalVisible(false);
          setShowSuccessMessage(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to post CRM lead", error);
    }
  };
  
  
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.contentContainer}>    
     <SafeAreaView style={styles.slidingContainer}>
      <SlidingCarousel/>
    </SafeAreaView>
    <View style={styles.cityConatiner}>
    <Text style={styles.cityText}>{propertyDetails.name}</Text>
      <Text style={styles.cityAmount}>₹ {calculatePricePerSqFt()}/sqft</Text>
    </View>
    <LayoutHeader onPress={ImageToggle} gmapUrl={propertyDetails.gmap_url}/>
    <View style={styles.separator} />
    <TabBar onTabSelect={(tab) => {
          if (tab === 'Overview') scrollToSection(desRef);
          else if (tab === 'Amenities') scrollToSection(amRef);
          else if (tab === 'Gallery') scrollToSection(gmRef);
    }} />
    <View ref={desRef} style={styles.desContainer}>
      <Text style={styles.desHeader}>Description:</Text>
      <Text style={styles.desText}>
      {textShown ? propertyDetails.description : truncateText(propertyDetails.description, 40)}
      </Text>
    <TouchableOpacity onPress={toggleTextShown}>
    <Text style={styles.smText}>{textShown ? 'Show Less -' : 'Show More +'}</Text>
    </TouchableOpacity>
    <View style={styles.plotContainer}>
        <Text style={styles.plotHeader}>Plot Information:</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Property Type:</Text>
          <Text style={styles.infoContent}>{getPlotTypeText(propertyType)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Property ID:</Text>
          <Text style={styles.infoContent}>{propertyDetails.id}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>{numberOfUnitsLabel}</Text>
          <Text style={styles.infoContent}>{numberOfUnits}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Sq.ft:</Text>
          <Text style={styles.infoContent}>{propertyDetails.details ? `from ${propertyDetails.details.sq_ft_from} sq.ft` : 'N/A'}</Text>
        </View>
      </View>
    </View>
    <View ref={amRef} style={styles.amContainer}>
      <Text style={styles.amHeader}>Amenities:</Text>
      <View style={styles.amenitiesContainer}>
          {amenitiesArray.map((amenity, index) => (
          <View key={index} style={styles.amenity}>
            <Image source={getAmenityIcon(amenity)} style={styles.icon} />
            <Text style={styles.text}>{amenity}</Text>
          </View>
        ))}
      </View>
    </View>
    <View ref={gmRef} style={styles.gmContainer}>
      <Text style={styles.gmHeader}>Gallery:</Text>
      <View style={styles.galleryContainer}>
        {galleryImages.map((image, index) => (
          <TouchableOpacity key={index} style={styles.imageWrapper}>
            <Image source={image.source} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <AddClientModal
        label= "Client"
        modalVisible={isAddClientModalVisible}
        setModalVisible={setAddClientModalVisible}
        selectedValue={selectedValue}
        setSelectedValue={handleCustomerSelect} // Pass the function to handle selection
        options={["Add New Customer", ...customers.map(customer => customer.name)]}
        onDone={handleDone} 
        showSuccessMessage={showSuccessMessage}
        navigation={navigation}
        propertyId={prId}// Map customer names as options
      />
    <View style={styles.bookContainer}>
    <TouchableOpacity style={styles.bookButton} onPress={() => setAddClientModalVisible(true)}>
      <Text style={styles.bookText}>Book</Text>
    </TouchableOpacity>
    </View>
    <EnquireContainer/>
    </ScrollView>
    </View>
  );
};

export default SOpropertiesDetails;