import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Platform
} from "react-native";
import String from "../../../res/Strings";
import Color from "../../../res/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { ImagePicker, Permissions } from "expo";
import { uploadImage, createWorkflow } from "../../../data/services/VfscApi";
import TokenLocal from "../../../data/local/TokenLocal";

const height = Dimensions.get("window").height;

export default class PerformWorkContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.performTheWork,
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
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}
          onPress={navigation.getParam("goBack")}
        >
          <Icon name="chevron-left" size={15} color={Color.textWhite} />
        </TouchableOpacity>
      ),
      headerRight: <View />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      imageSource: [],
      videoSource: [],
      contentDone: ""
    };
    console.log("perform work");
    console.log(333, this.props.navigation.state.params);
  }

  async componentWillMount() {}

  componentDidMount() {
    this.props.navigation.setParams({ goBack: this._goBack });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _takePicture = async () => {
    const { status } = await Permissions.askAsync( Permissions.CAMERA);
		if(status === 'granted' ) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.1
      });
      if (!result.cancelled) {
        console.log(33333, result);
      }
    }
  };

  _pickFilePermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      this._pickFile();
    } 
  };

  _handleUriImage = (result) => {
      const localUri = result.uri;
      const localName = Math.floor(Date.now() / 1000).toString();
      const localType = result.type;
      return {
        uri: localUri,
        name: localName,
        type: localType
      };
  }

  _pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    let imageSource = this.state.imageSource;
    imageSource.push(this._handleUriImage(result));
    this.setState({
      imageSource: imageSource
    });
  };

  _renderListImage() {
    return (
      <View style={{ flex: 1, marginBottom: 15 }}>
        <Text style={styles.textTitle}>{String.image}</Text>
        <FlatList
          style={{ width: "100%" }}
          horizontal={true}
          data={this.state.imageSource}
          renderItem={this._renderImage}
          keyExtractor={(item, index) => `item-image-${index}`}
        />
      </View>
    );
  }

  _renderImage(item) {
    return (
      <View style={{ marginRight: 10 }}>
        <Image
          source={{ uri: item.item.uri }}
          style={{ height: 100, width: 100 }}
        />
      </View>
    );
  }

  _renderListVideo() {
    return (
      <View style={{ flex: 1, marginBottom: 15 }}>
        <Text style={styles.textTitle}>{String.video}</Text>
        <FlatList
          horizontal={true}
          data={this.state.videoSource}
          renderItem={({ item }) => this._renderVideo(item)}
          keyExtractor={(item, index) => `item-video-${index}`}
        />
      </View>
    );
  }

  _renderVideo(item) {
    return (
      <View style={{ marginRight: 10 }}>
        <Image source={{ uri: item.uri }} style={{ height: 100, width: 100 }} />
      </View>
    );
  }

  createFormData = (photos) => {
    const formData = new FormData();
    photos.forEach(function(photo) {
      formData.append("files", photo);
    });
    return formData;
  };

_handleWork = async (result) => {
  let accessToken = "";
  await TokenLocal.getAccessToken().then(data => {
    accessToken = data;
  });
  let {item} = this.props.navigation.state.params;
  let planId = item.planId;
  let notifyId = null;
  let workId = null;
  let periodId = null;
  if(item.notify != null) {
    notifyId = item.notify.id;
  }else if(item.period != null) {
    periodId = item.period.id;
  }else if(item.work != null) {
    workId = item.work.id;
  }
  let metadata = result;
  let workflow = Object.assign({
    "planId": planId,
    "notifyId": notifyId,
    "periodId": periodId,
    "workId": workId,
    "metadata": metadata
  });

  let resultWorkflow = await createWorkflow(workflow, accessToken);
  console.log(898989, resultWorkflow);
}

  _handleFinish = async () => {
    let accessToken = "";
    await TokenLocal.getAccessToken().then(data => {
      accessToken = data;
    });
  
    let body = this.createFormData(this.state.imageSource);

    let result = await uploadImage(body, accessToken);
    let ids = [];
    if(result && result.length > 0) {
      result.forEach(function(item){
        ids.push(item.id);
      });
    }
    this._handleWork(ids);

  };

  _handleCamera = async () => {
    const { status } = await Permissions.askAsync( Permissions.CAMERA);
		 if(status === 'granted' ){
      const { status } = await Permissions.askAsync( Permissions.AUDIO_RECORDING);
      if(status === 'granted' ){
        this.props.navigation.navigate("Camera");
      }
     }
    
  }

  render() {
    let item = null;
    let level = "";
    let styleTextWithLevel = {};
    if (this.props.navigation.state.params.type === "today") {
      if (this.props.navigation.state.params.item.work !== null) {
        item = this.props.navigation.state.params.item.work;
      } else if (this.props.navigation.state.params.item.notify !== null) {
        item = this.props.navigation.state.params.item.notify;
      } else if (this.props.navigation.state.params.item.period !== null) {
        item = this.props.navigation.state.params.item.period;
      }
      level = String.doItNow;
      styleTextWithLevel = { color: Color.textRed };
    } else if (this.props.navigation.state.params.type === "notify") {
      item = this.props.navigation.state.params.item;
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
    }
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flex: 1,
            backgroundColor: Color.bgWhite,
            alignItems: "center"
          }}
        >
          <View style={{ width: "90%" }}>
            <View
              style={{
                marginBottom: 15,
                marginTop: 15,
                justifyContent: "center"
              }}
            >
              <Text style={styles.textTitle}>{String.content}</Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.textBlack
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </View>
            <View style={{ marginBottom: 15, justifyContent: "center" }}>
              <Text style={styles.textTitle}>{String.level}</Text>
              <Text style={[styles.textContent, styleTextWithLevel]}>
                {level}
              </Text>
            </View>
            <View style={{ marginBottom: 20, justifyContent: "center" }}>
              <Text style={styles.textTitle}>{String.perform}</Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 0.5,
                  borderColor: Color.textBrow,
                  fontSize: 13,
                  color: Color.textBlack
                }}
                onChangeText={text => this.setState({ contentDone: text })}
                value={this.state.contentDone}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 15
              }}
            >
              <TouchableOpacity 
                style={styles.buttonPerformWork}
                onPress={this._handleCamera}
                >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: Color.textWhite
                  }}
                >
                  {String.video}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={this._takePicture}
                style={styles.buttonPerformWork}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: Color.textWhite
                  }}
                >
                  {String.takePhoto}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._pickFilePermission.bind(this)}
                style={styles.buttonPerformWork}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: Color.textWhite
                  }}
                >
                  {String.selectFile}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.imageSource.length > 0 ? this._renderListImage() : null}
            {/* {this.state.videoSource.length > 0 ? this._renderListVideo() : null} */}
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={this._handleFinish}
                style={styles.buttonFinishWork}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: Color.textWhite
                  }}
                >
                  {String.finish}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    width: "25%",
    height: 40
  },
  buttonFinishWork: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.bgTabBar,
    borderRadius: 5,
    width: "70%",
    height: 40
  }
});
