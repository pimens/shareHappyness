import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux'
import Appbar from './components/Appbar';
import Axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import { Container, Icon, Content } from 'native-base';
class EditProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: "",
            hp: "",
            lokasi: "",
            email: "",
            password: "",
            f: "x",
            foto: {},
        };
    }
    componentDidMount() {
        this.refresh();

    }
    save = () => {
        const fd = new FormData();
        fd.append('nama', this.state.nama);
        fd.append('lokasi', this.state.lokasi);
        fd.append('hp', this.state.hp);
        fd.append('email', this.state.email);
        fd.append('password', this.state.password);
        fd.append('idUser', this.props.userData.id);
        Axios.post(this.props.server + 'index.php/home/updateProfil', fd).then((response) => {
            console.warn(response.data)
            this.props.setDataUser(response.data[0]);
            this.refresh();
        })
    }
    saveImage = (data) => {
        const fd = new FormData();
        fd.append('id', this.props.userData.id);
        fd.append('image', data);        
        Axios.post(this.props.server + 'index.php/home/updateImageProfil', fd).then((response) => {
            this.props.setDataUser(response.data[0]);
            console.warn(response.data);
            this.refresh();
        })
    }
    chooseFile = () => {
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
                this.saveImage(source)
            }
        })
    };
    refresh = () => {
        this.setState({
            nama: this.props.userData.nama,
            lokasi: this.props.userData.lokasi,
            hp: this.props.userData.hp,
            email: this.props.userData.email,
            password: this.props.userData.password,
            f: this.props.userData.foto
        })
    }
    render() {
        return (
            <Container>
                <Appbar navigation={this.props.navigation} tool={false} />
                <Content>
                    <View style={{margin:15, justifyContent:"center",alignItems:"center"}}>
                    <Image source={{ uri: this.props.server+'data/user/' + this.props.userData.foto }}
                        style={{ width: 120, height: 120, borderRadius: 50 }} />
                     <Icon onPress={()=>this.chooseFile()} name='camera' style={{ color: "black" }} />
                    </View>
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
                    <Text>Nomor HP (WA)</Text>
                    <TextInput
                        placeholder="Nomor HP (WA)"
                        value={this.state.hp}
                        style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ hp: text })} />
                    <Text>Email</Text>
                    <TextInput
                        placeholder="Email"
                        value={this.state.email}
                        style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ email: text })} />
                    <Text>Password</Text>
                    <TextInput
                        placeholder="Password"
                        value={this.state.password}
                        style={{ borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ password: text })} />
                </Content>
                <TouchableOpacity
                    style={{ backgroundColor: '#192a56', height: "7%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => this.save()}>
                    <Icon name='md-color-filter' style={{ color: "white" }} />
                </TouchableOpacity>

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
        setDataUser: (userData) => dispatch({ type: 'ADD_TO_CART', data: userData })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfil);

