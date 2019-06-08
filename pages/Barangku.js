import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
import { Container, Card, Icon } from 'native-base';
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
        Axios.get(this.props.server + 'index.php/tps/getMyBarang/' + this.props.userData.id).then((response) => {
            // console.warn(response.data)
            this.setState({ barang: response.data })
        })
    }
    hapus = (id) => {
        console.warn('hapus', id)
        Axios.get(this.props.server + 'index.php/tps/deleteBarang/' + id).then((response) => {
            this.refresh();
        })
    }
    edit = (id) => {
        this.props.setDataEdit(id);
        this.props.navigation.navigate('EditBarang');
    }
    peminat = (id) => {
        this.props.setDataEdit(id);
        this.props.navigation.navigate('Peminat');
    }
    render() {
        return (
            <Container>
                <Appbar navigation={this.props.navigation} tool={false} />
                {
                    this.state.barang.map((data, i) => {
                        return (
                            <Card key={i}>
                                <View style={{ flexDirection: "row", margin: 10 }}>
                                    <Text style={{ color: "black", marginLeft: 5 }}>{data.nama}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                    <Icon name='pin' style={{ fontSize: 15, }} />
                                    <Text style={{ color: "black", marginLeft: 5 }}>{data.lokasi}</Text>
                                </View>
                                <View style={{ marginRight: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                    <TouchableOpacity
                                        style={{ alignItems: "center", justifyContent: "center" }}
                                        onPress={() => this.hapus(data.id)}>
                                        <View style={{ flexDirection: "row", margin: 10 }}>
                                            <Icon name='trash' style={{ fontSize: 15, color: "#192a56", marginRight: 5, }} />
                                            <Text>Delete</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ alignItems: "center", justifyContent: "center" }}
                                        onPress={() => this.edit(data.id)}>
                                        <View style={{ flexDirection: "row", margin: 10 }}>
                                            <Icon name='create' style={{ fontSize: 15, color: "#192a56", marginRight: 5, }} />
                                            <Text>Edit</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ alignItems: "center", justifyContent: "center" }}
                                        onPress={() => this.peminat(data.id)}>
                                        <View style={{ flexDirection: "row", margin: 10 }}>
                                            <Icon name='eye' style={{ fontSize: 15, color: "#192a56", marginRight: 5, }} />
                                            <Text>{data.j}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        )
                    })
                }
                <Text>{this.props.barangEdit.nama}</Text>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        barangEdit: state.barangEdit,
        userData: state.userData,
        server: state.server
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setDataEdit: (barangEdit) => dispatch({ type: 'EDIT_BARANG', data: barangEdit })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Barangku);
