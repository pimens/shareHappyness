import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import { withNavigation } from 'react-navigation';
class Logout extends Component {
    constructor(props) {
        super(props);
        const db = openDatabase({
            name: 'catat.db',
            location: 'default',
            createFromLocation: '~www/catat.db',

        });
        this.state = {
            db: db,
        };
    }
    logout = () => {
        this.state.db.transaction(tx => {
            tx.executeSql("delete FROM session where status=1", [], (tx, res) => {
                console.log("berhasil hapus", results.rows.item(0))
               
            });
        });
        this.props.navigation.navigate('Auth')
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{ alignItems: "center", justifyContent: "center", }}
                    onPress={()=>this.logout()}>
                    <Icon name="power" style={{ color: "#192a56", fontSize: 100 }} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(Logout);
