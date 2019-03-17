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
  Keyboard,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Color from "../../../res/Colors";
import { changePassword } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";
import String from "../../../res/Strings";
import PasswordLocal from "../../../data/local/PasswordLocal";

export default class ChangePasswordContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.changePassword,
      headerTitleStyle: {
        fontSize: 15,
        color: Color.textWhite
      },
      headerStyle: {
        height: 60,
        borderBottomWidth: 0,
        backgroundColor: Color.bgGreen
      },
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
          onPress={navigation.getParam("goBack")}
        >
          <Icon name="chevron-left" size={19} color={Color.textWhite} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
      messageError: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.navigation.setParams({ goBack: this._goBack });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _handleShowOldPassword = () => {
    this.setState({
      showOldPassword: !this.state.showOldPassword
    });
  };

  _handleShowNewPassword = () => {
    this.setState({
      showNewPassword: !this.state.showNewPassword
    });
  };

  _handleShowConfirmNewPassword = () => {
    this.setState({
      showConfirmNewPassword: !this.state.showConfirmNewPassword
    });
  };

  handleChangePassword = async () => {
    let accessToken = "";
    let oldPassword = "";
    await PasswordLocal.getPassWord().then(data => {
      oldPassword = data;
    });
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    if (this.state.oldPassword === "") {
      this.setState({ messageError: String.youHaveNotEnteredTheOldPassword });
    } else if (this.state.newPassword === "") {
      this.setState({ messageError: String.youHaveNotEnteredThNewPassword });
    } else if (this.state.confirmNewPassword === "") {
      this.setState({ messageError: String.youHaveNotConfirmedNewPassword });
    } else if (
      this.state.oldPassword !== "" &&
      this.state.newPassword !== "" &&
      this.state.confirmNewPassword !== ""
    ) {
      if (this.state.oldPassword === oldPassword) {
        if (this.state.newPassword === this.state.confirmNewPassword) {
          if (this.state.newPassword.length < 4) {
            this.setState({
              messageError: String.newPasswordMustHaveAtLeast4Characters
            });
          } else {
            let reponseChangePassword = await changePassword(
              this.state.newPassword,
              accessToken
            );
            console.log(111, reponseChangePassword);
            if (reponseChangePassword.success) {
              await TokenLocal.removeAcessToken();
              await PasswordLocal.removePassWord();
              Alert.alert(String.changePasswordSuccessfully);
              setTimeout(() => {
                this.props.navigation.navigate("Login");
              }, 1500);
            } else {
              this.setState({
                messageError: String.passwordChangeHasNotBeenSuccessful
              });
            }
          }
        } else {
          this.setState({
            messageError: String.newPasswordAndConfirmationDoNotMatch
          });
        }
      } else {
        this.setState({ messageError: String.theOldPasswordIsNotCorrect });
      }
    }
  };

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
                {this.state.messageError !== "" ? (
                  <Text
                    style={{
                      paddingTop: 15,
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
                  {String.oldPassword}
                </Text>
                <View style={styles.containerPassword}>
                  <View style={{ width: "85%" }}>
                    <TextInput
                      autoFocus={true}
                      maxLength={20}
                      style={styles.inputPassword}
                      secureTextEntry={!this.state.showOldPassword}
                      onChangeText={text => {
                        this.setState({ oldPassword: text });
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={this._handleShowOldPassword}
                  >
                    {this.state.showOldPassword ? (
                      <Icon name="eye" size={20} color="black" />
                    ) : (
                      <Icon name="eye-slash" size={20} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    paddingTop: 20,
                    fontSize: 15,
                    fontWeight: "normal",
                    color: "#5B5B5B"
                  }}
                >
                  {String.newPassword}
                </Text>
                <View style={styles.containerPassword}>
                  <View style={{ width: "85%" }}>
                    <TextInput
                      maxLength={20}
                      style={styles.inputPassword}
                      secureTextEntry={!this.state.showNewPassword}
                      onChangeText={text => {
                        this.setState({ newPassword: text });
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={this._handleShowNewPassword}
                  >
                    {this.state.showNewPassword ? (
                      <Icon name="eye" size={20} color="black" />
                    ) : (
                      <Icon name="eye-slash" size={20} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    paddingTop: 20,
                    fontSize: 15,
                    fontWeight: "normal",
                    color: "#5B5B5B"
                  }}
                >
                  {String.confirmNewPassword}
                </Text>
                <View style={styles.containerPassword}>
                  <View style={{ width: "85%" }}>
                    <TextInput
                      maxLength={20}
                      style={styles.inputPassword}
                      secureTextEntry={!this.state.showConfirmNewPassword}
                      onChangeText={text => {
                        this.setState({ confirmNewPassword: text });
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={this._handleShowConfirmNewPassword}
                  >
                    {this.state.showConfirmNewPassword ? (
                      <Icon name="eye" size={20} color="black" />
                    ) : (
                      <Icon name="eye-slash" size={20} color="black" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* <View>

                </View> */}

                <View style={{ width: "100%", marginTop: 40 }}>
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={this.handleChangePassword}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#FFFFFF"
                      }}
                    >
                      {String.confirm}
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
    backgroundColor: Color.bgTabBar,
    borderRadius: 5
  }
});
