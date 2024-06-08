import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import CardScrollView from '../../components/CarousalCardView';
import ShowAllButton from '../../components/ShowAllButton';
import HeaderContainer from '../../components/HeaderContainer';
import ReportsScrollView from '../../components/ReportCard';
import SOcards from '../../components/SOcard';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/constantstyles/colors';
import { useSoUsers } from '../../contexts/useSoData';
import { fetchStatusRequests } from '../../apifunctions/fetchStatusRequests';



  const reportData = [
    {
        name: 'Daily Report',
        source: require('../../../assets/images/dailyreport.png')
    },
    {
        name: 'Project Report',
        source: require('../../../assets/images/projectreport.png')
    },
    {
        name: 'Payment Report',
        source: require('../../../assets/images/paymentreport.png')
    },
    {
        name: 'Customer Report',
        source: require('../../../assets/images/customerreport.png')
    }
  ]

 const SOManager = ({route, navigation}) => {

  const {soUsers} = useSoUsers();
  const {nextSoPageUrl} = useSoUsers();
  const [soRequests, setSoRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const paramsToken= route.Params?.token
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetchStatusRequests(paramsToken);
        setSoRequests(response.soRequests);
        console.log("so" , response.soRequests)
        setNextPageUrl(response.nextPageUrl);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch status requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.mainContainer}>
        <StatusBar/>
        <HeaderContainer title="SO Manager" 
            ImageLeft={require('../../../assets/images/back arrow icon.png')}
            ImageRight={require('../../../assets/images/belliconblue.png')}
            onPress={()=>{navigation.navigate("Admin home")}}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ShowAllButton text="Approval" onPress={()=> navigation.navigate("SO", { 
      screen: "SO Approvals" ,
      params: { soRequests: soRequests, nextPage: nextPageUrl}
    })}/>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <CardScrollView data={soRequests} onCardPress={(customerId) => {
              navigation.navigate("Client", { 
                screen: "List Customer Details",
                params: { customerId: customerId, backScreen: "soManager"} // Pass customerId to the detail screen
            });
          }}/>
        </View>
        <ShowAllButton text="Reports"/>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <ReportsScrollView reportData={reportData} navigation={navigation} />
        </View>
        <View style={styles.separator} />
        <ShowAllButton text="SO List" onPress={()=> 
         navigation.navigate("SO", { 
          screen: "SO Officers List" ,
          params: { soUsers: soUsers, nextPage: nextSoPageUrl, backScreen: 'SOManager' }
        })}/>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <SOcards data={soUsers}  onCardPress={(SoId) => {
           navigation.navigate("SO", {
            screen: "SO Officers Details",
            params: { SoId: SoId, backScreen: 'SOManager' },
          });
        }}/>
        </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  separator: {
    height: 1,
    backgroundColor: SECONDARY_COLOR,
    alignSelf: 'center',
    width: '90%',
    marginVertical: 16,
  },
});

export default SOManager;