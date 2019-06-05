import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
import ImagePicker from 'react-native-image-picker';
class EditBarang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: "",
            lokasi: "",
            kategori: "",
            deskripsi: "",
            image: [],
            tmpImage:{},
            jenis:"",datake:""
        };
    }
    componentDidMount() {
        this.refresh();

    }
    deleteImage = () => {
        console.warn(this.state.image)
    }
    save = () => {
        const fd = new FormData();       
        fd.append('nama', this.state.nama);
        fd.append('lokasi', this.state.lokasi);
        fd.append('deskripsi', this.state.deskripsi);
        fd.append('kategori', this.state.kategori);
        fd.append('id', this.props.barangEdit);
        Axios.post(this.props.server + 'index.php/tps/editBarang', fd).then((response) => {
            console.warn(response.data)
            // this.refresh();
        })
        this.props.navigation.navigate('Barangku');
    }
    chooseFile = (jenis,datake) => {
        // console.warn(jenis,datake)        
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
                let source = response.data;                           
                this.saveImage(jenis,datake,source)
                      
            }
        })
    };
    saveImage = (jenis,datake,source) => {     
        const fd = new FormData();       
        fd.append('datake', datake);       
        fd.append('jenis', jenis);       
        fd.append('nama', this.state.nama);       
        fd.append('id', this.props.barangEdit);
        if(jenis==="string"){fd.append('image', "");}
        else{fd.append('image', source);}
        Axios.post(this.props.server + 'index.php/tps/updateImageBarang', fd).then((response) => {
            //console.warn(response.data)
            this.refresh();
            // this.props.navigation.navigate("EditBarang")
        })
        
    }
    refresh = () => {
        Axios.get(this.props.server + 'index.php/tps/getBarangById/' + this.props.barangEdit)
            .then((response) => {
                console.warn(response.data)
                var tmp = [];
                tmp.push(response.data[0].image1);
                tmp.push(response.data[0].image2);
                tmp.push(response.data[0].image3);
                tmp.push(response.data[0].image4);
                tmp.push(response.data[0].image5);
                this.setState({
                    image: tmp,
                    nama: response.data[0].nama,
                    lokasi: response.data[0].lokasi,
                    deskripsi: response.data[0].deskripsi,
                    kategori: response.data[0].kategori
                })
            })
    }
    render() {
        return (
            <View>
                <Appbar navigation={this.props.navigation} />
                <Text>Nama</Text>
                <TextInput
                    value={this.state.nama}
                    style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                    onChangeText={(text) => this.setState({ nama: text })} />
                <Text>Lokasi</Text>
                <TextInput
                    value={this.state.lokasi}
                    style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                    onChangeText={(text) => this.setState({ lokasi: text })} />
                <Text>Kategori</Text>
                <TextInput
                    placeholder="Kategori Barang"
                    value={this.state.kategori}
                    style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                    onChangeText={(text) => this.setState({ kategori: text })} />
                <Text>Deskripsi</Text>
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
                        this.state.image.map((data, i) => {
                            return data === '' ?
                                <View key={i} style={{justifyContent:"center",alignItems:"center"}}> 
                                <TouchableOpacity
                                    style={{ backgroundColor: 'red' }}
                                    onPress={() => this.chooseFile("base",(i+1))}>
                                    <Text style={{ color: "white" }}>Upload</Text>
                                </TouchableOpacity>
                                </View> :
                                <View key={i}>
                                    <Image source={{ uri: this.props.server + data }}
                                        style={{ width: 80, height: 80, borderRadius: 50 }} />
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'red' }}
                                        onPress={() => this.saveImage("string",(i+1),'x')}>
                                        <Text style={{ color: "white" }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                        })
                    }

                </ScrollView>
                <TouchableOpacity
                    style={{ backgroundColor: 'red' }}
                    onPress={() => this.save()}>
                    <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>

            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditBarang);

