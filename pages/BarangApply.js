import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View, Image, Linking } from 'react-native';
import { Container, Content, Footer, Header, Icon, Card } from 'native-base';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
class BarangApply extends Component {
  static navigationOptions = {
    drawerLabel: "DaftarKeinginann",
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      data: []

    };
  }

  componentDidMount() {
    this.refresh();
  }
  refresh = () => {
    Axios.get(this.props.server + 'index.php/home/getDataApply/' + this.props.userData.id).then((response) => {
      this.setState({ data: response.data })
      console.warn(response.data)
    })
  }
  render() {
    return (
      <Container>
        <View style={{ backgroundColor: "#dcdde1", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
          <Appbar navigation={this.props.navigation} />
          <Content>
            {
              this.state.data.map((data, i) => {
                return (
                  <View style={{ marginLeft: 5, marginRight: 5 }}>
                    <Card>
                      <Text style={{ backgroundColor: "#192a56", color: "white", paddingLeft: 3 }}>{data.nama}</Text>
                      <View style={{ marginLeft: 7 }}>
                        {
                          data.hasil === 'y' ?
                            <View style={{ flexDirection: "row" }}>
                              <Icon name="checkmark" style={{ color: "green" }} />
                              <Text style={{ marginLeft: 5,marginRight:5, color: "black" }}>Selamat!~~</Text>
                              <Icon name="logo-whatsapp" onPress={() => {
                                Linking.openURL(
                                  'http://api.whatsapp.com/send?phone=62'+data.nohp
                                )
                              }} style={{ color: "green" }} />
                            </View> :
                            data.hasil === 'not' ?
                              <View style={{ flexDirection: "row" }}>
                                <Icon name="timer" style={{ color: "blue" }} />
                                <Text style={{ marginLeft: 5, color: "black" }}>Sabar, sedang menunggu proses!~~</Text>
                              </View> :
                              <View style={{ flexDirection: "row" }}>
                                <Icon name="close" style={{ color: "red" }} />
                                <Text style={{ marginLeft: 5, color: "black" }}>Mohon Maaf</Text>
                              </View>
                        }
                      </View>
                    </Card>
                  </View>
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
