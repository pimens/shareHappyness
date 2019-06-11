import React, { Component } from 'react';
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content, Icon, Card } from 'native-base';
import Appbar from '../components/Appbar';


class DetailBarang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            alasan: '',
            foto: {
                uri: 'http://192.168.1.4/apireact/data/foto/annisa.jpg'
            },
            image: [],
            app: false
        };
    }
    componentDidMount() {
        this.refresh();
    }
    refresh = () => {
        Axios.get(this.props.server + 'index.php/tps/getBarangById/' + this.props.barangDetail)
            .then((response) => {
                var tmp = [];
                tmp.push(response.data[0].image1);
                tmp.push(response.data[0].image2);
                tmp.push(response.data[0].image3);
                tmp.push(response.data[0].image4);
                tmp.push(response.data[0].image5);
                this.setState({ data: response.data[0], image: tmp })
                console.warn(response.data[0])
            })
    }
    app = () => {
        this.props.navigation.navigate('FormApply')
    }
    render() {
        return (
            <Container>
                <Appbar navigation={this.props.navigation} tool={false} />
                <Content>
                    <Card>
                        <View style={{justifyContent: "center", alignItems: "center", color: "white",
                            fontSize: 20, borderBottomWidth: 3, borderBottomColor: "#222f3e",
                            backgroundColor: "#222f3e", flex: 1, width: "100%",padding:4}}>
                            <Text style={{justifyContent: "center", alignItems: "center", color: "white",
                                fontSize: 20, borderBottomWidth: 3, borderBottomColor: "#222f3e",
                                backgroundColor: "#222f3e"}}>{this.state.data.nama}</Text>
                        </View>
                    </Card>
                    <View style={{ justifyContent: "center", alignItems: "center", color: "black", fontSize: 20 }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {
                                this.state.image.map((data, i) => {
                                    return data === '' ?
                                        <View key={i} style={{ justifyContent: "center", }}>
                                        </View> :
                                        <View key={i} style={{ margin: 10 }}>
                                            <Image source={{ uri: this.props.server + data }}
                                                style={{ width: 250, height: 200, borderRadius: 10 }} />
                                        </View>
                                })
                            }

                        </ScrollView>
                    </View>
                    <View style={{ borderBottomWidth: 2, borderBottomColor: "black" }}>
                        <View style={{ flexDirection: "row", marginHorizontal: 20, alignItems: 'center', flex: 1 }}>
                            <Icon name="pin" style={{ marginRight: 7, }} />
                            <Text style={{ color: "black", fontSize: 15, flex: 1, marginHorizontal: 4 }}>
                                {this.state.data.lokasi}
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 2, borderBottomColor: "black" }}>
                        <View style={{ flexDirection: "row", marginHorizontal: 20, alignItems: 'center', flex: 1 }}>
                            <Icon name="calendar" style={{ marginRight: 7, }} />
                            <Text style={{ color: "black", fontSize: 15, flex: 1, marginHorizontal: 4 }}>
                                {this.state.data.tanggal}
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 2, borderBottomColor: "black" }}>
                        <View style={{ flexDirection: "row", marginHorizontal: 20, alignItems: 'center', flex: 1 }}>
                            <Icon name="clipboard" style={{ marginRight: 7, }} />
                            <Text style={{ color: "black", fontSize: 15, flex: 1, marginHorizontal: 4 }}>
                                {this.state.data.deskripsi}
                            </Text>
                        </View>
                    </View>
                </Content>
                
                <TouchableOpacity
                    onPress={() => this.app()}
                    style={{ backgroundColor: "#192a56", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Icon name="attach" style={{ fontSize: 40, marginRight: 4, color: "white" }} />
                    <Text style={{ fontSize: 40, color: "white" }}>Apply</Text>
                </TouchableOpacity>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        userData: state.userData,
        barangDetail: state.barangDetail
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailBarang);

