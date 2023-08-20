import React, { Fragment, useState, useEffect }from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet,
TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import encodeUtf8 from 'encode-utf8';
import md5 from 'crypto-js/md5';

 // const uri = 'https://www.example.com:8080/path/to/resource?param1=value1&param2=value2';
class MotpToken  {

   this.defaultAlgorithm = "md5",  // hash funktion
   this.defaultPeriod = 10, // la duree d'un otp
   this.defaultDigits = 6, // le nombre charactère d'un otp
   this.tokenType = "motp", // type de l'otp
   issuer = '', // initialise par le url
   secret = '', // initialise par le url
   pin = '', // pin est entre par l'utilisateur
   currentOTP = '', // l' otp
   waitingForPin= false; // quand affiche le textfield du pin,
   waitingForOtp= false; //quand affiche le textfield du otp,
   displaysRemaining = 0; // trois otps sont affiché pour chaque fois que la demande est declenché

    const tokens = []; // liste des tokens

   /* retourne l'otp */
    get recentOTP(){
    return '${this.currentOTP}';
    }
  /* initialise l'otp */
    set recentOTP(otp){
    this.currentOTP = otp;
    }

        /* voici unpeu a quoi le constructeur qui
        initialise le secret et le issuer va ressembler
        */
         createToken(tokenUri){

             // Apres avoir scanner le qr code, les donnees a l'interieur
            // sont sauvegarder dans un string "tokenUri"
            String tokenUri = "otpauth://motp/GOOGLE?secret=GAYDAMCCIFCEKQKGIZCTCMZTG4&";

            // Ensuite il faut convertir le string en Url en utilisant urlParse(tokenUri)
            const parsedUri = urlParse(tokenUri); // changes string to uri
            checkTokenType = parsedUri.host; // le host du url detient le tokentype c.a.d le "motp"
            this.secret = parsedUri.query; // le query du url detient le "secret" c.a.d "GAYDAMCCIFCEKQKGIZCTCMZTG4"
            this.issuer = parsedUri.path;// le path du url detient le "issuer" c.a.d "GOOGLE"

            /* donc l'objectif serait de pouvoir retirer ces informations du text,
                 qui est caché derriere les qr codes pour pouvoir initialiser le secret
                 et le issuer. s'il te plait verifie aussi que les resultats du secret
                 et du issuer s'affiche comme cela
             */
}

    /* la production du otp */
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
        /*  le timer */
  getCurrentCountdownInSeconds() {
       milliseconds = Date.now();
       seconds = milliseconds ~/ 1000;
      return this.defaultPeriod - seconds % this.defaultPeriod;
    }

 /* je voulais les sauvegarder en temps que object json */
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

/* ici je voulais ajouter les tokens dans la liste */
    addToken(tokenUri){
    tokens.push(MotpToken.createToken(tokenUri));
    }


};
 export default MotpToken;
