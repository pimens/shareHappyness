import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View, Image } from 'react-native';
import { Container, Content, Card,  Thumbnail, Button, Icon, Tab, Tabs } from 'native-base';

import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      notif: [],

    };
  }
  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.refresh();
  }
  handleBackPress = () => {
    // BackHandler.exitApp()
  }
  refresh = () => {
    Axios.get(this.props.server + 'index.php/home/getDataHome/' + this.props.userData.id).then((response) => {
      this.setState({ data: response.data })
    });
    Axios.get(this.props.server + 'index.php/home/getNotifikasi/' + this.props.userData.id).then((response) => {
      this.setState({ notif: response.data })
      this.props.setNotif(response.data[0].j)
      // console.warn(response.data[0].j)
    });
  }
  detail = (id) => {
    console.warn(id);
    this.props.setBarangDetail(id);
    this.props.navigation.navigate('DetailBarang');
  }
  render() {
    return (
      <Container>
        <View style={{ backgroundColor: "#bdc3c7", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
          <Appbar navigation={this.props.navigation} />
          <Content>
            <View style={{ margin: 5 }}>
              {
                this.state.data.map((data, i) => {
                  return (
                    <Card key={i}>
                      <View style={{ flexDirection: "row", padding: 5 }}>
                        <Thumbnail source={{ uri: this.props.server + data.image1 }} />
                        <View style={{
                          alignItems: "center", margin: 5, flexDirection: "row", flex: 1,
                          justifyContent: "space-between"
                        }}>
                          <View>
                            <Text>{data.nama}</Text>
                            <View style={{flexDirection:"row"}}>
                              <Icon name="attach" style={{ fontSize: 15,marginRight: 4,}} />
                              <Text>{data.j}</Text>
                              <Icon name="calendar" style={{ fontSize: 15,marginRight: 4,marginLeft: 10,}} />
                              <Text>{data.tanggal}</Text>
                              <Icon name="pin" style={{ fontSize: 15,marginRight: 4,marginLeft: 10,}} />
                              <Text>{data.lokasi}</Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() => this.detail(data.id)}
                            style={{ margin: 15 }}>
                            <Icon name="more" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Card>
                  )
                })
              }
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    server: state.server,
    userData: state.userData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setBarangDetail: (barangDetail) => dispatch({ type: 'DETAIL_BARANG', data: barangDetail }),
    setNotif: (notif) => dispatch({ type: 'NOTIF', data: notif })

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
