import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import CardScrollView from '../../components/CarousalCardView';
import ShowAllButton from '../../components/ShowAllButton';
import HeaderContainer from '../../components/HeaderContainer';
import ReportsScrollView from '../../components/ReportCard';
import SOcards from '../../components/SOcard';
import { SECONDARY_COLOR } from '../../constants/constantstyles/colors';



const data = [
    {
      name: 'Hari Kowshick (SO)',
      customer: 'Suraj',
      property: 'Metro Shiva Shakthi Residency',
      requestDate: '12/12/2022',
    },
    {
        name: 'Hari Kowshick (SO)',
        customer: 'Suraj',
        property: 'Metro Shiva Shakthi Residency',
        requestDate: '12/12/2022',
        requestType: 'Site visit',
    },
    {
        name: 'Hari Kowshick (SO)',
        customer: 'Suraj',
        property: 'Metro Shiva Shakthi Residency',
        requestDate: '12/12/2022',
        requestType: 'Site visit',
    },
    // ... other card data
  ];
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

  const SOdata  = [
    {
        id: 1,
        name: 'Hari Kowshick',
        number: '+91-9486077810',
        mailId: 'hari@gmail.com',
        points: '7Metro Points',
        clients: '3 Clients',
        source: require('../../../assets/images/soperson.png')
    },
    {
        id: 2,
        name: 'Ranjith',
        number: '+91-9486077810',
        mailId: 'ranjith@gmail.com',
        points: '6Metro Points',
        clients: '2 Clients',
        source: require('../../../assets/images/soperson.png')
    },
    {
        id: 3,
        name: 'Dinesh',
        number: '+91-9486077810',
        mailId: 'dinesh@gmail.com',
        points: '10Metro Points',
        clients: '5 Clients',
        source: require('../../../assets/images/soperson.png')
    }
  ]



const SOManager = ({navigation}) => {

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <StatusBar/>
        <HeaderContainer title="SO Manager" 
            ImageLeft={require('../../../assets/images/back arrow icon.png')}
            ImageRight={require('../../../assets/images/belliconblue.png')}
            onPress={()=>{navigation.goBack()}}/>
        <ShowAllButton text="Approval" onPress={()=> navigation.navigate("SO Approvals")}/>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <CardScrollView data={data} onCardPress={() => {
           navigation.navigate("Client", { screen: "List Customer Details"});
        }}/>
        </View>
        <ShowAllButton text="Reports"/>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <ReportsScrollView reportData={reportData} navigation={navigation} />
        </View>
        <View style={styles.separator} />
        <ShowAllButton text="SO List" onPress={()=> navigation.navigate("SO", { 
         screen: "SO Officers List" })}/>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <SOcards data={SOdata} onCardPress={() => {
           navigation.navigate("SO", { screen: "SO Officers Details"});
        }}/>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
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