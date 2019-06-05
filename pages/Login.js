import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { connect } from 'react-redux'
import Axios from 'axios';
//login jgn masukin drawer nnti passsing props aja ke logins
class Login extends Component {
  static navigationOptions = {
    drawerLockMode: 'locked-close'
  };
  constructor(props) {
    super(props);
    const db = openDatabase({
      name: 'catat.db',
      location: 'default',
      createFromLocation: '~www/catat.db',

    });
    this.state = {
      db: db,
      curentPengeluaran: [],
      filePath: {},
      currentUser: {},
      email: '', //enggap saja ketika dia tap button email ke ambil dari google play
      password: ''
    };
  }
  refreshData = () => {
    this.state.db.transaction(tx => {
      tx.executeSql("SELECT * FROM session where status=1", [], (tx, results) => {
        if (results.rows.length === 1) {
          this.setState({
            currentUser: results.rows.item(0),
          });
          const fd = new FormData();
          fd.append('email', results.rows.item(0).email);
          fd.append('password', this.state.password);
          Axios.post("http://192.168.1.6/apireact/index.php/tps/login", fd)
            .then((response) => {              
              this.props.setDataUser(response.data);           
            }).then(()=>this.props.navigation.navigate('Home'));
        }       
      });
    });
  }
  loginPage = () => {
    this.state.db.transaction(tx => {
      tx.executeSql("insert into session (email,status)" +
        "values ('" + this.state.email + "','1')",
        [],
        (tx, results) => {
          this.refreshData();
        });
    });
    const fd = new FormData();
    fd.append('email', this.state.email);
    fd.append('password', this.state.password);
    Axios.post("http://192.168.1.6/apireact/index.php/tps/login", fd)
      .then((response) => {
        console.warn("berhasil login");
      });
  }
  render() {
    return (
      <View>
        <View style={{ margin: 19, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Biaya"
            value={this.state.biaya}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            placeholder="Paass"
            value={this.state.biaya}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            onPress={this.loginPage}>
            <Text style={{ color: "white" }}>Login {this.props.userData.nama}</Text>
          </TouchableOpacity>         
        </View>
      </View>
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
    setDataUser: (userData) => dispatch({ type: 'ADD_TO_CART', data: userData })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
