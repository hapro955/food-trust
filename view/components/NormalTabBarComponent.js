import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity
} from "react-native";

export default class NormalTabBar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderTab = (name, page, isTabActive, onPressHandler) => {
    let { tabStyle, textStyle, activeTabStyle, activeTextStyle } = this.props;

    let tabStyles = [styles.tab, tabStyle];
    let textStyles = [textStyle];
    if (isTabActive) {
      tabStyles.push(activeTabStyle);
      textStyles.push(activeTextStyle);
    }

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        key={"tab-" + page}
        onPress={() => onPressHandler(page)}
      >
        <View style={tabStyles}>
          <Text style={textStyles}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderIndicator = () => {
    const { containerWidth, tabs, activeTab, indicatorStyle } = this.props;
    if (indicatorStyle && indicatorStyle.height == 0) {
      return;
    }
    const tabWitdh =
      tabs.length > 0 ? containerWidth / tabs.length : containerWidth;
    const defaultStyle = {
      position: "absolute",
      width: tabWitdh,
      height: 4,
      backgroundColor: "navy",
      bottom: 0
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, tabWitdh]
    });

    return (
      <Animated.View
        style={[
          defaultStyle,
          {
            transform: [{ translateX }]
          },
          this.props.indicatorStyle
        ]}
      />
    );
  };

  render() {
    const {
      containerWidth,
      tabbarStyle,
      tabs,
      renderTab,
      activeTab,
      goToPage
    } = this.props;
    return (
      <View style={[styles.tabbar, tabbarStyle]}>
        {this._renderIndicator()}
        {tabs.map((name, page) => {
          const isTabActive = activeTab === page;
          const renderTab = renderTab || this._renderTab;
          return renderTab(name, page, isTabActive, goToPage);
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});