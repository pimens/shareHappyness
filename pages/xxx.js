import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
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
    };
  }
  componentDidMount() {
    this.refreshData();
    console.warn(this.props);
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:'605323385202-b5q05o5pg67tu8gtr8lsct5p267bv2df.apps.googleusercontent.com',
    });
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
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.warn('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  launchCamera = () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.warn('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  launchLibrary = () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.warn('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };
  refreshData = () => {
    this.state.db.transaction(tx => {
      tx.executeSql("SELECT * FROM catatan", [], (tx, results) => {
        var temp = [];
        let tot = 0;
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          let x = parseInt(results.rows.item(i).biaya);
          tot = tot + x;
        }
        this.setState({
          curentPengeluaran: temp,
        });
      });
    });
  }
  loginPage = () => {

  }
  render() {
    return (
      <View>
        <Text> Login Page </Text>
        {
          this.state.curentPengeluaran.map((data, i) => {
            return (
              <View key={i}>
                <Text>
                  {data.biaya}
                </Text>
                <Text>
                  {i}
                </Text>
              </View>
            )
          })
        }
        <View style={{ margin: 19 }}>
          <TextInput
            placeholder="Biaya"
            value={this.state.biaya}
            // style={styles.inp}
            onChangeText={(text) => this.setState({ biaya: text })}
          />
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            onPress={this.launchLibrary.bind(this)}>
            {/* onPress={this.props.addData}> */}
            <Text style={{ color: "white" }}>Edit Data {this.props.count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.chooseFile.bind(this)}>
            <Text>Choose File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={{ color: "white" }}>Edit Data {this.props.count}</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
       
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  inp: {
    marginLeft: 3,
    color: "black",
    backgroundColor: "#d2dae2",
    borderBottomWidth: 4, borderBottomColor: "#353b48",
    borderTopWidth: 4, borderTopColor: "#353b48",
    flex: 1, borderRadius: 10
  },
  textTot: {
    marginLeft: 3,
    backgroundColor: "#1e272e",
    color: "#ffa502", fontSize: 25,
    borderBottomWidth: 4, borderBottomColor: "#ffa502",
    flex: 1, borderRadius: 10
  },

});

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);



































import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
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
    };
  }
  componentDidMount() {
    this.refreshData();
    console.warn(this.props);   
  }
  
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.warn('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  launchCamera = () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.warn('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  launchLibrary = () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.warn('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };
  refreshData = () => {
    this.state.db.transaction(tx => {
      tx.executeSql("SELECT * FROM catatan", [], (tx, results) => {
        var temp = [];
        let tot = 0;
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          let x = parseInt(results.rows.item(i).biaya);
          tot = tot + x;
        }
        this.setState({
          curentPengeluaran: temp,
        });
      });
    });
  }
  loginPage = () => {
    const fd = new FormData();    
        fd.append('image', this.state.filePath.data);
   
    fd.append('name', 'xxxx.jpg');  
    Axios.post("http://192.168.1.6/apireact/index.php/tps/tesAdd",fd)
    .then((response)=>{
      console.warn(response.data);
    });

  }
  render() {
    return (
      <View>
        <Text> Login Page </Text>
        {
          this.state.curentPengeluaran.map((data, i) => {
            return (
              <View key={i}>
                <Text>
                  {data.biaya}
                </Text>
                <Text>
                  {i}
                </Text>
              </View>
            )
          })
        }
        <View style={{ margin: 19 }}>
          <TextInput
            placeholder="Biaya"
            value={this.state.biaya}
            // style={styles.inp}
            onChangeText={(text) => this.setState({ biaya: text })}
          />
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            onPress={this.launchLibrary.bind(this)}>
            {/* onPress={this.props.addData}> */}
            <Text style={{ color: "white" }}>Edit Data {this.props.count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.chooseFile.bind(this)}>
            <Text>Choose File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            onPress={this.loginPage}>
            <Text style={{ color: "white" }}>Edit Data {this.props.count}</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
       
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  inp: {
    marginLeft: 3,
    color: "black",
    backgroundColor: "#d2dae2",
    borderBottomWidth: 4, borderBottomColor: "#353b48",
    borderTopWidth: 4, borderTopColor: "#353b48",
    flex: 1, borderRadius: 10
  },
  textTot: {
    marginLeft: 3,
    backgroundColor: "#1e272e",
    color: "#ffa502", fontSize: 25,
    borderBottomWidth: 4, borderBottomColor: "#ffa502",
    flex: 1, borderRadius: 10
  },

});

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
