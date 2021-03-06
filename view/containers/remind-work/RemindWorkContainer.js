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
  TextInput,
  ActivityIndicator,
  Image,
  Picker,
  Button,
  Modal
} from "react-native";
import String from "../../../res/Strings";
import Color from "../../../res/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import NormalTabBar from "../../components/NormalTabBarComponent";
import {
  remindWork,
  getNotification,
  getWorkDone,
  getSupplies,
  postListUseSupplies,
  getListPlans,
  getPlan
} from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";
import { baseUrl } from "../../../data/services/VfscUrl";
import { FileSystem, Permissions } from "expo";

const width = Dimensions.get("window").width;

export default class RemindWorkContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.remindWork,
      headerTitleStyle: {
        fontSize: 15,
        color: Color.textWhite,
        flex: 1,
        textAlign: "center"
      },
      headerStyle: {
        height: 60,
        borderBottomWidth: 0,
        backgroundColor: Color.bgGreen
      },
      headerLeft: <View />,
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}
          onPress={navigation.getParam("goHome")}
        >
          <Icon name="bars" size={15} color={Color.textWhite} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    console.log("s remindWorkContainer");
    super(props);
    this.state = {
      remindWork: [],
      notification: [],
      workDone: [],
      supplies: [],
      isLoading: false,
      showSeemore: true,
      textInputs: [],
      PickerValueHolder: "",
      isSelectPlan: false,
      listPlans: [],
      chooseProductionPlan: String.chooseProductionPlan,
      idPlan: 0,
      isConfirm: false
    };
    this.page = 0;
  }

  componentWillMount() {
    this.props.navigation.setParams({ goHome: this._goHome });
  }

  async componentDidMount() {
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    let remindWork = await this._getRemindWork(accessToken);
    let notification = await this._getNotification(accessToken);
    let workDone = await this._getWorkDone(accessToken, this.page, 5);
    let supplies = await this._getSupplies(accessToken);
    let listPlans = await this._getListPlans(accessToken);
    this.totalElements = workDone.totalElements;
    this.setState({
      remindWork: remindWork,
      notification: notification,
      workDone: workDone.content,
      supplies: supplies,
      listPlans: listPlans
    });
  }

  GetSelectedPickerItem = () => {
    Alert.alert(this.state.PickerValueHolder);
  };

  _getListPlans = async accessToken => {
    return await getListPlans(accessToken);
  };

  _getSupplies = async accessToken => {
    return await getSupplies(accessToken);
  };
  _goHome = () => {
    this.props.navigation.navigate("Menu");
  };

  _getRemindWork = async accessToken => {
    return await remindWork(accessToken);
  };

  _getNotification = async accessToken => {
    return await getNotification(accessToken);
  };

  _getWorkDone = async (accessToken, page, size) => {
    let reponse = await getWorkDone(accessToken, page, size);
    if (reponse) this.page = this.page + 1;
    return reponse;
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

  _renderRemindToday = () => {
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
          <View style={{ marginBottom: 10 }} />
          <FlatList
            style={{ width: "90%", height: "100%" }}
            data={this.state.remindWork}
            renderItem={this._renderListRemindWork}
            keyExtractor={(item, index) => `remindWork-${index}`}
          />
        </View>
      </ScrollView>
    );
  };

  _renderNotification = () => {
    return (
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel="Thông báo"
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center"
          }}
        >
          <View style={{ marginBottom: 10 }} />
          <FlatList
            style={{ width: "90%", height: "100%" }}
            data={this.state.notification}
            renderItem={this._renderListNotificatioin}
            keyExtractor={(item, index) => `notification-${index}`}
          />
        </View>
      </ScrollView>
    );
  };

  _renderListNotificatioin = notification => {
    let item = notification.item;
    let level = "";
    let styleTextWithLevel = {};
    if (item.level == 0) {
      level = String.noraml;
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
            <View style={{ width: "100%" }}>
              <Text style={styles.textTitle}>{String.level}</Text>
              <Text style={[styles.textContent, styleTextWithLevel]}>
                {level}
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PerformWork", {
                  item: item,
                  type: "notify"
                });
              }}
              style={styles.buttonPerformWork}
            >
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

  _renderWorkDone = () => {
    return (
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel="Đã làm"
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center"
          }}
        >
          <View style={{ marginBottom: 10 }} />
          <FlatList
            style={{ width: "90%", height: "100%" }}
            data={this.state.workDone}
            renderItem={this._renderListWorkDone}
            ListFooterComponent={this._renderFooterWorkDone.bind(this)}
            keyExtractor={(item, index) => `workDone-${index}`}
          />
        </View>
      </ScrollView>
    );
  };

  _renderListWorkDone = ({ item }) => {
    let title = "";
    let contentTitle = "";
    if (item.work !== null) {
      title = "Công việc thời điểm: ";
      contentTitle = item.work.description;
    } else if (item.notify !== null) {
      title = "Thông báo: ";
      contentTitle = item.notify.description;
    } else if (item.period !== null) {
      title = "Công việc định kì: ";
      contentTitle = item.period.description;
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
          <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textContent}>{contentTitle}</Text>
          </View>

          <View style={{ marginBottom: 30 }}>
            <FlatList
              style={{ width: "100%" }}
              horizontal={true}
              data={item.metadata}
              renderItem={items => {
                let item = items.item;

                let isImage =
                  item.filetype && item.filetype.indexOf("image") == 0;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      this._handleDowloadFile(item);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    <View style={{}}>
                      {isImage ? (
                        <Icon name="image" size={40} color={Color.bgTabBar} />
                      ) : (
                        <Icon name="video" size={40} color={Color.bgTabBar} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => `item-image-${index}`}
            />
          </View>
        </View>
      </View>
    );
  };

  _handleDowloadFile = async item => {
    let uri = baseUrl + item.url;
    let fileName = FileSystem.cacheDirectory + item.filename;

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      FileSystem.downloadAsync(uri, fileName)
        .then(({ uri }) => {
          console.log(6666, uri);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  _renderFooterWorkDone() {
    return (
      <View style={styles.footer}>
        {this.state.isLoading ? (
          <ActivityIndicator
            color={Color.textBlue}
            style={{ marginBottom: 15 }}
          />
        ) : null}
        {this.state.workDone.length !== this.totalElements ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this._loadMoreWorkDone}
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>{String.seeMore}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  _loadMoreWorkDone = async () => {
    this.setState({ isLoading: true });
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    let workDone = await this._getWorkDone(accessToken, this.page, 1);
    this.setState({
      workDone: [...this.state.workDone, ...workDone.content],
      isLoading: false
    });
  };

  _renderListRemindWork = ({ item }) => {
    let arrayDate = [];
    for (let i = 0; i < item.dateAlert.length; i++) {
      let date = new Date(item.dateAlert[i]);
      arrayDate.push(date.toLocaleDateString("en-GB"));
    }
    let title = "";
    let contentTitle = "";
    let hour = "";
    if (item.work !== null) {
      title = "Công việc thời điểm: ";
      contentTitle = item.work.description;
      hour = item.work.hour;
    } else if (item.notify !== null) {
      title = "Thông báo: ";
      contentTitle = item.notify.description;
      hour = item.notify.hour;
    } else if (item.period !== null) {
      title = "Công việc định kì: ";
      contentTitle = item.period.description;
      hour = item.period.hour;
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
          <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textContent}>{contentTitle}</Text>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={styles.textTitle}>{String.doneAt}</Text>
            {hour !== undefined ? (
              <Text style={styles.textContent} numberOfLines={1}>
                {hour}
                {"h"}
              </Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 15, flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <Text style={styles.textTitle}>{String.doneOnDay}</Text>
              {arrayDate.map(item => {
                return (
                  <Text key={item} style={styles.textContent} numberOfLines={1}>
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonPerformWork}
              onPress={() => {
                this.props.navigation.navigate("PerformWork", {
                  item: item,
                  type: "today"
                });
              }}
            >
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

  _renderSupplies() {
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#F1F1F1" }}
        tabLabel="Kho"
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View>
            <View style={{ marginBottom: 10 }} />
            <View
              style={{
                width: "96%",
                alignItems: "center",
                backgroundColor: Color.bgWhite
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: 40
                }}
              >
                <View style={[{ flex: 1 }, styles.supplies]}>
                  <Text style={styles.contentSupplies}>
                    {String.numericalOrder}
                  </Text>
                </View>
                <View style={[{ flex: 4 }, styles.supplies]}>
                  <Text style={styles.contentSupplies}>{String.supplies}</Text>
                </View>
                <View style={[{ flex: 2 }, styles.supplies]}>
                  <Text style={styles.contentSupplies}>{String.amount}</Text>
                </View>
                <View style={[{ flex: 2 }, styles.supplies]}>
                  <Text style={styles.contentSupplies}>{String.using}</Text>
                </View>
              </View>
            </View>
            {this.state.supplies.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: "96%",
                    alignItems: "center",
                    backgroundColor: Color.bgWhite
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      height: 40
                    }}
                  >
                    <View style={[{ flex: 1 }, styles.supplies]}>
                      <Text style={styles.contentSupplies}>{index + 1}</Text>
                    </View>
                    <View style={[{ flex: 4 }, styles.supplies]}>
                      <Text style={styles.contentSupplies}>{item.name}</Text>
                    </View>
                    <View style={[{ flex: 2 }, styles.supplies]}>
                      <Text style={styles.contentSupplies}>
                        {item.total} {item.unitName}
                      </Text>
                    </View>
                    <View style={[{ flex: 2 }, styles.supplies]}>
                      <TextInput
                        onChangeText={text => {
                          let { textInputs } = this.state;
                          textInputs[index] = {
                            quantity: parseInt(text),
                            id: item.id,
                            unitId: item.unitId,
                            warehouseId: item.warehouseId
                          };
                          this.setState({
                            textInputs
                          });
                        }}
                        style={{
                          borderColor: "gray",
                          borderWidth: 0.5,
                          borderColor: Color.textBrow,
                          fontSize: 13,
                          width: "70%",
                          height: 30,
                          color: Color.textBlack
                        }}
                        keyboardType={"number-pad"}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              width: "96%",
              flexDirection: "row",
              marginBottom: 100
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isSelectPlan: true
                });
              }}
              style={{
                width: "50%",
                height: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                borderColor: Color.bdBrow,
                marginTop: 20,
                borderRadius: 4
              }}
            >
              <View>
                <Text>{this.state.chooseProductionPlan}</Text>
              </View>

              <Icon name="chevron-down" size={15} color={Color.textBlack} />
            </TouchableOpacity>
            <View
              style={{
                width: "50%",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              {this.state.isConfirm === true ? (
                <ActivityIndicator
                  color={Color.textBlue}
                  style={{ marginBottom: 15 }}
                />
              ) : (
                <TouchableOpacity
                  onPress={this._handleConfirmUseOfSupplies}
                  style={{
                    width: "70%",
                    height: 40,
                    backgroundColor: Color.bgTabBar,
                    borderRadius: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: Color.textWhite
                    }}
                  >
                    {String.confirm}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }

  _handleConfirmUseOfSupplies = async () => {
    this.setState({
      isConfirm: true
    });
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
    let listUseSupplies = [];
    for (let i = 0; i < this.state.textInputs.length; i++) {
      if (this.state.textInputs[i] != undefined) {
        if (parseInt(this.state.textInputs[i].quantity) > 0) {
          listUseSupplies.push(this.state.textInputs[i]);
        }
      }
    }
    if(this.state.idPlan > 0) {
      let plan = await getPlan(this.state.idPlan, accessToken);
    }
    let useSupplies = await postListUseSupplies(listUseSupplies, accessToken);
    this.setState({
      isConfirm: false
    });
  };

  _renderSelectPlan = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            isSelectPlan: false,
            chooseProductionPlan: item.item.name,
            idPlan: item.item.id
          });
        }}
        style={{
          width: "100%",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: Color.bdBrow
        }}
      >
        <Text style={{ fontSize: 13, color: Color.textBrow }}>
          {item.item.name}
        </Text>
      </TouchableOpacity>
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
          {this._renderRemindToday()}
          {this._renderNotification()}
          {this._renderWorkDone()}
          {this._renderSupplies()}
        </ScrollableTabView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isSelectPlan}
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
                    this.setState({ isSelectPlan: false });
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
                      isSelectPlan: false,
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
              <FlatList
                style={{ width: "100%", height: "100%" }}
                data={this.state.listPlans}
                renderItem={this._renderSelectPlan}
                keyExtractor={(item, index) => `remindWork-${index}`}
              />
            </View>
          </View>
        </Modal>
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
    fontSize: 14,
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
  },
  buttonDetail: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgTabBar,
    borderRadius: 5,
    width: "50%",
    height: 40
  },
  footer: {
    justifyContent: "center",
    alignItems: "center"
  },
  loadMoreBtn: {
    height: 40,
    backgroundColor: Color.bgTabBar,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 13,
    fontWeight: "bold",
    color: Color.textWhite
  },
  supplies: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Color.bdBrow
  },
  contentSupplies: {
    fontSize: 12,
    fontWeight: "normal",
    color: Color.textBlack
  }
});
