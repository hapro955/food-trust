import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import TokenLocal from "../../../data/local/TokenLocal";
import { getPublicUser } from "../../../data/services/VfscApi";

export default class WelcomeContainer extends React.Component{
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        setTimeout(async () => {
            let accessToken = "";
            await TokenLocal.getAccessToken().then( (data) => {
              accessToken = data;
            });
            if(accessToken) {
                let user = await getPublicUser(accessToken)
                if(user != undefined && user.roles != undefined && user.roles[0] !== undefined && user.roles[0] === "ROLE_FARMER") {
                    this.props.navigation.navigate('RemindWork');
                } else {
                    this.props.navigation.navigate('Login');
                }
            }else {
                this.props.navigation.navigate('Login');
            }
        }, 2000);
    }

    render() {
        return(
            <View style={{width: "100%", height: "100%", backgroundColor: "#80C643"}}> 
                <StatusBar
                    barStyle="light-content"
                />
                <View style={{width: "100%", height: "100%",justifyContent: "center", alignItems: "center"}}>   
                    <View style={{width: 150, height: 200, justifyContent: "center", alignItems: "center"}}>
                        <Image
                            style={{width: "100%", height: "100%" }}
                            source={ require('../../../assets/images/logo_white.png')}
                            resizeMode={"contain"}
                        />
                    </View>
                    <Text style={{color: "white", fontSize: 25, marginBottom: 5}}>
                        WELCOME TO
                    </Text>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 40 }}>
                        VFSC
                    </Text>
                </View>
            </View> 
        );
    }   
}