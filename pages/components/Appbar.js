import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux'

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        backgroundColor: "#1e272e", width: "100%", borderBottomWidth: 2, borderBottomColor: "#1e272e"
      }}>

        <View style={{
          justifyContent: "center", alignItems: "center",
          flexDirection: "row", marginLeft: 15,
        }}>
          <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ fontSize: 35, color: "#ffa502" }} />
          <Text style={{ marginLeft: 10, fontSize: 25, color: "#ffa502" }}>
            {this.props.userData.nama}
          </Text>
        </View>
        <Icon name="logo-freebsd-devil" style={{ marginRight: 15, fontSize: 25, color: "#ffa502" }} />

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
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Appbar);

