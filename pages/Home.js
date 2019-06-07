import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View, Image } from 'react-native';
import { Container, Content, Footer, Header, Icon } from 'native-base';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      notif:[],

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
      console.warn(response.data[0].j)
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
        <View style={{ backgroundColor: "black", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
          <Appbar navigation={this.props.navigation} />
          <Content>
            {
              this.state.data.map((data, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.detail(data.id)}
                    style={{ backgroundColor: "red" }}>
                    <Text>{data.nama}</Text>
                    <Text>{data.j}</Text>
                  </TouchableOpacity>
                )
              })
            }
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{ backgroundColor: "red" }}>
              <Text>xxxxxxx</Text>
            </TouchableOpacity>
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
