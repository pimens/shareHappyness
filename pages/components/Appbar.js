import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Badge, Right } from 'native-base';
import { connect } from 'react-redux'
import Tooltip from 'react-native-walkthrough-tooltip'

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipVisible: true
    };
  }

  render() {
    return (
      <View style={{
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        backgroundColor: "#192a56", width: "100%", height: "8%", borderBottomWidth: 2, borderBottomColor: "#7f8c8d"
      }}>
        <View style={{
          justifyContent: "center", alignItems: "center",
          flexDirection: "row", marginLeft: 15,
        }}>
          <View>
            <View style={{ borderColor: "white", borderWidth: 1, padding: 0.1, borderRadius: 50, }}>
              <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu"
                style={{ fontSize: 35, color: "white", marginLeft: 6, marginRight: 6, }} />
            </View>
          </View>
          <Text style={{ marginLeft: 10, fontSize: 25, color: "white", fontFamily: "Ruge Boogie" }}>
            Share Happyness
          </Text>
        </View>
        <View>
          {
            this.props.notif === '0' ? <View></View> :
              this.props.tool === false ?
                <View>
                  <Icon onPress={() => this.props.navigation.navigate('Notifikasi')} name="notifications-outline" style={{ marginRight: 15, fontSize: 35, color: "white" }} />
                  <View style={{ borderRadius: 20, backgroundColor: "red", position: 'absolute', right: 21, top: 8, }}>
                    <Text style={{ marginLeft: 2, marginRight: 2, color: "black" }}>{this.props.notif}</Text>
                  </View>
                </View>
                :
                <Tooltip
                  animated
                  isVisible={this.state.toolTipVisible}
                  content={<Text>Check this out!</Text>}
                  placement="left"
                  onClose={() => this.setState({ toolTipVisible: false })}
                >
                  <Icon onPress={() => this.props.navigation.navigate('Notifikasi')} name="notifications-outline" style={{ marginRight: 15, fontSize: 35, color: "white" }} />
                  <View style={{ borderRadius: 20, backgroundColor: "red", position: 'absolute', right: 21, top: 8, }}>
                    <Text style={{ marginLeft: 2, marginRight: 2, color: "black" }}>{this.props.notif}</Text>
                  </View>
                </Tooltip>
          }
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    count: state.count,
    userData: state.userData,
    notif: state.notif
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Appbar);

