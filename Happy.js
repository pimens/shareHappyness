import React from 'react';
import { Image, StyleSheet, Button,AsyncStorage, View, Text, StatusBar } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation'; // Version can be specified in package.json
import { Icon, Container, Header, Content } from 'native-base';
import Home from './pages/Home';
import Login from './pages/Login';
import SplashScreen from './pages/Splash';

const CustomContent = (props) => {
  return (
    <Container>
      {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
      <Header style={{ backgroundColor: 'white', height: 100 }}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require('./assets/logo.png')} style={{ width: 150, height: 100 }} />
        </View>
      </Header>
      <Content style={{ backgroundColor: '#1e272e' }}>
        <DrawerItems {...props} />
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },

  buttonText: {
    padding: 20,
    color: 'black'
  }
});
const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    // navigationOptions: {
    //   drawerLabel: 'Beranda',
    //   drawerIcon: ({ tintColor }) => (
    //     <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
    //   )
    // }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      drawerLabel: () => null,    
      drawerLockMode: 'locked-close'
 
      // drawerIcon: ({ tintColor }) => (
      //   <Icon name="md-copy" style={{ fontSize: 25, color: tintColor }} />
      // )
    }
  },
}, {
    initialRouteName: 'Login',
    drawerPosition: 'left',
    contentComponent: CustomContent,
    unmountInactiveRoutes: true,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      inactiveTintColor: "white",
      activeBackgroundColor: "black",
      activeTintColor: '#FF9800',
      labelStyle: {
        color: "white"
      }
    }
  },
);



const AppContainer = createAppContainer(MyDrawerNavigator);
export default class Happy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // view: <SplashScreen />
      view: <AppContainer />

    };
  }  
  // componentWillMount() {
  //   setTimeout(() => {
  //     //IF FALSE NAVIGATE TO ERROR
  //     if (true) {
  //       this.setState({
  //         view: <AppContainer />
  //       })
  //     }
  //   }, 800) //TIME OF WAITING
  // }
  render() {
    return (
        <AppContainer />
    )
  }

  // render() {
  //   return <AppContainer />;
  // }
}

