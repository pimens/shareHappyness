import React from 'react';
import { Image, StyleSheet, Button, AsyncStorage, View, Text, StatusBar } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation'; // Version can be specified in package.json
import { Icon, Container, Header, Content } from 'native-base';
import Home from './pages/Home';
import Login from './pages/Login';
import SplashScreen from './pages/Splash';
import newBarang from './pages/newBarang';
import Foto from './pages/components/Foto';
import Barangku from './pages/Barangku';
import EditBarang from './pages/EditBarang';
import BarangApply from './pages/BarangApply';
import DetailBarang from './pages/Barang/DetailBarang';
import Splash from './pages/Splash';
const CustomContent = (props) => {
  return (
    <Container>
      <Foto />
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
const DrawerLogin = createDrawerNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
      )
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
const DrawerHome = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Beranda',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  addBarang: {
    screen: newBarang,
    navigationOptions: {
      drawerLabel: 'Posting Barang',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  Barangku: {
    screen: Barangku,
    navigationOptions: {
      drawerLabel: 'My Barang',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  BarangApply: {
    screen: BarangApply,
    navigationOptions: {
      drawerLabel: 'Daftar Keinginan',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      drawerLabel: () => null,
      drawerLockMode: 'locked-close'
    }
  },
  // Splash: {
  //   screen: SplashScreen,
  //   navigationOptions: {
  //     header: null,
  //     drawerLabel: () => null,
  //     drawerLockMode: 'locked-close'
  //   }
  // },
  EditBarang: {
    screen: EditBarang,
    navigationOptions: {
      header: null,
      drawerLabel: () => null,
      drawerLockMode: 'locked-close'
    }
  },
  DetailBarang: {
    screen: DetailBarang,
    navigationOptions: {
      header: null,
      drawerLabel: () => null,
      drawerLockMode: 'locked-close'
    }
  },
}, {
    initialRouteName: 'Home',
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
const AppStack = createStackNavigator({ Login: Login,Foto:Foto},{headerMode:'none'});
const Check = createSwitchNavigator(
  {
    Auth: Splash,
    Log: AppStack,
    Beranda: DrawerHome
  },
  {
    initialRouteName: 'Auth',
  }
);

const AppContainer = createAppContainer(Check);
export default class Happy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // view: <SplashScreen />
      view: <AppContainer />

    };
  }
  componentWillMount() {
    // setTimeout(() => {
    //   //IF FALSE NAVIGATE TO ERROR
    //   if (true) {
    //     this.setState({
    //       view: <AppContainer />
    //     })
    //   }
    // }, 800) //TIME OF WAITING
  }
  render() {
    return (
      this.state.view
    )
  }
}

