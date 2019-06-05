import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View,Image } from 'react-native';
import { Container, Content, Footer, Header, Icon } from 'native-base';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  } 
  handleBackPress = () => {    
    BackHandler.exitApp()
  }
  render() {
    return (
      <Container>
        <View style={{ backgroundColor: "black", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
          <Appbar navigation={this.props.navigation}/>
          <Content>
          <Image source={{ uri: 'http://192.168.1.6/apireact/data/foto/'+this.props.userData.foto}}
            style={{ width: 80, height: 80, borderRadius:50 }} />
          </Content>
        </View>
      </Container>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    count: state.count,
    userData: state.userData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
