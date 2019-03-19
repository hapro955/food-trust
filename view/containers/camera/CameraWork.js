import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Permissions, Camera } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";
import Color from "../../../res/Colors";
import String from "../../../res/Strings";

export default class CameraWork extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: null,
      headerStyle: {
        height: 40,
        borderBottomWidth: 0
      },
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 20, flexDirection: "row", alignItems: "center" }}
          hitSlop={{ top: 25, left: 25, bottom: 25, right: 25 }}
          onPress={() => {
            navigation.state.params._handleGetVieoFromCamera(
              params.getVideoUrl()
            );
            navigation.goBack();
          }}
        >
          <Icon name="chevron-left" size={15} color={Color.bgTabBar} />
          <Text style={{ fontSize: 15, color: Color.bgTabBar, marginLeft: 5 }}>
            {String.back}
          </Text>
        </TouchableOpacity>
      ),
      headerRight: <View />
    };
  };
  videoSource = [];
  camera = null;
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      message: "",
      record: "white",
    };
    console.log("camera work");
    console.log("hans props", this.props);
  }

  async componentWillMount() {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _handleUriVideo = result => {
    const localUri = result.uri;
    const localName = Math.floor(Date.now() / 1000).toString();
    const localType = "mov";
    return {
      uri: localUri,
      name: localName,
      type: localType
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      getVideoUrl: this._getVideoUrl
    });
  }

  _getVideoUrl = () => {
    console.log("du lieu video lay duoc", this.videoSource);
    return this.videoSource;
  };

  startVideo = async () => {
    if (!this.camera) return;
    console.log("start");
    try {
      this.setState({ record: "red" });
      const data = await this.camera.recordAsync({});
      console.log("when quay video", data);
      this.videoSource.push(this._handleUriVideo(data));
    } catch (error) {
      this.setState({ message: error });
      throw error;
    }
  };

  stopVideo = () => {
    if (!this.camera) return;
    console.log("stop");
    this.setState({ record: "white" });
    this.camera.stopRecording();
  };

  recordVideo = async () => {
    console.log(this.state.record);
    if (this.state.record === "white") {
      this.startVideo();
    } else {
      this.stopVideo();
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            style={styles.preview}
            type={Camera.Constants.Type.back}
            onCameraReady={() => {
              this.setState({ message: "Camera Ready !" });
            }}
          >
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.capture}
                onPress={this.recordVideo}
              >
                <Icon
                  name="stop-circle-o"
                  style={[
                    { color: this.state.record },
                    { fontSize: 80, marginBottom: 10 }
                  ]}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        // </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  preview: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  capture: {
    width: 90,
    height: 90,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  }
});
