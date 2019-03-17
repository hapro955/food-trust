import React, { Component } from "react";
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
  Image,
  ScrollView,
  FlatList
} from "react-native";
import String from "../../../res/Strings";
import Color from "../../../res/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import NormalTabBar from "../../components/NormalTabBarComponent";

const height = Dimensions.get("window").height;

export default class ProductionPlanContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.productionPlan,
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
          onPress={() => {
            console.log(1111);
            _this.props.navigation.goBack();
            //navigation.getParam("goBack");
          }}
        >
          <Icon name="chevron-left" size={19} color={Color.textWhite} />  
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "KHSX mới",
      today: "Thứ Ba ngày 29/1/2019"
    };
  }

  componentWillMount() {
    _this = this;
  }

  componentDidMount() {}

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderTabBarParent = () => {
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

  renderProductionPlanDay = () => {
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
            data={data}
            renderItem={this.renderListProductionPlanDay}
          />
        </View>
      </ScrollView>
    );
  };

  renderProductionPlanWeek = () => {
    return (
      <ScrollView tabLabel="Tuần">
        <View style={{ flex: 1, backgroundColor: "yellow" }}>
          <Text>da xong</Text>
        </View>
      </ScrollView>
    );
  };

  renderProductionPlanMonth = () => {
    return (
      <ScrollView tabLabel="Tháng">
        <View style={{ flex: 1, backgroundColor: "yellow" }}>
          <Text>da xong</Text>
        </View>
      </ScrollView>
    );
  };

  renderProductionPlanReceived = () => {
    return (
      <View tabLabel="KHSX đã nhận" style={{ width: "100%", height: "100%" }}>
        <ScrollableTabView
          style={{ width: "100%", height: "100%" }}
          renderTabBar={this.renderTabBarChild}
          initialPage={0}
        >
          {this.renderProductionPlanDay()}
          {this.renderProductionPlanWeek()}
          {this.renderProductionPlanMonth()}
        </ScrollableTabView>
      </View>
    );
  };

  renderProductionPlanNew = () => {
    return (
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel={this.state.name}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center"
          }}
        >
          <FlatList
            style={{ width: "90%", height: "100%", marginTop: 10 }}
            data={data}
            renderItem={this.renderListProductionPlanNew}
          />
        </View>
      </ScrollView>
    );
  };

  renderProductionPlanFinish = () => {
    return (
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel={this.state.name}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center"
          }}
        >
          <FlatList
            style={{ width: "90%", height: "100%", marginTop: 10 }}
            data={data}
            renderItem={this.renderListProductionPlanFinish}
          />
        </View>
      </ScrollView>
    );
  };

  renderListProductionPlanDay = ({ item }) => {
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
          <View style={{ marginBottom: 20, marginTop: 15 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.textBlack
              }}
            >
              {String.executionTime}
              {" ("}
              {item.time}
              {")"}
            </Text>
          </View>
          <View style={{ marginBottom: 20, flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <Text style={styles.textTitle}>{String.codePlan}</Text>
              <Text style={styles.textContent} numberOfLines={1}>
                {item.codePlan}
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
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textTitle}>{String.placeOfImplementation}</Text>
            <Text style={styles.textContent} numberOfLines={1}>
              {item.area}
            </Text>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.textTitle}>{String.workContent}</Text>
            <Text style={styles.textContent} numberOfLines={1}>
              {item.content}
            </Text>
          </View>
          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonPerformWork}>
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

  renderListProductionPlanNew = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.bgWhite,
          marginBottom: 10,
          borderRadius: 5,
          alignItems: "center"
        }}
      >
        <View style={{ width: "95%" }}>
          <View style={[styles.viewProductionNew, { marginTop: 10 }]}>
            <View style={{ width: "70%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Color.textBlack
                }}
              >
                {String.executionTime}
                {" ("}
                {item.time}
                {")"}
              </Text>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
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
          <View style={styles.viewProductionNew}>
            <Text style={styles.textTitle}>
              {String.codePlan}
              {"  "}
            </Text>
            <Text style={styles.textContentProductionNew} numberOfLines={1}>
              {item.codePlan}
            </Text>
          </View>
          <View style={styles.viewProductionNew}>
            <Text style={styles.textTitle}>
              {String.placeOfImplementation}
              {"  "}
            </Text>
            <Text style={styles.textContentProductionNew} numberOfLines={1}>
              {item.area}
            </Text>
          </View>
          <View style={styles.viewProductionNew}>
            <Text style={styles.textTitle}>
              {String.workContent}
              {"  "}
            </Text>
            <Text style={styles.textContentProductionNew} numberOfLines={1}>
              {item.content}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderListProductionPlanFinish = ({ item }) => {
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
            style={{ marginBottom: 10, marginTop: 20, flexDirection: "row" }}
          >
            <View style={{ width: "12%", alignItems: "center" }}>
              <Icon name="spa" size={15} color={Color.textGreen} />
            </View>
            <View style={{ width: "53%" }}>
              <Text style={styles.textTitle}>{String.codePlan}</Text>
              <Text style={styles.textContent} numberOfLines={1}>
                {item.codePlan}
              </Text>
            </View>
            <View
              style={{
                width: "35%",
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
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
          <View style={{ marginBottom: 10, flexDirection: "row" }}>
            <View style={{ width: "12%", alignItems: "center" }}>
              <Icon name="tree" size={15} color={Color.textGreen} />
            </View>
            <View style={{ width: "88%" }}>
              <Text style={styles.textTitle}>
                {String.placeOfImplementation}
              </Text>
              <Text style={styles.textContent} numberOfLines={1}>
                {item.area}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 10, flexDirection: "row" }}>
            <View style={{ width: "12%", alignItems: "center" }}>
              <Icon name="edit" size={15} color={Color.textGreen} />
            </View>
            <View style={{ width: "88%" }}>
              <Text style={styles.textTitle}>{String.workContent}</Text>
              <Text style={styles.textContent} numberOfLines={1}>
                {item.content}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 20, flexDirection: "row" }}>
            <View style={{ width: "12%", alignItems: "center" }}>
              <Icon name="clock" size={15} color={Color.textGreen} />
            </View>
            <View style={{ width: "88%" }}>
              <Text style={styles.textTitle}>{String.timeStartTimeEnd}</Text>
              <Text style={styles.textContent} numberOfLines={1}>
                {item.timeEnd}  
              </Text>
            </View>
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
          renderTabBar={this.renderTabBarParent}
          initialPage={0}
        >
          {this.renderProductionPlanReceived()}
          {this.renderProductionPlanNew()}
          {this.renderProductionPlanFinish()}
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
  textContentProductionNew: {
    fontSize: 13,
    color: Color.textBlack,
    width: 170
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
  },
  viewProductionNew: {
    marginBottom: 10,
    flexDirection: "row"
  }
});

