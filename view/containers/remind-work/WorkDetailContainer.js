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

const height = Dimensions.get("window").height;

export default class WorkDetailContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: String.detail,
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
          <Icon name="chevron-left" size={15} color={Color.textWhite} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
        metadata: this.props.navigation.state.params.item.metadata,
    };
    console.log("work detail");
  }

  async componentWillMount() {}

  componentDidMount() {
      console.log(111, this.state.metadata);
    this.props.navigation.setParams({ goBack: this._goBack });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
     <ScrollView style={styles.container}>
        <View style={{width: "100%", alignItems: "center"}}>
            
        </View>
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
