import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View, Image } from 'react-native';
import { Container, Content, Footer, Header, Icon } from 'native-base';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
class BarangApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []

    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.refresh();
  }
  handleBackPress = () => {
    BackHandler.exitApp()
  }
  refresh = () => {
    Axios.get(this.props.server + 'index.php/home/getDataApply/'+this.props.userData.id).then((response) => {
      this.setState({data: response.data})
    })
  }
  render() {
    return (
      <Container>
        <View style={{ backgroundColor: "black", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
          <Appbar navigation={this.props.navigation} />
          <Content>
            {
              this.state.data.map((data,i)=>{
                return(
                  <TouchableOpacity 
                  style={{backgroundColor:"red"}}>
                      <Text>{data.nama}</Text>
                      <Text>{data.j}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </Content>
        </View>
      </Container>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    server: state.server,
    userData: state.userData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BarangApply);
