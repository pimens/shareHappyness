import React from 'react';
import { Image, View, StatusBar, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Container, Header, Content } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import { withNavigation } from 'react-navigation';
class Foto extends React.Component {
  constructor(props) {
    super(props);
    const db = openDatabase({
      name: 'catat.db',
      location: 'default',
      createFromLocation: '~www/catat.db',

    });
    this.state = {
      db: db,
      email: '' //enggap saja ketika dia tap button email ke ambil dari google play
    };
  }
  go = () => {

  }
  logout = () => {
    this.state.db.transaction(tx => {
      tx.executeSql("delete FROM session where status=1", [], (tx, res) => {
        console.log("berhasil hapus", results.rows.item(0))
        this.go();
      });
    });
    this.props.navigation.navigate('Auth')
  }
  render() {
    return (
      <View>
        <Header style={{ backgroundColor: '#192a56', height: 150, }}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <View style={{ justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
            <Image source={{ uri: 'http://192.168.1.4/apireact/data/user/' + this.props.userData.foto }}
              style={{ width: 80, height: 80, borderRadius: 50 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
              <View style={{ margin: 5 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name='person' style={{ marginRight: 5, fontSize: 15, color: "white" }} />
                  <Text style={{ color: "white" }}>{this.props.userData.nama}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name='pin' style={{ marginRight: 5, fontSize: 15, color: "white" }} />
                  <Text style={{ color: "white" }}>{this.props.userData.lokasi}</Text>
                </View>
              </View>
              <View style={{margin:5,alignItems:"center"}}>
                <Icon name='settings' style={{ margin: 5, fontSize: 15, color: "white" }} />
              </View>
            </View>
          </View>
        </Header>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    server: state.server
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Foto));