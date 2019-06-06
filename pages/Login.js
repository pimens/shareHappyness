import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { connect } from 'react-redux'
import Axios from 'axios';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
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
      password: '',
      d:'not'
    };
  }
  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      this.setState({d:"berhasil"})
      console.warn(userInfo);
      // this.setState({ userInfo: userInfo });
      
    } catch (error) {
      console.warn('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn('Play Services Not Available or Outdated');
      } else {
        console.warn('Some Other Error Happened');
      }
    }
  };
  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      console.error(error);
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {

    this.state.db.transaction(tx => {
      tx.executeSql("SELECT * FROM session", [], (tx, results) => {
        console.warn(results.rows.item(0))
      });
    });
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:'605323385202-b5q05o5pg67tu8gtr8lsct5p267bv2df.apps.googleusercontent.com',
    });

  }
  redHome = () => {
    this.props.navigation.navigate('Home');
  }
  loginPage = () => {
    const fd = new FormData();
    fd.append('email', this.state.email);
    fd.append('password', this.state.password);
    Axios.post("http://192.168.1.6/apireact/index.php/tps/login", fd)
      .then((response) => {
        if (response.data != 'gagal') {
          this.state.db.transaction(tx => {
            tx.executeSql("insert into session (email,status)" +
              "values ('" + this.state.email + "','1')",
              [],
              (tx, results) => {
                console.warn("berhasi");
                this.props.setDataUser(response.data);
                this.redHome();
              });
          });
        }
        else {
          console.warn('gagal');
        }
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
            style={{ backgroundColor: "green" }}
            onPress={this.loginPage}>
            <Text style={{ color: "white" }}>Login {this.props.userData.nama} {this.state.d}</Text>
          </TouchableOpacity>
          <GoogleSigninButton
          style={{ width: 312, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn}
        />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    count: state.count,
    userData: state.userData,
    server: state.server
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setDataUser: (userData) => dispatch({ type: 'ADD_TO_CART', data: userData })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
