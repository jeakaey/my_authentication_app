import {Divider, Icon} from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView, ScrollView, Text, View, StyleSheet,
TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import urlParse from 'url-parse';
import encodeUtf8 from 'encode-utf8';
import md5 from 'crypto-js/md5';
import MotpToken from './motpToken';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

function TokenList({navigation}){
const uri = 'https://www.example.com:8080/path/to/resource?param1=value1&param2=value2';

    // Parse the URI
    const pin = "1234";
    const secret = "ABGTZHUFDRCTGFDXVGHJ";
    const parsedUri = urlParse(uri);
    const milliseconds = Date.now();
    const actualtime= Math.floor((milliseconds/1000)/10).toString();
    const hash = (md5(encodeUtf8(actualtime + secret + pin))).toString();
    const otp = hash.substring(0,6);


        checkTokenType = parsedUri.host;
        this.secret = parsedUri.query;
        this.issuer = parsedUri.path;

 /* line 35 a 38 etait juste des test d'affichage */

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.titleStyle}> Multitoken Authenticator </Text>
          <Divider width={3} color={'green'}/>
            <Text>Original URI: {uri}</Text>
            <Text>Milli: {milliseconds}</Text>
            <Text>Actual time: {actualtime}</Text>
            <Text>OTP: {otp}</Text>

          <TouchableOpacity style= {styles.addButtonStyle} onPress={() => navigation.navigate('ScannerPage')}>
          <Icon name="add" size={40} color="#ffffff" style={{alignSelf:'center', marginTop: 15}}/>
          </TouchableOpacity>
          <Text style={styles.subtextStyle}> Press + to add a token </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function ScannerPage({navigation}){
const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
      getBarCodeScannerPermissions();
    }, []);
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      navigation.navigate('TokenList');
      addToken(data);
    };

return(
          <View>
                <Text style={styles.titleStyle}> Multitoken Authenticator </Text>
                <Divider width={3} color={'green'}/>
                  <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ justifyContent: 'center', alignSelf: 'center', height:700, width:600, }}
                  />
                <Text style={styles.titleStyle2}> Scan a QR code </Text>
                 <TouchableOpacity style= {styles.closeButtonStyle}
                  onPress={() => navigation.goBack()}>
                  <Icon name="close" size={40} color="#ffffff"
                  style={{alignSelf:'center', marginTop: 15}}/>
                   </TouchableOpacity>
        </View>
   );
}

const Stack = createNativeStackNavigator();

export default function App() {
return(
<NavigationContainer>
<Stack.Navigator initialRouteName="TokenList">
        <Stack.Screen name="TokenList" component={TokenList} options={{headerShown: false}} />
        <Stack.Screen name="ScannerPage" component={ScannerPage} options={{headerShown: false}} />
      </Stack.Navigator>
 </NavigationContainer>
);

}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    closeButtonStyle: {
       backgroundColor:'#259712',
       color: '#259712',
       width: 70,
       right:10,
       height:70,
       borderRadius:100,
       marginTop:deviceHeight / 8,
       bottom:80,
       position:'absolute',
      },
    titleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color : 'green',
          marginTop: 20,
          marginBottom: 20,
            textAlign: 'center',
          },
    titleStyle2: {
          fontSize: 16,
          fontWeight: 'bold',
          color : 'green',
          marginTop: 150,
          alignSelf:'center',
          textAlign: 'center',
          position:'absolute',
          },
    addButtonStyle: {
        backgroundColor:'#259712',
        color: '#259712',
        width: 70,
        height:70,
        borderRadius:100,
        right:10,
        marginTop:deviceHeight / 8,
        marginLeft:280
      },
    logoStyle:{
          flex:1,
          width: 350,
          height:350,
          alignSelf:'center',
          justifyContent: 'center',
          marginTop: deviceHeight / 8,
        },
     subtextStyle:{
         fontSize:12,
         textAlign: "center",
         backgroundColor: "transparent",
         color: "#259712",
         marginTop: deviceHeight / 40,

      },
  });



