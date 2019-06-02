import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux'
class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Beranaaaaaa',
    
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> {this.props.count} </Text>
      </View>
    );
  }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(Home);
