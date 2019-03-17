import React, {Component} from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import String from '../../res/Strings';
import Color from '../../res/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';   
import { getPublicUser } from "../../data/services/VfscApi";
import TokenLocal from "../../data/local/TokenLocal";
// import StarRating from '../components/StarRating';

const height = Dimensions.get('window').height;

export default class Menu extends Component{
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameOrg: "",
        }
    }

    componentWillMount() {}

    getInfoUser = async () => {
        let accessToken = "";
        await TokenLocal.getAccessToken().then( (data) => {
          accessToken = data;
        });
        let user = await getPublicUser(accessToken);
        return user;
    }

    async componentDidMount() {
        let infoUser = await this.getInfoUser();
        this.setState({
            name: infoUser.name,
            nameOrg: infoUser.org.name
        });
    }

    goBack = () => {
        this.props.navigation.goBack();
    } 

    // handleCamera = () => {
    //     this.props.navigation.navigate('Camera');
    // }


    handleChangePassword = () => {
        this.props.navigation.navigate('ChangePassword');
    }

    handleRemindWork = () => {
        this.props.navigation.navigate('RemindWork');
    }

    _valueChanged = (rating) => {
        console.log(rating);
    } 

    handleLogOut = async () => {
        await TokenLocal.removeAcessToken();
        this.props.navigation.navigate("Login");
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                />
                <View style={{width: "85%", height: height -20, marginTop: 20}}>
                    <View style={{width: "100%", height: 70, marginTop: 30, flexDirection: "row"}}>
                        <View style={{width: 70, height: 70, marginRight: 25}}>
                            <Image 
                                source={require('./../../assets/icon.png')}
                                style={{width: 70, height: 70, borderRadius: 35}}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{height: 70, justifyContent: "center"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: Color.textWhite}}>
                                {this.state.nameOrg}
                            </Text>
                            <Text style={{fontSize: 14, fontWeight: "normal", color: Color.textWhite}}>
                                {this.state.name}
                            </Text>
                        </View>
                    </View>
                    {/* <View style={styles.boxStar}>
                    <StarRating
          maxStars={5}
          rating={3}
          selectStar={require('../../assets/select_star.png')}
          unSelectStar={require('../../assets/unselect_star.png')}
          valueChanged={this._valueChanged}
          starSize={50}
          interitemSpacing={20}
        />

                    </View> */}
                    <View style={{marginTop: 50, marginLeft: 15}}>
                        {/* <TouchableOpacity
                            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                            onPress={this.handleCamera}
                        >
                            <Text style={styles.textMenu}>
                                {String.video}
                            </Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                            onPress={this.handleChangePassword}
                        >
                            <Text style={styles.textMenu}>
                                {String.changePassword}
                            </Text>
                        </TouchableOpacity>
        
                        <TouchableOpacity
                            style={styles.touchOpacity}
                            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                            onPress={this.handleRemindWork}
                        >
                            <Text style={styles.textMenu}>
                                {String.remindWork}
                            </Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity
                            style={styles.touchOpacity}
                            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                            onPress={this.handleLogOut}
                        >
                            <Text style={styles.textMenu}>
                                {String.logOut}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Color.bgGreen, 
        alignItems: "center"
    },
    boxStar: {
        width: 70, 
        height: 30, 
        backgroundColor: Color.bgWhite, 
        marginTop: 25, 
        borderRadius: 15, 
        marginLeft: 10
    },
    touchOpacity: {
        marginTop: 30
    },
    textMenu: {
        fontSize: 16, 
        color: Color.textWhite,
        fontWeight: "bold"
    }
});