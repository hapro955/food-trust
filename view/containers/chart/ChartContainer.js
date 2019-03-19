import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Modal
} from "react-native";
import String from "../../../res/Strings";
import Color from "../../../res/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { ImagePicker, Permissions } from "expo";
import { uploadImage, createWorkflow } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";
import DatePicker from "react-native-datepicker";
import {
  getPublicUser,
  getQuantityVfsc,
  getQuantityGov,
  getQuantityOrg
} from "../../../data/services/VfscApi";

export default class ChartContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: null,
      headerStyle: {
        height: 40,
        borderBottomWidth: 0,
        backgroundColor: Color.bgGreen
      },
      headerLeft: <View />,
      headerRight: (
        <TouchableOpacity
          style={{
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center"
          }}
          hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}
          onPress= {() => {
            TokenLocal.removeAcessToken();
            navigation.navigate("Login");
          }}
        >
          <Icon name="sign-out" size={20} color={Color.bgWhite} />
          <Text style={{ fontSize: 15, color: Color.textWhite, marginLeft: 5 }}>
            {String.logOut}
          </Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      valueFromDate: new Date(),
      toDate: "",
      valueToDate: new Date(2019, 11, 31),
      quantity: [],
      isSelectCity: false,
    };
    console.log("chart");
  }

  componentWillMount() {
    let fromDate = new Date();
    let toDate = new Date(2019, 11, 31);
    this.setState({
      fromDate: this._handleDate(fromDate),
      toDate: this._handleDate(toDate),
    });
  }

  async componentDidMount() {
    await this._getQuantity();
  }

  _getQuantity = async () => {
    console.log("from date", this.state.fromDate);
    console.log("to date", this.state.toDate);
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    if (accessToken) {
      let user = await getPublicUser(accessToken);
      if (
        user != undefined &&
        user.roles != undefined &&
        user.roles[0] !== undefined
      ) {
        if (user.roles[0] === "ROLE_VFSC") {
          this._getQuantityVfsc(accessToken);
        } else if (user.roles[0] === "ROLE_ORG") {
          this._getQuantityOrg(accessToken);
        } else if (user.roles[0] === "ROLE_GOV") {
          this._getQuantityGov(accessToken);
        }
      }
    }
  } 

  _handleDate = (date) => {
    console.log(date);
    let day = date.getDate().toString();
    if(date.getDate() < 10) {
      day = "0" + date.getDate().toString();
    }
    let month = (date.getMonth() + 1).toString();
    if((date.getMonth() + 1) < 10) {
      month = "0" + (date.getMonth() + 1).toString();
    }
    let year = date.getFullYear().toString();
    return (day + month + year);
  }

  _getQuantityVfsc = async (accessToken) => {
    let quantityVfsc = await getQuantityVfsc(
      this.state.fromDate,
      this.state.toDate,
      accessToken
    );
    console.log(quantityVfsc);
    this.setState({ quantity: quantityVfsc });
  }

  _getQuantityOrg = async (accessToken) => {
    let quantityOrg = await getQuantityOrg(
      this.state.fromDate,
      this.state.toDate,
      accessToken
    );
    this.setState({ quantity: quantityOrg });
  }

  _getQuantityGov = async (accessToken) => {
    let quantityGov = await getQuantityGov(
      this.state.fromDate,
      this.state.toDate,
      accessToken
    );
    this.setState({ quantity: quantityGov });
  }

  _getHighestQuantity = () => {
    let listProduct = this.state.quantity;
    let quantity = 0;
    for (let i = 0; i < listProduct.length; i++) {
      if (quantity < listProduct[i].quantityExpected) {
        quantity = listProduct[i].quantityExpected;
      }
    }
    return quantity;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="white-content" />
        <View style={{ width: "96%" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginTop: 20
            }}
          >
            <View style={styles.contentDate}>
              <Text style={styles.textContent}>{String.startDate}</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Color.bdBrow,
                  marginTop: 10,
                  borderRadius: 2
                }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  date={this.state.valueFromDate}
                  mode="date"
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  minDate="2000-01-01"
                  maxDate="2050-01-01"
                  confirmBtnText={String.finish}
                  cancelBtnText={String.back}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      alignItems: "center"
                    },
                    dateText: {
                      color: Color.textBrow,
                      fontSize: 14
                    }
                  }}
                  onDateChange={date => {
                    let day = date.replace("/", "").replace("/","");
                    this.setState({ 
                      valueFromDate: date,
                      fromDate: day 
                    });
                  }}
               
                  iconComponent={
                    <View style={{ marginRight: 10 }}>
                      <Icon name="calendar" size={25} color={Color.bgTabBar} />
                    </View>
                  }
                  locale={"vi"}
                />
              </View>
            </View>
            <View style={{ width: "10%" }} />
            <View style={styles.contentDate}>
              <Text style={styles.textContent}>{String.endDate}</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Color.bdBrow,
                  marginTop: 10,
                  borderRadius: 2
                }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  date={this.state.valueToDate}
                  mode="date"
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  minDate="2000-01-01"
                  maxDate="2050-01-01"
                  confirmBtnText={String.finish}
                  cancelBtnText={String.back}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      alignItems: "center"
                    },
                    dateText: {
                      color: Color.textBrow,
                      fontSize: 14
                    }
                  }}
                  onDateChange={date => {
                    let day = date.replace("/", "").replace("/","");
                    this.setState({ 
                      toDate: day ,
                      valueToDate: date
                    });
                  }}
          
                  iconComponent={
                    <View style={{ marginRight: 10 }}>
                      <Icon name="calendar" size={25} color={Color.bgTabBar} />
                    </View>
                  }
                  locale={"vi"}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {this.setState({isSelectCity: true});}}
            style={{
              width: "100%",
              height: 40,
              borderWidth: 1,
              borderColor: Color.bdBrow,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2
            }}
          >
            <Text style={{fontSize: 14, color: Color.textBrow}}>
              {" -  -  " + String.select + " -  -  "}
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._getQuantity}
            style={{
              width: "100%",
              height: 40,
              borderWidth: 1,
              borderColor: Color.bdBrow,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              backgroundColor: Color.bgTabBar
            }}
          >
            <Text style={{fontSize: 14, color: Color.textWhite, fontWeight: "bold"}}>
              {String.see}
            </Text>
          </TouchableOpacity>

          <ScrollView style={{ width: "100%" }}>
            {this.state.quantity.map((item, index) => {
              let width =
                (item.quantityExpected * 100) / this._getHighestQuantity();
              return (
                <View
                  key={`sanpham-${index}`}
                  style={{
                    marginTop: 15,
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>{item.name}</Text>
                    <Text>{item.quantityExpected + " " +item.unitName}</Text>
                  </View>
                  <View
                    style={{
                      width: `${width}%`,
                      height: 10,
                      backgroundColor:Color.bgTabBar
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isSelectCity}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "black", 
                opacity: 0.5,
                zIndex: 1
              }}
            />
            <View
              style={{
                width: "100%",
                height: "50%",
                position: "absolute",
                zIndex: 2,
                backgroundColor: Color.bgWhite
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderColor: Color.bdBrow
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isSelectCity: false });
                  }}
                  style={{
                    margin: 15
                  }}
                >
                  <Text style={{ fontSize: 14, color: Color.bgTabBar }}>
                    {String.back}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      chooseProductionPlan: String.chooseProductionPlan,
                      isSelectCity: false,
                      idPlan: 0
                    });
                  }}
                  style={{ margin: 15 }}
                >
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {String.noSelect}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <FlatList
                style={{ width: "100%", height: "100%" }}
                data={this.state.listPlans}
                renderItem={this._renderSelectPlan}
                keyExtractor={(item, index) => `remindWork-${index}`}
              /> */}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  contentDate: {
    width: "45%"
  },
  textContent: {
    fontSize: 13,
    color: Color.textBrow
  }
});
