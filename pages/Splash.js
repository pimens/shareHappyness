import React from 'react';
import { StatusBar , View , Text , ActivityIndicator,Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Axios from 'axios';
import { connect } from 'react-redux'


class Splash extends React.Component {
    constructor(props) {
        super(props);
        const db = openDatabase({
          name: 'catat.db',
          location: 'default',
          createFromLocation: '~www/catat.db',
    
        });
        this.state = {
          db: db,      
          email: '' //enggap saja ketika dia tap button email ke ambil dari google play
        };
    }
    componentWillMount(){
        this.refreshData();
    }
    red = () =>{
        this.props.navigation.navigate('Login');
    }
    redHome = () =>{
        this.props.navigation.navigate('Home');
    }
    refreshData = () => {
        this.state.db.transaction(tx => {
          tx.executeSql("SELECT * FROM session where status=1", [], (tx, results) => {
              // console.warn('data sotrage',results.rows.length)
            if (results.rows.length !=0) {       //kalau ada data login dihape       
              const fd = new FormData();
              fd.append('email', results.rows.item(0).email);
              fd.append('password', results.rows.item(0).email);
              Axios.post(this.props.server+"index.php/tps/login2", fd)
                .then((response) => {              
                  if(response.data==="gagal"){                //ada data log dihp tapi di api tdk ada maka dihapus   
                    console.warn("gagal cari data log 2")
                    this.state.db.transaction(tx => {
                        tx.executeSql("delete FROM session where status=1", [], (tx, res) => {
                            console.log("berhasil hapus", results.rows.item(0))
                        });
                      });                
                      this.red();
                  }
                  else{//ada data login dan ada data di web
                    this.props.setDataUser(response.data);    
                    this.redHome();
                  }                
                });
            }    //blm ada data login dihp  
            else{
                this.red();
            } 
          });
        });
      }
    render() {
        return (
            <View style={{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , backgroundColor : 'black'}}>
                <StatusBar backgroundColor="#e3e3e3" barStyle="light-content"/> 
                <View style={{ justifyContent: 'center' , alignItems: 'center' ,width: '50%', height: '50%',borderRadius:30}}>
                <Image source={require('../assets/ff.png')}  />
                </View>
                <ActivityIndicator color={'blue'}/>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      count: state.count,
      userData: state.userData,
      server:state.server
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      setDataUser: (userData) => dispatch({ type: 'ADD_TO_CART', data: userData })
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Splash);
  