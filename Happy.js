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
import Peminat from './pages/Peminat';
import FormApply from './pages/Barang/FormApply';
import Notifikasi from './pages/Notifikasi';
// import Tabs from './pages/Tab'
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

const Brgku = createStackNavigator(
  {
    DaftarBarang: {
      screen: Barangku,
    },
    Peminat: {
      screen: Peminat,
    },
    EditBarang: {
      screen: EditBarang,
    },
  },
  {
    headerMode: 'none',
  }
);
const homeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    DetailBarang: {
      screen: DetailBarang,
    },
    FormApply: {
      screen: FormApply,
    },
  },
  {
    headerMode: 'none',
  }
);
const DrawerHome = createDrawerNavigator({
  Home: {
    screen: homeStack,
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
  // Barangku: Brgku,
  Barangku: {
    screen: Brgku,
    navigationOptions: {
      drawerLabel: 'My Barang',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  BarangApply: {
    screen: BarangApply,
   
  },
  Notifikasi: {
    screen: Notifikasi,
    navigationOptions: {
      header: null,
      drawerLabel: () => null,
      drawerLockMode: 'locked-close'
    }
  },
  // EditBarang: {
  //   screen: EditBarang,
  //   navigationOptions: {
  //     header: null,
  //     drawerLabel: () => null,
  //     drawerLockMode: 'locked-close'
  //   }
  // },
  // Peminat: {
  //   screen: Peminat,
  //   navigationOptions: {
  //     header: null,
  //     drawerLabel: () => null,
  //     drawerLockMode: 'locked-close'
  //   }
  // },
  // DetailBarang: {
  //   screen: DetailBarang,
  //   navigationOptions: {
  //     header: null,
  //     drawerLabel: () => null,
  //     drawerLockMode: 'locked-close'
  //   }
  // },
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
const AppStack = createStackNavigator({ Login: Login, Foto: Foto }, { headerMode: 'none' });
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

