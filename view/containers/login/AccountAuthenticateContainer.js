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
    TextInput
} from 'react-native';
import String from '../../../res/Strings';
import Color from '../../../res/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AccountAuthenticateContainer extends Component{
    static navigationOptions = ({navigation}) => {
        return {
            title: String.accountVerification,
            headerTitleStyle: {
                fontSize: 15,
                color: Color.textBlack
            },
            headerStyle: {
                height: 60,
                borderBottomWidth: 5,
                borderBottomColor: Color.bgPink,
            },
            headerLeft: (
                <TouchableOpacity
                    style={{marginLeft: 20  }}
                    hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}
                    onPress={navigation.getParam('goBack')}
                >
                    <Icon 
                        name="chevron-left" 
                        size={15} 
                        color={Color.textBlack}     
                    />
                </TouchableOpacity> 
            ),
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            number1: "",
            number2: "",
            number3: "",
            number4: ""
        }
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        this.props.navigation.setParams({goBack: this.goBack});
        this.refs['text-input-1'].focus();
    }

    goBack = () => {
        this.props.navigation.goBack();
    } 

    handleConfirm = () => {
        this.props.navigation.navigate('Menu');
    }

    handleResend = () => {

    }

    render(){
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{flex: 1, alignItems: "center"}}>
                    <StatusBar
                        barStyle="dark-content"
                    />
                    <View style={styles.container}>
                        <View style={{marginTop: 50}}>
                            <Text style={{fontSize: 13, color: Color.textBrow, fontWeight: "bold"}}>
                                {String.enterAuthentication}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row", paddingTop: 30}}>
                            <View style={[styles.viewTextInput, {marginLeft: 0}]}>
                                <TextInput 
                                    ref='text-input-1'
                                    value={this.state.number1}
                                    onChangeText={(text) => {
                                        this.setState({number1: text});
                                        if(text.length === 1){
                                            this.refs['text-input-2'].focus();
                                        }
                                    }}
                                    maxLength={1}   
                                    style={styles.inputNumber}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextInput 
                                    ref='text-input-2'
                                    value={this.state.number2}
                                    onChangeText={(text) => {
                                        this.setState({number2: text});
                                        if(text.length === 1){
                                            this.refs['text-input-3'].focus();
                                        }
                                    }}
                                    maxLength={1}
                                    style={styles.inputNumber}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextInput 
                                    ref='text-input-3'
                                    value={this.state.number3}
                                    onChangeText={(text) => {
                                        this.setState({number3: text});
                                        if(text.length === 1){
                                            this.refs['text-input-4'].focus();
                                        }
                                    }}
                                    maxLength={1}
                                    style={styles.inputNumber}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextInput 
                                    ref='text-input-4'
                                    value={this.state.number4}
                                    onChangeText={(text) => {
                                        this.setState({number4: text});
                                    }}
                                    maxLength={1}
                                    style={styles.inputNumber}
                                />
                            </View>
                        </View>
                        <View style={{paddingTop: 60, width: "100%", alignItems: "center"}}>
                            <TouchableOpacity
                                onPress={this.handleConfirm}
                                style={styles.touchConfirm}
                            >
                                <Text style={{fontSize: 13, color: Color.textWhite, fontWeight: "bold"}}>
                                    {String.confirm}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingTop: 30, width: "100%", alignItems: "center"}}>
                            <TouchableOpacity
                                onPress={this.handleResend}
                            >
                                <Text style={{fontSize: 13, color: Color.textBlue, fontWeight: "bold"}}>
                                    {String.resend}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%", 
        height: "100%", 
        alignItems: "center"
    },
    viewTextInput: {
        width: 50, 
        height: 50, 
        borderBottomWidth: 1, 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems:"center", 
        borderBottomColor: Color.bdBrow,
        marginLeft: 20
    },
    inputNumber: {
        fontSize: 35, 
        fontWeight: "bold", 
        color: Color.textGreen,
    },
    touchConfirm: {
        width: "75%",
        height: 50,
        borderRadius: 5,
        backgroundColor: Color.bgTabBar,
        justifyContent: "center",
        alignItems: "center",
    }
});