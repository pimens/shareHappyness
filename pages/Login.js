import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { connect } from 'react-redux'

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
      curentPengeluaran : []
    };
  }
  componentDidMount() {
    this.refreshData();
    console.warn(this.props);
  }
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
          this.state.curentPengeluaran.map((data,i)=>{
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
            onPress={this.props.addData}>
            <Text style={{ color: "white" }}>Edit Data {this.props.count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={{ color: "white" }}>Edit Data {this.props.count}</Text>
          </TouchableOpacity>
         
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
