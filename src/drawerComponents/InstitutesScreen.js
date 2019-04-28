import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Title,
  Icon,
  Card,
  CardItem,
  Content
} from "native-base";
import { Actions } from "react-native-router-flux";
import config from "../config";

class StatusScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      institutes: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.loadInstitutes();
  }

  loadInstitutes = () => {
    return fetch(config.baseApiUrl + config.getInstitutes, {
      method: "GET"
    })
      .then(data => data.json())
      .then(dataJson => {
        console.log(dataJson);
        if (dataJson !== undefined && dataJson !== null) {
          this.setState({ institutes: dataJson, isLoading: false });
        }
      })
      .catch(err => Alert.alert("Error", err));
  };

  renderInstitutes = () => {
    const { institutes } = this.state;
    return institutes.map(ins => (
      <Card key={ins._key}>
        <CardItem
          button
          onPress={() => this.lessonsscreen({ insId: ins._key })}
        >
          <Body>
            <Text style={{ fontSize: 22 }}>{ins.name}</Text>
          </Body>
        </CardItem>
      </Card>
    ));
  };

  lessonsscreen = insid => {
    Actions.lessonsscreen({ insID: insid });
  };

  render() {
    if (this.state.isLoading === true) {
      return <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <Header style={{ backgroundColor: "#455a64" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Institutes Closeby</Title>
          </Body>
          <Right>
            <Icon name="more" style={{ color: "#455a64" }} />
          </Right>
        </Header>

        <Card>
          <CardItem header bordered>
            <Text style={{ fontSize: 28, fontWeight: "200" }}>
              Select an institute to book a lesson
            </Text>
          </CardItem>
        </Card>
        {this.renderInstitutes()}
      </ScrollView>
    );
  }
}

export default StatusScreen;
