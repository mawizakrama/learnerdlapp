import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity
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
import config from "./config";
import { Actions } from "react-native-router-flux";

export default class LessonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.loadLessons();
  }

  loadLessons = () => {
    return fetch(config.baseApiUrl + config.getLessons)
      .then(data => data.json())
      .then(dataJson => {
        this.setState({ lessons: dataJson, isLoading: false });
      })
      .catch(err => Alert.alert("Error", err));
  };

  mapscreenpage = () => {
    Actions.mapscreenpage({ insID: this.props.insID });
  };

  renderLessons = () => {
    const { lessons } = this.state;
    return lessons.map(lesson => (
      <Card key={lesson._key}>
        <CardItem button onPress={this.mapscreenpage}>
          <Body>
            <Text style={{ fontSize: 22 }}>{lesson.name}</Text>
          </Body>
        </CardItem>
      </Card>
    ));
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
              Select a Lesson to book a lesson
            </Text>
          </CardItem>
        </Card>
        {this.renderLessons()}
      </ScrollView>
    );
  }
}
