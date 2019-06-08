import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View, Image, Picker, RefreshControl } from 'react-native';
import { Container, Content, Card, Thumbnail, Button, Icon, Item, Input } from 'native-base';

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
      sea: '',
      selected: 'nama',
      refreshing: false
    };
  }
  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.refresh();
  }
  handleBackPress = () => {
    // BackHandler.exitApp()
  }
  pickerChange = (value, index) => {
    this.setState({
      selected: value
    });
  }
  refresh = () => {
    Axios.get(this.props.server + 'index.php/home/getDataHome/' + this.props.userData.id).then((response) => {
      this.setState({ data: response.data })
    });
    Axios.get(this.props.server + 'index.php/home/countNotifikasi/' + this.props.userData.id).then((response) => {
      this.setState({ notif: response.data, refreshing: false })
      this.props.setNotif(response.data.j)
      // console.warn(response.data[0].j)
    });
  }
  searching = (v) => {
    if (v === '') { this.refresh() } else {
      Axios.get(this.props.server + 'index.php/home/getDataSearching/'
        + this.props.userData.id + '/' + this.state.selected + '/' + v).then((response) => {
          this.setState({ data: response.data, })
        });
    }
    this.setState({ sea: v, })

  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh();
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
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <View style={{ backgroundColor: '#192a56' }}>
              <View style={{ margin: 0.2 }}>
                <Card>
                  <View style={{ flexDirection: "row", alignItems: "center", margin: 1 }}>
                    <Picker
                      selectedValue={this.state.selected}
                      style={{ height: "100%", width: "25%", }}
                      onValueChange={(itemValue, itemIndex) => this.pickerChange(itemValue, itemIndex)}>
                      <Picker.Item label="By" value="" />
                      <Picker.Item label="Nama" value="nama" />
                      <Picker.Item label="Lokasi" value="lokasi" />
                    </Picker>
                    <Input placeholder="Search" onChangeText={(val) => this.searching(val)} />
                    {
                      this.state.sea === '' ? <View></View> :
                        <Icon name="close" onPress={() => this.setState({ sea: '' })} style={{ margin: 4 }} />
                    }
                    {/* <Icon name="ios-search" onPress={() => this.searching()} style={{ margin: 4 }} /> */}
                  </View>
                </Card>
              </View>
            </View>           
            <View style={{ margin: 5 }}>
            {
              this.state.sea === '' ? <View></View> :
                <Text> Search for : {this.state.sea}</Text>
            }
              {
                this.state.data.map((data, i) => {
                  return (
                    <Card key={i}>
                      <View style={{ flexDirection: "row", padding: 5, justifyContent: "center", alignItems: "center" }}>
                        <Thumbnail source={{ uri: this.props.server + data.image1 }} />
                        <View style={{
                          margin: 5, flexDirection: "row", flex: 1,
                          justifyContent: "space-between", alignItems: 'center'
                        }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 15, color: "black" }}>{data.nama}</Text>
                            <View style={{ flexDirection: "row" }}>
                              <Icon name="attach" style={{ fontSize: 15, marginRight: 4, }} />
                              <Text>{data.j}</Text>
                              <Icon name="calendar" style={{ fontSize: 15, marginRight: 4, marginLeft: 10, }} />
                              <Text>{data.tanggal}</Text>
                              <Icon name="pin" style={{ fontSize: 15, marginRight: 4, marginLeft: 10, }} />
                              <Text>{data.lokasi}</Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() => this.detail(data.id)}
                            style={{ margin: 15, }}>
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
