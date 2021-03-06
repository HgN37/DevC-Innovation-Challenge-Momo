import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View
} from "react-native";
const LOLLIPOP = 21;
export default class TouchableItem extends React.Component {
  static defaultProps = {
    pressColor: "rgba(255, 255, 255, .4)"
  };
  render() {
    const { style, pressOpacity, pressColor, borderless, ...rest } = this.props;
    if (Platform.OS === "android" && Platform.Version >= LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          {...rest}
          background={TouchableNativeFeedback.Ripple(pressColor, borderless)}
        >
          <View style={style}>{React.Children.only(this.props.children)}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity {...rest} style={style} activeOpacity={pressOpacity}>
          {this.props.children}
        </TouchableOpacity>
      );
    }
  }
}
