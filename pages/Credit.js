import React, { Component } from 'react';
import { View, Text, Image,TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'native-base';

class Credit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={require('../assets/credit.png')} style={{ width: '75%', height: '75%',borderRadius:70 }} />
                <View style={{ flexDirection: "row", alignItems: "center", margin: 20 }}>
                    <TouchableOpacity
                        style={{ margin : 7 }}
                        onPress={ ()=>{ Linking.openURL('https://github.com/pimens/')}}
                    >
                         <Icon name='logo-github' style={{fontSize: 50, margin : 5 }} />                
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{margin : 7 }}
                        onPress={ ()=>{ Linking.openURL('https://www.facebook.com/nike.biru')}}
                    >
                        <Icon name='logo-facebook' style={{fontSize: 50, margin : 5,color:"#192a56" }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ margin : 7 }}
                        onPress={ ()=>{ Linking.openURL('https://www.instagram.com/piimennn/')}}
                    >
                          <Icon name='logo-instagram' style={{fontSize: 50, margin : 5,color:"#c0392b" }} />
                    </TouchableOpacity>
                  </View>
                   
            </View>

        );
    }
}

export default Credit;
