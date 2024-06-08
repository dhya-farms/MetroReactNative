import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, Dimensions, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// If `styles` are defined within this component, keep them here,
// or move to a separate file if they are shared across components.



const { width } = Dimensions.get('window');

const ImageScrollView = ({ properties, navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();

    useEffect(() => {
      if (properties.length <= 1) {
          return; // Do not start the interval if there's only one or no property
      }

      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
            const nextIndex = prevIndex === properties.length - 1 ? 0 : prevIndex + 1;
            if (flatListRef.current) {
                // Ensure the nextIndex is within bounds before scrolling
                if (nextIndex < properties.length) {
                    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
                }
            }
            return nextIndex;
        });
    }, 3000); // Change item every 3 seconds

    return () => clearInterval(interval);
   }, [properties.length]);


  const renderPagination = () => {
    if (properties.length <= 1) {
        return null; // Do not render pagination if there's only one property
    }

    return (
      <View style={styles.mainPaginationContainer}>
        {properties.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    );
  };


      const renderImageItem = ({ item }) => {

        const imageSrc = item.images.length > 0 ? { uri: item.images[0].image } : require('../../assets/images/Sarav.png');

        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("properties", {
              screen: "Show Properties",
              params: { propertyId: item.propertyId, phaseId: item.id, backScreen: "Home"},
            })}
            style={styles.bannerContainer}
          >
            <Image source={imageSrc} style={styles.bannerImage} />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerText}>{item.name}</Text>
              <Text style={[styles.bannerText, { fontWeight: '500', fontSize: 10, marginBottom: 5 }]}>
                {item.displayText}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="location-on" size={12} color="#FFFFFF" />
                <Text style={[styles.bannerText, { fontWeight: '500', fontSize: 8 }]}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };
      

      return (
        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
            ref={flatListRef}
            data={properties}
            renderItem={renderImageItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={properties.length > 1} 
            onMomentumScrollEnd={(event) => {
              // Calculate the current page after scrolling ends
              const currentPage = Math.floor(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(currentPage);
            }}
            getItemLayout={(data, index) => ({
              length: 320, // Use fixed width of 320 as per your requirement
              offset: 320 * index,
              index,
            })}
            style={{width: 320,}}
          />
          {renderPagination()}
        </View>
      );
  };

const styles = StyleSheet.create({
    mainPaginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      paginationDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      paginationDotActive: {
        backgroundColor: '#1D9BF0',
      },
      paginationDotInactive: {
        backgroundColor: '#C4C4C4',
      },
      bannerContainer: {
        width: 320,
        height: 209.52,
        overflow: 'hidden', // Ensure the image border radius is applied
        borderRadius: 10, 
        position: 'relative',// You can also apply the border radius here
      },
      bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10, // Make sure this is here, adjust value as needed
     },
     bannerTextContainer:{
      position: 'absolute', // Position the container absolutely
      bottom: 0, // Align it to the bottom of the bannerContainer
      left: 0, // Align it to the left of the bannerContainer
      right: 0, // Align it to the right of the bannerContainer
      padding: 6, // Add some padding
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
     },
     bannerText:{
      fontFamily: 'Poppins',
      fontWeight: '700',
      fontSize: 14,
      color: '#fff',
     },
  });

export default ImageScrollView;