const data = [
  {
    time: "6h-8h",
    codePlan: "DTH 235",
    area: "Khu vườn A của hộ sản xuất Bfdsafsdfsadfas",
    content: "Tiêm vắc xin cúm H5N1 cho lơndsafsdafsdafsdafsadfsadf",
    timeEnd: "6/6/2018 - 24/12/2018",
  },
  {
    time: "6h-8h",
    codePlan: "DTH 235",
    area: "Khu vườn A của hộ sản xuất Bfdsafsdfsadfas",
    content: "Tiêm vắc xin cúm H5N1 cho lơndsafsdafsdafsdafsadfsadf",
    timeEnd: "6/6/2018 - 24/12/2018",
  },
  {
    time: "6h-8h",
    codePlan: "DTH 235",
    area: "Khu vườn A của hộ sản xuất Bfdsafsdfsadfas",
    content: "Tiêm vắc xin cúm H5N1 cho lơndsafsdafsdafsdafsadfsadf",
    timeEnd: "6/6/2018 - 24/12/2018",
  },
  {
    time: "6h-8h",
    codePlan: "DTH 235",
    area: "Khu vườn A của hộ sản xuất Bfdsafsdfsadfas",
    content: "Tiêm vắc xin cúm H5N1 cho lơndsafsdafsdafsdafsadfsadf",
    timeEnd: "6/6/2018 - 24/12/2018",
  },
  {
    time: "6h-8h",
    codePlan: "DTH 235",
    area: "Khu vườn A của hộ sản xuất Bfdsafsdfsadfas",
    content: "Tiêm vắc xin cúm H5N1 cho lơndsafsdafsdafsdafsadfsadf",
    timeEnd: "6/6/2018 - 24/12/2018",
  },
  {
    time: "6h-8h",
    codePlan: "DTH 235",
    area: "Khu vườn A của hộ sản xuất Bfdsafsdfsadfas",
    content: "Tiêm vắc xin cúm H5N1 cho lơndsafsdafsdafsdafsadfsadf",
    timeEnd: "6/6/2018 - 24/12/2018",
  },
 
];
