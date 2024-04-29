import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, ActivityIndicator} from 'react-native';
import SlidingCarousel from '../../components/SlidingCarousel';
import { SafeAreaView } from 'react-native';
import LayoutHeader from '../../components/LayoutHeader';
import { TabBar } from '../../components/TabComponent';
import EnquireContainer from '../../components/EnquireContainer';
import HeaderContainer from '../../components/HeaderContainer';
import LayoutImageModal from '../../modals/LayoutImageModal';
import styles from '../../constants/styles/showpropertiesstyles';
import axios from 'axios';
import AmenitiesDisplay from '../../components/AmenitiesDisplay';



const galleryImages = [
  { source: require('../../../assets/images/land.webp'), id: '1' },
  { source: require('../../../assets/images/land.webp'), id: '2' },
  { source: require('../../../assets/images/land.webp'), id: '3' },
  { source: require('../../../assets/images/land.webp'), id: '4' },
  { source: require('../../../assets/images/land.webp'), id: '5' },
  { source: require('../../../assets/images/land.webp'), id: '6' },
  // ... add other images as needed
];

const ShowProperties = ({ route, navigation }) => {
  const { propertyId } = route.params?.params || {};
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [error, setError] = useState('');
  const scrollViewRef = useRef();
  const [backscreen, setBackScreen] = useState('')
  const desRef = useRef();
  const amRef = useRef();
  const gmRef = useRef();

  useEffect(() => {
    const effectivePropertyId = propertyId || route.params?.propertyId;
    console.log("Effective Property ID for use:", effectivePropertyId);

    const nestedBackScreen = route.params?.params?.backScreen;
    const directBackScreen = route.params?.backScreen;
    const effectiveBackScreen = nestedBackScreen || directBackScreen;
    console.log("Effective Back Screen for use:", effectiveBackScreen);

    if (effectiveBackScreen) {
      console.log("Navigated from:", effectiveBackScreen);
      setBackScreen(effectiveBackScreen)
    } else {
      console.log("No Back Screen provided in route params.");
    }
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

  // Define a function to get plot type text
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

  // Use null checks to avoid accessing properties of null
  const propertyType = propertyDetails.property_type ? propertyDetails.property_type.id : 0;
  const isPlotOrFarmland = propertyType === 1 || propertyType === 2;
  const numberOfUnitsLabel = isPlotOrFarmland ? 'No of Plots:' : (propertyType === 3 ? 'No of Homes:' : 'No of Villas:');
  const numberOfUnits = propertyDetails.details ? (isPlotOrFarmland ? propertyDetails.details.plots_available : (propertyType === 3 ? propertyDetails.details.homes_available : propertyDetails.details.villas_available)) : 'N/A';
  

  
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

  const ImageToggle = ()=>{
    setImageModalVisible(!imageModalVisible)
  }

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

  const handleBack = () => {
    if (backscreen==="Home") {
      navigation.navigate("Home");
    
    } else if(backscreen==="Properties"){
      navigation.navigate("properties", {
        screen: "Customer Properties",
      });
    } else if(backscreen==="Favorites"){
      navigation.navigate("Favorites");
    } else {
      navigation.goBack();
    }
  };
  
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Properties" 
          ImageLeft={require('../../../assets/images/back arrow icon.png')}
          ImageRight={require('../../../assets/images/belliconblue.png')}
          onPress={handleBack}/>     
    <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.contentContainer}>
    <SafeAreaView style={styles.slidingContainer}>
      <SlidingCarousel/>
    </SafeAreaView>
    <View style={styles.cityConatiner}>
      <Text style={styles.cityText}>{propertyDetails.name}</Text>
      <Text style={styles.cityAmount}>₹ {calculatePricePerSqFt()}/sqft</Text>
    </View>
    <LayoutHeader onPress={ImageToggle} gmapUrl={propertyDetails.gmap_url} />
    <LayoutImageModal modalVisible={imageModalVisible} setModalVisible={setImageModalVisible}/>
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
    <AmenitiesDisplay ref={amRef} amenities={amenitiesArray} />
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
    <EnquireContainer/>
    </ScrollView>
    </View>
  );
};


export default ShowProperties;