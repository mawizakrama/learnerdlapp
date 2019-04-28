import React from "react";
import { Text } from "react-native";
import { Icon } from "native-base";

export default class Logout extends React.Component {
  static navigationOptions = {
    drawerLabel: "Logout",
    drawerIcon: ({ tintColor }) => (
      <Icon name="logout" style={{ fontSize: 24, color: tintColor }} />
    )
  };
  constructor(props) {
    super(props);
  }
  render() {
    return <Text>Logout</Text>;
  }
}
