import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { connect } from 'react-redux'
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { Content, Container, Icon } from 'native-base';
import Appbar from '../components/Appbar';

class FormApply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            alasan: '',
            foto: {
                uri: 'x'
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
    save = () => {
        const fd = new FormData();
        fd.append('idbarang', this.props.barangDetail);
        fd.append('peminat', this.props.userData.id);
        fd.append('image', this.state.foto.data);
        fd.append('alasan', this.state.alasan);
        fd.append('idbarang', this.props.barangDetail);
        Axios.post(this.props.server + 'index.php/home/insertDataApply', fd).then((response) => {
            console.warn(response)
        })
        this.props.navigation.navigate('BarangApply')
    }
    render() {
        return (
            <Container>
                <Appbar navigation={this.props.navigation} tool={false} />
                <Content>
                    <TextInput
                        placeholder="Ungkapkan kondisi dan alasan mengapa kamu harus dipilih"
                        value={this.state.alasan}
                        multiline={true}
                        numberOfLines={4}
                        style={{ height: 75, borderWidth: 1, borderColor: "#2d3436", margin: 2, borderRadius: 10, borderRightWidth: 5 }}
                        onChangeText={(text) => this.setState({ alasan: text })} />
                    {
                        this.state.foto.uri === 'x' ? <View></View> :
                        <Image source={{ uri: this.state.foto.uri }}
                        style={{ width: 80, height: 80, borderRadius: 50 }} />
                    }
                    
                    <TouchableOpacity
                        onPress={() => this.chooseFile()}
                        style={{ backgroundColor: "#0097e6",flexDirection:"row",justifyContent:"center",alignItems:"center" }}>
                        <Icon name='cloud-upload' style={{ color: "black",marginRight: 5, }} />
                        <Text>Foto Pendukung</Text>
                    </TouchableOpacity>
                </Content>
                <TouchableOpacity
                    onPress={() => this.save()}
                    style={{ backgroundColor: "#0097e6",justifyContent:"center",alignItems:"center",flexDirection:"row" }}>
                    <Text>Save</Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(FormApply);

