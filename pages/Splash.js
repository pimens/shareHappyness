import React from 'react';
import { StatusBar , View , Text , ActivityIndicator,Image } from 'react-native';
export default class Splash extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , backgroundColor : '#e3e3e3'}}>
                <StatusBar backgroundColor="#e3e3e3" barStyle="light-content"/> 
                <View style={{ justifyContent: 'center' , alignItems: 'center' ,width: '50%', height: '50%',borderRadius:30}}>
                <Image source={require('../assets/splash.png')}  />
                </View>
                <ActivityIndicator color={'blue'}/>
            </View>
        )
    }
}