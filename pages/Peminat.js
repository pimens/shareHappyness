import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Axios from 'axios';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Peminat extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[]
    };
  }
  componentDidMount(){
      this.refresh();
  }
  refresh=()=>{
      Axios.get(this.props.server+'index.php/home/getPeminat/'+this.props.barangEdit)
      .then((response)=>{
          console.warn(response.data) 
          this.setState({data:response.data})
      })
  }
  save=(idUser)=>{
    console.warn(idUser,this.props.barangEdit)
    Axios.post(this.props.server+'index.php/home/savePilihanUser/'+idUser+'/'+this.props.barangEdit)
    .then((response)=>{
        this.props.navigation.navigate('Barangku');
    })
  }
  render() {
    return (
      <View>
          {
              this.state.data.map((data,i)=>{
                  return(
                      <View>
                          <Text>{data.namapeminat}</Text>
                          <TouchableOpacity 
                          onPress={()=>this.save(data.peminat)}
                          style={{backgroundColor:"red"}}>
                              <Text>Pilih</Text>
                          </TouchableOpacity>
                      </View>
                  )
              })
          }
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
export default connect(mapStateToProps, mapDispatchToProps)(Peminat);

