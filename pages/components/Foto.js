import React from 'react';
import { Image, View, StatusBar, Text, ImageBackground } from 'react-native'
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
        <ImageBackground
          // source={require('../assets/ff.png')}
          source={{ uri: 'http://sampeweweh.dx.am/backend/data/images.jpg' }}
          style={{ width: "100%", height: 150 }}>
          <View style={{ backgroundColor:"#192a56", height: 150, justifyContent: "center", marginLeft: 6 }}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View style={{ justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
              <Image source={{ uri: 'http://sampeweweh.dx.am/backend/data/user/' + this.props.userData.foto }}
                style={{ width: 80, height: 80, borderRadius: 50 }} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <View style={{ margin: 5 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name='person' style={{ marginRight: 5, fontSize: 15, color: "black" }} />
                    <Text style={{ color: "black" }}>{this.props.userData.nama}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name='pin' style={{ marginRight: 5, fontSize: 15, color: "black" }} />
                    <Text style={{ color: "black" }}>{this.props.userData.lokasi}</Text>
                  </View>
                </View>
                <View style={{ margin: 5, alignItems: "center" }}>
                  <Icon onPress={() => this.props.navigation.navigate("EditProfil")} name='settings' style={{ margin: 5, fontSize: 15, color: "black" }} />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
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