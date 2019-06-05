import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
class Barangku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barang: []
        };
    }
    componentDidMount() {
        // console.warn(this.props)
        this.refresh();
    }
    refresh = () => {
        Axios.get(this.props.server+'index.php/tps/getMyBarang/' + this.props.userData.id).then((response) => {
            // console.warn(response.data)
            this.setState({ barang: response.data })
        })
    }
    hapus = (id) => {
        console.warn('hapus', id)
        Axios.get(this.props.server+'index.php/tps/deleteBarang/'+id).then((response) => {
            this.refresh();            
        })
    }
    edit = (id) => {
       this.props.setDataEdit(id);
       this.props.navigation.navigate('EditBarang');
    }
    render() {
        return (
            <View>
                <Appbar navigation={this.props.navigation} />
                {
                    this.state.barang.map((data, i) => {
                        return (
                            <View key={i}>
                                <Text>{data.nama}</Text>
                                <TouchableOpacity
                                    style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#00b894", height: 25, borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                                    onPress={() => this.hapus(data.id)}>
                                    <Text style={{ color: "white" }}>Hapus</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#00b894", height: 25, borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                                    onPress={() => this.edit(data.id)}>
                                    <Text style={{ color: "white" }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                <Text>{this.props.barangEdit.nama}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        barangEdit: state.barangEdit,
        userData: state.userData,
        server : state.server
    }
}
const mapDispatchToProps = (dispatch) => {
    return {        
        setDataEdit: (barangEdit) => dispatch({ type: 'EDIT_BARANG', data: barangEdit })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Barangku);
