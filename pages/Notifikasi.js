import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View, Image, Linking,TouchableOpacity } from 'react-native';
import { Container, Content, Footer, Header, Icon, Card } from 'native-base';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
class Notifikasi extends Component {
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
    Axios.get(this.props.server + 'index.php/home/getNotifikasi/' + this.props.userData.id).then((response) => {
      this.setState({ data: response.data })
      console.warn(response.data)
    })
  }
  render() {
    return (
      <Container>

        <View style={{ backgroundColor: "#dcdde1", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
        <Appbar navigation={this.props.navigation} tool={false} />         
          <Content>
            {
              this.state.data.map((data, i) => {
                return (
                  <View style={{ marginLeft: 5, marginRight: 5 }}>
                    <Card>
                      {
                        data.hasil === 'y' ?
                          <View>
                            <View style={{ flexDirection: "row", margin: 5 }}>
                              <View style={{ borderRadius: 50, backgroundColor: "green", paddingLeft: 5, paddingRight: 5 }}>
                                <Icon name="checkmark" style={{ color: "white" }} />
                              </View>
                              <Text style={{ marginLeft: 5, marginRight: 5, color: "black", flex: 1 }}>
                                Selamat! Kamu dipilih oleh {data.pemilik} sebagai orang yang berhak mendapatkan {data.nama}
                              </Text>                             
                            </View>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL(
                                  'http://api.whatsapp.com/send?phone=62' + data.nohp
                                )
                              }} style={{backgroundColor:"green",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                              <Text style={{color:"white"}}>Hubungi {data.pemilik} </Text> 
                              <Icon name="logo-whatsapp" style={{ color: "white",fontSize: 10, }} />
                            </TouchableOpacity>
                          </View> :
                          data.hasil === 'not' ?
                            <View style={{ flexDirection: "row", margin: 5 }}>
                              <Icon name="timer" style={{ color: "blue" }} />
                              <Text style={{ marginLeft: 5, color: "black" }}>Sabar, sedang menunggu proses!~~</Text>
                            </View> :
                            <View style={{ flexDirection: "row", margin: 5 }}>
                              <View style={{ borderRadius: 50, backgroundColor: "red", paddingLeft: 5, paddingRight: 5 }}>
                                <Icon name="close" style={{ color: "white" }} />
                              </View>
                              <Text style={{ marginLeft: 5, color: "black", flex: 1 }}>Mohon Maaf anda kurang beruntung mendapatkan {data.nama}</Text>
                            </View>
                      }
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


export default connect(mapStateToProps, mapDispatchToProps)(Notifikasi);
