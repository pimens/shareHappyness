import React from 'react';
import { Image, View,StatusBar,Text } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Container, Header, Content } from 'native-base';

class Foto extends React.Component { 
  render() {
    return (
      <View>
        <Header style={{ backgroundColor: 'white', height: 150, }}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <View style={{ justifyContent: "center", alignItems: "flex-start", width: "100%" }}>           
            <Image source={{ uri: 'http://192.168.1.6/apireact/data/foto/' + this.props.userData.foto }}
              style={{ width: 80, height: 80, borderRadius: 50 }} />
            <Text></Text>
          </View>
        </Header>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Foto);