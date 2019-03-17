import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import String from "../../../res/Strings";
import Icon from "react-native-vector-icons/FontAwesome";
import NormalTabBar from "../../components/NormalTabBarComponent";
import { getNotification } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";
import Color from "../../../res/Colors";

const height = Dimensions.get("window").height;

export default class ProfileContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.profile,
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
      phoneNumber: "0352719843",
      fullName: "Nguyễn Sơn Hà",
      address: "Ninh Bình",
      position: "Nông dân",
      evaluate: null
    };
    console.log("profile");
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.navigation.setParams({ goBack: this._goBack });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ width: 70, height: 70, marginTop: 10 }}>
            <Image
              source={{
                uri:
                  "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }}
              style={{ width: 70, height: 70, borderRadius: 35 }}
              resizeMode={"contain"}
            />
          </View>
          <View style={{ width: "90%" }}>
            <View style={styles.content}>
              <Text style={styles.title}>{String.phoneNumber}</Text>
              <Text style={styles.contentTitle}>{this.state.phoneNumber}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{String.fullName}</Text>
              <Text style={styles.contentTitle}>{this.state.fullName}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{String.address}</Text>
              <Text style={styles.contentTitle}>{this.state.address}</Text>
            </View>

            {/* <View style={styles.content}>
                <Text style={styles.title}>
                    {String.evaluate}
                </Text>
                <Text style={styles.contentTitle}>
                    {"fdsafsada"}
                </Text>
            </View> */}

            <View style={styles.content}>
              <Text style={styles.title}>{String.position}</Text>
              <Text style={styles.contentTitle}>{this.state.position}</Text>
            </View>

            <View style={{width: "100%", marginTop: 50}}>
                {/* <Touch */}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  content: {
    marginTop: 15,
    marginBottom: 15
  },
  title: {
    fontSize: 14,
    color: Color.textBrow,
    marginBottom: 5
  },
  contentTitle: {
    fontSize: 14
  }
});
