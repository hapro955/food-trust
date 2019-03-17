import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  
} from "react-native";
import String from "../../../res/Strings";
import Color from "../../../res/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import NormalTabBar from "../../components/NormalTabBarComponent";
import { getNotification } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";

const height = Dimensions.get("window").height;

export default class NotificationContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.notification,
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
          onPress={navigation.getParam('goBack')}
        >
          <Icon name="chevron-left" size={19} color={Color.textWhite} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      today: "Thứ Ba ngày 29/1/2019",
      notification: [],
    };
    console.log("notification");
  }

  async componentWillMount() {
    let notification = await this.getInfoNotification();
    this.setState({
      notification: notification
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ goBack: this._goBack });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };


  getInfoNotification = async () => {
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    return (notification = await getNotification(accessToken));
  };

  renderTabBarChild = () => {
    const activeTabColor = Color.bgTabBar;
    let tabbarStyle = {
      height: 44 + 3, // tabStyle.height + borderBottomWidth
      backgroundColor: "#ffffff",
      elevation: 5,
      borderBottomColor: Color.textBrow,
      borderBottomWidth: 1,
      width: Dimensions.get("window").width + 2,
      marginHorizontal: -1
    };
    const tabStyle = {
      height: 44,
      backgroundColor: Color.bgWhite,
      marginHorizontal: 1
    };
    const activeTabStyle = {
      backgroundColor: activeTabColor
    };
    const textStyle = {
      color: Color.textBrow,
      fontSize: 14,
      fontWeight: "normal"
    };
    const activeTextStyle = {
      color: "#fff"
    };
    const indicatorStyle = {
      height: 0
    };
    return (
      <NormalTabBar
        tabbarStyle={tabbarStyle}
        tabStyle={tabStyle}
        textStyle={textStyle}
        activeTabStyle={activeTabStyle}
        activeTextStyle={activeTextStyle}
        indicatorStyle={indicatorStyle}
      />
    );
  };

  renderNotificatioinToday = () => {
    return (
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel="Hôm nay"
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: "90%",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: Color.textGreen
              }}
            >
              {this.state.today}
            </Text>
          </View>
          <FlatList
            style={{ width: "90%", height: "100%" }}
            data={this.state.notification}
            renderItem={this.renderListNotificationToday}
            keyExtractor={(item, index) => `item-${index}`}
          />
        </View>
      </ScrollView>
    );
  };

  renderNotificationTomorrow = () => {
    return (
      <ScrollView tabLabel="Ngày mai">
        <View style={{ flex: 1, backgroundColor: "yellow" }}>
          <Text>da xong</Text>
        </View>
      </ScrollView>
    );
  };

  renderListNotificationToday = ({ item }) => {
    let level = "";
    let styleTextWithLevel = {};
    if (item.level == 0) {
      level = String.normal;
      styleTextWithLevel = { color: Color.textBlack };
    } else if (item.level == 1) {
      level = String.important;
      styleTextWithLevel = { color: Color.textGreen };
    } else if (item.level == 2) {
      level = String.doItNow;
      styleTextWithLevel = { color: Color.textRed };
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.bgWhite,
          marginBottom: 20,
          borderRadius: 5,
          alignItems: "center"
        }}
      >
        <View style={{ width: "90%" }}>
          <View
            style={{
              marginBottom: 20,
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Color.textBlack
              }}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </View>
          <View style={{ marginBottom: 20, flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <Text style={styles.textTitle}>{String.level}</Text>
              <Text style={[styles.textContent, styleTextWithLevel]}>
                {level}
              </Text>
            </View>
            <View style={{ width: "40%", alignItems: "flex-end" }}>
              <TouchableOpacity style={styles.buttonDetail}>
                <Text
                  style={{
                    fontSize: 11,
                    color: "#87CB4C",
                    fontWeight: "bold",
                    padding: 5
                  }}
                >
                  {String.seeDetails}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <TouchableOpacity 
                onPress={() => {
                  this.props.navigation.navigate('PerformWork', {
                    item: item
                  });
                }}
              style={styles.buttonPerformWork}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: Color.textWhite
                }}
              >
                {String.performTheWork}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollableTabView
          style={{ width: "100%", height: "100%" }}
          renderTabBar={this.renderTabBarChild}
          initialPage={0}
        >
          {this.renderNotificatioinToday()}
          {this.renderNotificationTomorrow()}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textTitle: {
    fontSize: 13,
    color: Color.textBrow,
    marginBottom: 5
  },
  textContent: {
    fontSize: 13,
    color: Color.textBlack,
    width: 250
  },
  buttonDetail: {
    backgroundColor: "#CCFCA2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonPerformWork: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgTabBar,
    borderRadius: 5,
    width: "70%",
    height: 40
  }
});
