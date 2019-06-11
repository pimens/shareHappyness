import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Axios from 'axios';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content } from 'native-base';
import Appbar from './components/Appbar';

class Peminat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.refresh();
    }
    refresh = () => {
        Axios.get(this.props.server + 'index.php/home/getPeminat/' + this.props.barangEdit)
            .then((response) => {
                console.warn(response.data)
                this.setState({ data: response.data })
            })
    }
    save = (idUser) => {
        console.warn(idUser, this.props.barangEdit)
        Axios.post(this.props.server + 'index.php/home/savePilihanUser/' + idUser + '/' + this.props.barangEdit)
            .then((response) => {
                this.props.navigation.navigate('Barangku');
            })
    }
    render() {
        return (
            <Container>
                <Appbar navigation={this.props.navigation} tool={false} />
                <Content>
                    {
                        this.state.data.map((data, i) => {
                            return (
                                <View>
                                    <View style={{ flexDirection: "row", marginHorizontal: 5, marginTop: 4, marginBottom: 3 }}>
                                        <View style={{justifyContent:"center",alignItems:'center'}}>
                                            <Image
                                                key={data.foto}
                                                source={{ uri: this.props.server + data.foto }}
                                                style={{ width: 100, height: 100, borderRadius: 10 }} />
                                        </View>
                                        <View style={{ marginLeft: 5, flex: 1 }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ width: "30%",color:"black" }}>Nama </Text>
                                                    <Text style={{ width: "60%",color:"black" }}>: {data.namapeminat}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ width: "30%",color:"black" }}>Alasan </Text>
                                                    <Text style={{ width: "60%",color:"black" }}>: {data.alasan}</Text>
                                                </View>                                                
                                            </View>

                                            <View style={{ justifyContent: "center" }}>
                                                <TouchableOpacity
                                                    onPress={() => this.save(data.peminat)}
                                                    style={{ backgroundColor: "#222f3e",borderRadius:4, width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{ color: "white" }}>Pilih</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }} />
                                </View>
                            )
                        })
                    }
                </Content>
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
export default connect(mapStateToProps, mapDispatchToProps)(Peminat);

