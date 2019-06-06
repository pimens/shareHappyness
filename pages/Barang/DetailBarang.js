import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { connect } from 'react-redux'
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

class DetailBarang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            alasan: '',
            foto: {
                uri: 'http://192.168.1.4/apireact/data/foto/annisa.jpg'
            },
            app: false

        };
    }
    chooseFile = () => {
        var options = {
            quality: 0.1,
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.warn('Response = ', response);
            if (response.didCancel) {
                console.warn('User cancelled image picker');
                alert('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
                alert('ImagePicker Error: ' + response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({ foto: source })

            }
        })
    };
    componentDidMount() {
        this.refresh();
    }
    refresh = () => {
        Axios.get(this.props.server + 'index.php/tps/getBarangById/' + this.props.barangDetail)
            .then((response) => { this.setState({ data: response.data[0] }) })
    }
    app = () => {
        this.setState({app:true})
    }
    save = () => {
        const fd = new FormData();
        fd.append('idbarang',this.props.barangDetail);
        fd.append('peminat',this.props.userData.id);
        fd.append('image',this.state.foto.data);
        fd.append('alasan',this.state.alasan);
        fd.append('idbarang',this.props.barangDetail);
        Axios.post(this.props.server + 'index.php/home/insertDataApply',fd).then((response)=>{
            console.warn(response)
        })
        this.props.navigation.navigate('BarangApply')
    }
    render() {
        return (
            <View>
                {
                    this.state.app ?
                        <View>
                            <TextInput
                                placeholder="Deskripsi Barang"
                                value={this.state.alasan}
                                multiline={true}
                                numberOfLines={4}
                                style={{ height: 75, borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                                onChangeText={(text) => this.setState({ alasan: text })} />
                            <Image source={{ uri: this.state.foto.uri }}
                                style={{ width: 80, height: 80, borderRadius: 50 }} />
                            <TouchableOpacity
                                onPress={() => this.chooseFile()}
                                style={{ backgroundColor: "red" }}>
                                <Text>Foto Pendukung</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.save()}
                                style={{ backgroundColor: "red" }}>
                                <Text>Save</Text>
                            </TouchableOpacity>
                        </View> :
                        <View>
                            <Text>{this.state.data.nama}</Text>
                            <TouchableOpacity
                                onPress={() => this.app()}
                                style={{ backgroundColor: "red" }}>
                                <Text>Apply</Text>
                            </TouchableOpacity>
                            <Text> DetailBarang </Text>
                        </View>
                }
            </View>
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

