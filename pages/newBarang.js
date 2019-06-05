import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Appbar from './components/Appbar';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
class newBarang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: "",
            lokasi: "",
            kategori: "",
            deskripsi: "",
            loading: false,
            count: 0,
            img: [],
        };
        // console.warn(this.props.userData)
    }
    save = () => {      
        const fd = new FormData();       
        for (let i=0;i<this.state.img.length;i=i+1) {            
            fd.append('image'+i, this.state.img[i].data);
        }       
        fd.append('nama', this.state.nama);
        fd.append('lokasi', this.state.lokasi);
        fd.append('deskripsi', this.state.deskripsi);
        fd.append('kategori', this.state.kategori);
        fd.append('user', this.props.userData.id);
        Axios.post(this.props.server+'index.php/tps/tesAdd', fd).then((response) => {
            console.warn(response.data)
        })
        this.props.navigation.navigate('Home')
    }
    delete = (ind) => {
        var array = [...this.state.img]; // make a separate copy of the array
        if (ind !== -1) {
            array.splice(ind, 1);
            this.setState({ img: array });
        }
    }
    chooseFile = () => {
        var options = {
            quality: 0.1,
            // noData: true,
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
                var tmp = [...this.state.img];
                tmp.push(source);
                this.setState({
                    img: tmp
                })               
            }
        })
    };

    render() {
        return (
            <View>
                <Appbar navigation={this.props.navigation} />
                <View>
                    <TextInput
                        placeholder="Nama Barang"
                        value={this.state.nama}
                        style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ nama: text })} />
                    <TextInput
                        placeholder="Lokasi Barang"
                        value={this.state.lokasi}
                        style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ lokasi: text })} />
                    <TextInput
                        placeholder="Kategori Barang"
                        value={this.state.kategori}
                        style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ kategori: text })} />
                    <TextInput
                        placeholder="Deskripsi Barang"
                        value={this.state.deskripsi}
                        multiline={true}
                        numberOfLines={4}
                        style={{ height: 75, borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ deskripsi: text })} />
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        {
                            this.state.img.map((data, i) => {
                                return (
                                    <View>
                                        <Image
                                            key={data.uri}
                                            source={{ uri: data.uri }}
                                            style={{ width: 100, height: 100 }} />
                                        <TouchableOpacity
                                            style={{ backgroundColor: 'red' }}
                                            onPress={() => this.delete(i)}>
                                            <Text style={{ color: "white" }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>

                                )
                            })
                        }
                    </ScrollView>
                    {
                        this.state.img.length < 5 ?
                            <TouchableOpacity
                                style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#00b894",height: 25, borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                                onPress={this.chooseFile.bind(this)}>
                                <Text style={{ color: "white" }}>Select Image {this.state.count + 1}</Text>
                            </TouchableOpacity>
                            :
                            <Text>Max 5 Image</Text>
                    }
                    <TouchableOpacity
                        style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#00b894", borderWidth: 1, height: 25, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onPress={this.save}>
                        <Text style={{ color: "black" }}>Save Data </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        server : state.server
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addData: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(newBarang);