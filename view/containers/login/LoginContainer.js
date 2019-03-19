import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Color from "../../../res/Colors";
import { loginApi, getPublicUser } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";
import PasswordLocal from "../../../data/local/PasswordLocal";
import String from "../../../res/Strings";

export default class LoginContainer extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      isShowPassword: false,
      messageError: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  showPassword = () => {
    if (this.state.isShowPassword === true) {
      this.setState({
        isShowPassword: false
      });
    } else {
      this.setState({
        isShowPassword: true
      });
    }
  };

  forgotPassword = () => {};

  handleLogin = async () => {
    let body = {
      usernameOrPhone: this.state.phoneNumber,
      password: this.state.password
    };
    let response = await loginApi(body);
    if (response != undefined && response.accessToken != undefined && response.accessToken) {
      await PasswordLocal.setPassWord(this.state.password);
      await TokenLocal.setAccessToken(response.accessToken);
      let accessToken = "";
      await TokenLocal.getAccessToken().then(data => {
        accessToken = data;
      });

      if (accessToken !== "") {
        let user = await getPublicUser(accessToken);
        if (user.roles[0] !== undefined) {
          if(user.roles[0] === "ROLE_FARMER") {
            this.props.navigation.navigate("RemindWork");
          }else if(
            user.roles[0] === "ROLE_ORG" ||
            user.roles[0] === "ROLE_VFSC"
          ) {
            this.props.navigation.navigate("Chart");
          }
        }
      }
    } else {
      this.setState({
        messageError: String.wrongUsernameOrPassword
      });
    }
  };

  handleRegister = () => {};

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <ScrollView style={{ paddingTop: 20 }}>
            <View
              style={{ width: "100%", height: "100%", alignItems: "center" }}
            >
              <View style={{ width: "80%", height: "100%" }}>
                <View style={{ paddingTop: 40, flexDirection: "row" }}>
                  <Image
                    style={{ width: 60, height: 90 }}
                    source={require("../../../assets/images/logo_black.png")}
                    resizeMode={"cover"}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      style={{
                        paddingTop: 15,
                        fontSize: 20,
                        fontWeight: "normal",
                        color: "#5B5B5B"
                      }}
                    >
                      {"VFSC"}
                    </Text>
                    <Text
                      style={{
                        paddingTop: 10,
                        fontSize: 15,
                        fontWeight: "normal",
                        color: "#D1CFCF"
                      }}
                    >
                      {String.signIn}
                    </Text>
                  </View>
                </View>
                {this.state.messageError !== "" ? (
                  <Text
                    style={{
                      paddingTop: 10,
                      fontSize: 15,
                      fontWeight: "normal",
                      color: "red"
                    }}
                  >
                    {this.state.messageError}
                  </Text>
                ) : null}
                <Text
                  style={{
                    paddingTop: 20,
                    fontSize: 15,
                    fontWeight: "normal",
                    color: "#5B5B5B"
                  }}
                >
                  {String.phoneNumber}
                </Text>
                <View
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    borderBottomColor: "#B7B3B3"
                  }}
                >
                  <TextInput
                    style={styles.inputPhoneNumber}
                    keyboardType={"numeric"}
                    onChangeText={text => {
                      this.setState({ phoneNumber: text });
                    }}
                  />
                </View>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 15,
                    fontWeight: "normal",
                    color: "#5B5B5B"
                  }}
                >
                  {String.passWord}
                </Text>
                <View style={styles.containerPassword}>
                  <View style={{ width: "85%" }}>
                    <TextInput
                      style={styles.inputPassword}
                      secureTextEntry={!this.state.isShowPassword}
                      onChangeText={text => {
                        this.setState({ password: text });
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={this.showPassword}
                  >
                    {this.state.isShowPassword ? (
                      <Icon name="eye" size={20} color="black" />
                    ) : (
                      <Icon name="eye-slash" size={20} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ width: "100%", marginTop: 20 }}>
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={this.handleLogin}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#FFFFFF"
                      }}
                    >
                      {String.logIn}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginTop: 60,
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={this.forgotPassword}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "normal",
                        color: "#D1CFCF"
                      }}
                    >
                      {String.forgotPassWord} {" | "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{}}
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                    onPress={this.handleRegister}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "normal",
                        color: "#0462FD"
                      }}
                    >
                      {String.registration}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  containerPassword: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#B7B3B3",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputPhoneNumber: {
    fontSize: 15,
    color: "#D1CFCF",
    paddingVertical: 10,
    fontWeight: "bold"
  },
  inputPassword: {
    fontSize: 15,
    color: "#D1CFCF",
    paddingVertical: 10,
    fontWeight: "bold"
  },
  buttonLogin: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgBlue,
    borderRadius: 5
  }
});
