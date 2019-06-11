import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Axios from 'axios';
import { connect } from 'react-redux'

class FunHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    refresh = () => {
        const d = []
        Axios.get(this.props.server + 'index.php/home/getDataHome/' + this.props.userData.id).then((response) => {
            d=response.data;
        });
        Axios.get(this.props.server + 'index.php/home/countNotifikasi/' + this.props.userData.id).then((response) => {
          this.setState({ notif: response.data, refreshing: false })
          this.props.setNotif(response.data.j)
          // console.warn(response.data[0].j)
        });
        return d;
      }    
    
}

const mapStateToProps = (state) => {
    return {
        server: state.server,
        userData: state.userData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setBarangDetail: (barangDetail) => dispatch({ type: 'DETAIL_BARANG', data: barangDetail }),
        setNotif: (notif) => dispatch({ type: 'NOTIF', data: notif })

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FunHome);

