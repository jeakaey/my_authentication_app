import React, { Fragment, useState, useEffect }from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet,
TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import encodeUtf8 from 'encode-utf8';
import md5 from 'crypto-js/md5';


class MotpToken  {

   this.defaultAlgorithm = "md5",
   this.defaultPeriod = 10,
   this.defaultDigits = 6,
   this.tokenType = "motp",
   issuer = '',
   secret = '',
   pin = '',
   currentOTP = '',
   waitingForPin= false;
   waitingForOtp= false;
   displaysRemaining = 0;

    const tokens = [];

    get recentOTP(){
    return '${this.currentOTP}';
    }

    set recentOTP(otp){
    this.currentOTP = otp;
    }

    MotpToken.createToken(tokenUri){

  // const uri = 'https://www.example.com:8080/path/to/resource?param1=value1&param2=value2';
  // otpauth://motp/alice@example.com?secret=GAYDAMCCIFCEKQKGIZCTCMZTG4&issuer=Example%20Inc;
  // Parse the URI

    const parsedUri = urlParse(tokenUri);
    checkTokenType = parsedUri.host;
    this.secret = parsedUri.query;
    this.issuer = parsedUri.path;
}
    generateOTP() {
    if (pin == "") { throw Exception("invalid pin");}
    const milliseconds = Date.now();
    cont actualtime = Math.floor((milliseconds/1000)/10).toString();
    const hash = (md5(encodeUtf8(actualtime + secret + pin))).toString();
    const otp = hash.substring(0,6);
    return otp;
}
   generateNextOtp() {
    recentOTP = generateOtp();
    return false;
  }

  getCurrentCountdownInSeconds() {
       milliseconds = Date.now();
       seconds = milliseconds ~/ 1000;
      return this.defaultPeriod - seconds % this.defaultPeriod;
    }

    const toJson={
           'tokenType': "motp",
            'secret': this.secret,
            'digits': defaultDigits,
            'algorithm': "md5",
            'period': defaultPeriod,
            'issuer': this.issuer,
    }
    const map = Map(Object.entries(toJson));

    const fromJson(json){
    this.secret = json['secret'],
    digits = defaultDigits,
    this.issuer = json['issuer'] ?? '',
    period = defaultPeriod,

    }

    addToken(tokenUri){
    tokens.push(MotpToken.createToken(tokenUri));
    }

    createTokenCard(token){
    <View styles.cardView></View>
    }

};
const styles = StyleSheet.create({
cardView:{

}
});
  export default MotpToken;
