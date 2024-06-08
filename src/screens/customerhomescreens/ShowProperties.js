import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator} from 'react-native';
import SlidingCarousel from '../../components/SlidingCarousel';
import LayoutHeader from '../../components/LayoutHeader';
import { TabBar } from '../../components/TabComponent';
import EnquireContainer from '../../components/EnquireContainer';
import HeaderContainer from '../../components/HeaderContainer';
import LayoutImageModal from '../../modals/LayoutImageModal';
import styles from '../../constants/styles/showpropertiesstyles';
import AmenitiesDisplay from '../../components/AmenitiesDisplay';
import { fetchPropertyDetails } from '../../apifunctions/fetchPropertyDetailsApi';
import { DetailItems } from '../../functions/DetailItems';
import { handleBack } from '../../functions/generalHandleBack';
import { truncateText } from '../../functions/truncateText';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';


const dummyImageUri = require('../../../assets/images/Newmetro.jpeg')
const dummyImageUris = new Array(3).fill(dummyImageUri); 

const dummyGalleryImageUri = require('../../../assets/images/Newmetro.jpeg');
const dummyGalleryImageUris = new Array(6).fill(dummyGalleryImageUri);  



const ShowProperties = ({ route, navigation }) => {
  const { propertyId } = route.params?.params || {};
  const {phaseId} = route.params?.params || {};
  const {backScreen} = route.params?.params | {}
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [phaseDetails, setPhaseDetails]= useState([])
  const [loading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState();
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [carouselImages, setCarouselImages]= useState([])
  const [galImages, setGalImages] = useState([])
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState('');
  const scrollViewRef = useRef();
  const [backscreen, setBackScreen] = useState('')
  const desRef = useRef();
  const amRef = useRef();
  const gmRef = useRef();


  useEffect(() => {
    const effectivePropertyId = propertyId || route.params?.propertyId;
    const effectivePhaseId = phaseId || route.params?.phaseId;
    const effectiveBackScreen = backScreen || route.params?.backScreen

    if (effectiveBackScreen) {
      setBackScreen(effectiveBackScreen);
    }

    const getPropertyDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchPropertyDetails(effectivePropertyId, effectivePhaseId, true);
        console.log('property details', details.propertyDetails)
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

      } catch (error) {
        setError(error.message);
        alert('Error fetching property details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    getPropertyDetails();
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

  // Define a function to get plot type text
  const toggleTextShown = () => {
    setTextShown(!textShown);
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
      () => {} 
    );
  };


  if (!propertyDetails) {
    return <><Text>Property details not found.</Text></>;
  }



  const amenitiesArray = propertyDetails?.amenities?.map(item => ({
    name: item.name,
    logo: item.logo
   })) || [];

  
  
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Properties" 
          ImageLeft={require('../../../assets/images/back arrow icon.png')}
          ImageRight={require('../../../assets/images/belliconblue.png')}
         onPress={() => handleBack(backscreen, navigation)}/>     
    <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.contentContainer}>
    <View style={styles.slidingContainer}>
      <SlidingCarousel images={carouselImages}/>
    </View>
    <View style={styles.cityConatiner}>
      <Text style={styles.cityText}>{`${propertyDetails.name} (${propertyDetails.property_type?.name_vernacular})` }</Text>
      <Text style={styles.cityAmount}>₹ {phaseDetails.price_from}/sqft</Text>
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
    <EnquireContainer phoneNumber={propertyDetails.director.mobile_no} email={propertyDetails.director.email}/>
    </ScrollView>
    </View>
  );
};


export default ShowProperties;