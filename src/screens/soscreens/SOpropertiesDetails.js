import React, { useRef, useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator} 
from 'react-native';
import SlidingCarousel from '../../components/SlidingCarousel';
import LayoutHeader from '../../components/LayoutHeader';
import { TabBar } from '../../components/TabComponent';
import EnquireContainer from '../../components/EnquireContainer';
import HeaderContainer from '../../components/HeaderContainer';
import styles from '../../constants/styles/commonpropertydetailsstyles';
import AddClientModal from '../../modals/AddClientModal';
import { postCrmLead } from '../../apifunctions/postCrmLeadApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSoCustomersList } from '../../apifunctions/fetchSoCustomerList';
import AmenitiesDisplay from '../../components/AmenitiesDisplay';
import { fetchPropertyDetails } from '../../apifunctions/fetchPropertyDetailsApi';
import { DetailItems } from '../../functions/DetailItems';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';




const dummyImageUri = require('../../../assets/images/Newmetro.jpeg')
const dummyImageUris = new Array(3).fill(dummyImageUri); 

const dummyGalleryImageUri = require('../../../assets/images/Newmetro.jpeg');
const dummyGalleryImageUris = new Array(6).fill(dummyGalleryImageUri);  // Create an array of 6 dummy images


const SOpropertiesDetails = ({route, navigation}) => {
  const { propertyId } = route.params?.params || {};
  const {phaseId} = route.params?.params || {};
  const [customers, setCustomers] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [phaseDetails, setPhaseDetails]= useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [carouselImages, setCarouselImages]= useState([])
  const [galImages, setGalImages] = useState([])
  const [currentPropertyId, setCurrentPropertyId] = useState();
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [isAddClientModalVisible, setAddClientModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [listCustomersPageUrl, setListCustomersPageUrl] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [backscreen, setBackScreen] = useState('')
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
    const effectivePhaseId = phaseId || route.params?.phaseId
    setPrId(effectivePropertyId)
    console.log("Effective Property ID for use:", effectivePropertyId);
    console.log("Effective phase ID for use:", effectivePhaseId);

    const nestedBackScreen = route.params?.params?.backScreen;
    const directBackScreen = route.params?.backScreen;
    const effectiveBackScreen = nestedBackScreen || directBackScreen;

    if (effectiveBackScreen) {
      console.log("Navigated from:", effectiveBackScreen);
      setBackScreen(effectiveBackScreen)
    } else {
      console.log("No Back Screen provided in route params.");
    }

    const fetchPropertyAndCustomers = async () => {
      setLoading(true);
      setError('');

      try {
        // Fetching property details
        if (effectivePropertyId && effectivePhaseId) {
          setCurrentPropertyId(effectivePropertyId);
          const details = await fetchPropertyDetails(effectivePropertyId, effectivePhaseId, true);
          setPropertyDetails(details.propertyDetails);
          setPhaseDetails(details.phaseDetails);

          const fetchedSliderImages = details.propertyDetails.images
          .filter(img => img.is_slider_image)
          .sort((a, b) => a.slider_image_order - b.slider_image_order)
          .map(img => ({ uri: img.image, key: img.id.toString() }));

        // Check if the fetched images are fewer than 3
        if (fetchedSliderImages.length < 3) {
          const requiredDummyImages = 3 - fetchedSliderImages.length;
          const dummyImages = dummyImageUris.slice(0, requiredDummyImages).map((uri, index) => ({
            uri,
            key: `dummy-${index}`  // Unique key for each dummy image
          }));
          setCarouselImages([...fetchedSliderImages, ...dummyImages]);
        } else {
          setCarouselImages(fetchedSliderImages);
        }
        const fetchedGalleryImages = details.propertyDetails.images
          .filter(img => !img.is_thumbnail && !img.is_slider_image)
          .map(img => ({ uri: img.image, key: img.id.toString() }));

        if (fetchedGalleryImages.length < 6) {
          const requiredDummyGalleryImages = 6 - fetchedGalleryImages.length;
          const dummyGalleryImages = dummyGalleryImageUris.slice(0, requiredDummyGalleryImages).map((uri, index) => ({
            uri,
            key: `dummy-gallery-${index}`
          }));
          setGalImages([...fetchedGalleryImages, ...dummyGalleryImages]);
        } else {
          setGalImages(fetchedGalleryImages);
        }

        } else {
          throw new Error("No property ID provided");
        }
      
        const { customers: fetchedCustomers, nextPage: nextPageUrl } = await fetchSoCustomersList(paramsToken, paramsSoId);
        if (!fetchedCustomers.error) {
          const sortedCustomers = fetchedCustomers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setCustomers(sortedCustomers);
          setListCustomersPageUrl(nextPageUrl)
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

    fetchPropertyAndCustomers();
  }, [currentPropertyId, route.params]);

  if (loading) {
    return <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{ flex: 1, justifyContent: 'center' }} />;
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



  if (!propertyDetails) {
    return <><Text>Property details not found.</Text> {console.log(propertyId)}</>;
  }

  const amenitiesArray = propertyDetails?.amenities?.map(item => ({
    name: item.name,
    logo: item.logo
   })) || [];

  const handleCustomerSelect = (selectedName) => {
    console.log("selectedName", selectedName)
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
      const response = await postCrmLead(paramsToken, propertyDetails.id, phaseDetails.id, selectedCustomer.id, assignedSoId);
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

  const handleBack = () => {
    if (backscreen==="Home") {
      navigation.navigate("SO home", {
        screen: "SO home",
      });
    
    } else if(backscreen==="Properties"){
      navigation.navigate("SO Sites", {
        screen: "SO Properties",
      });
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
     <View style={styles.slidingContainer}>
      <SlidingCarousel images={carouselImages}/>
    </View>
    <View style={styles.cityConatiner}>
    <Text style={styles.cityText}>{propertyDetails.name}</Text>
      <Text style={styles.cityAmount}>₹ {phaseDetails.price_from}/sqft</Text>
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
       <DetailItems details={propertyDetails.details} phaseDetails={phaseDetails}
       showAll={showAll} setShowAll={setShowAll}/>
    </View> 
    <AmenitiesDisplay ref={amRef} amenities={amenitiesArray} />
    <View ref={gmRef} style={styles.gmContainer}>
      <Text style={styles.gmHeader}>Gallery:</Text>
      <View style={styles.galleryContainer}>
        {galImages.length > 0 ? (
          galImages.map((image, index) => (
            <TouchableOpacity key={index} style={styles.imageWrapper}>
             <Image
                source={image.key.includes('dummy-gallery') ? image.uri : { uri: image.uri }}
                style={styles.image}
            />
            </TouchableOpacity>
          ))
        ) : (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'Poppins', fontWeight: '500', fontSize: 12 }}>Gallery images not provided.</Text>
          </View>
        )}
    </View>
    </View>
    <AddClientModal
        label= "Client"
        modalVisible={isAddClientModalVisible}
        setModalVisible={setAddClientModalVisible}
        selectedValue={selectedValue}
        setSelectedValue={handleCustomerSelect} // Pass the function to handle selection
        initialOptions={["Add New Customer", ...customers.map(customer => customer.name)]}
        onDone={handleDone} 
        showSuccessMessage={showSuccessMessage}
        navigation={navigation}
        propertyId={prId}
        nextCustomerPageUrl={listCustomersPageUrl}
        setCustomers={setCustomers}// Map customer names as options
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