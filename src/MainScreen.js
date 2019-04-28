import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Title,
  Icon
} from "native-base";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";
import LessonsBookScreen from "./drawerComponents/LessonsBookScreen";
import InstitutesScreen from "./drawerComponents/InstitutesScreen";
import Logout from "./Logout";
import { Actions } from "react-native-router-flux";

class MainScreen extends Component {
  render() {
    return <AppContainer />;
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Settings",
    drawerIcon: ({ tintColor }) => (
      <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
    )
  };
  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#455a64" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Settings</Title>
          </Body>
          <Right>
            <Icon name="more" style={{ color: "#455a64" }} />
          </Right>
        </Header>
        <Text>settings page</Text>
      </View>
    );
  }
}

class NotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Notifications",
    drawerIcon: ({ tintColor }) => (
      <Icon name="notifications" style={{ fontSize: 24, color: tintColor }} />
    )
  };
  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#455a64" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Notifications</Title>
          </Body>
          <Right>
            <Icon name="more" style={{ color: "#455a64" }} />
          </Right>
        </Header>
        <Text>notifications and bonuses etc</Text>
      </View>
    );
  }
}

class LessonsHistory extends React.Component {
  static navigationOptions = {
    drawerLabel: "Lessons History",
    drawerIcon: ({ tintColor }) => (
      <Icon name="time" style={{ fontSize: 24, color: tintColor }} />
    )
  };
  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#455a64" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Trips History</Title>
          </Body>
          <Right>
            <Icon name="more" style={{ color: "#455a64" }} />
          </Right>
        </Header>
        <Text>lessons history/ completed and cancelled trips</Text>
      </View>
    );
  }
}

class PaymentOptions extends React.Component {
  static navigationOptions = {
    drawerLabel: "Payment",
    drawerIcon: ({ tintColor }) => (
      <Icon name="cash" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#455a64" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Your Earnings</Title>
          </Body>
          <Right>
            <Icon name="more" style={{ color: "#455a64" }} />
          </Right>
        </Header>
        <Text>payment options cash and card</Text>
      </View>
    );
  }
}

class ManageRatings extends React.Component {
  static navigationOptions = {
    drawerLabel: "Your Ratings",
    drawerIcon: ({ tintColor }) => (
      <Icon name="star" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#85B8BA" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: "#1c313a" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: "#1c313a" }}>Manage Ratings</Title>
          </Body>
          <Right>
            <Icon name="more" style={{ color: "#85B8BA" }} />
          </Right>
        </Header>
        <Text>instructors ratings by learners</Text>
      </View>
    );
  }
}

class EditProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: "Edit Profile",
    drawerIcon: ({ tintColor }) => (
      <Icon name="person" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#85B8BA" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: "#1c313a" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: "#1c313a" }}>Edit Profile</Title>
          </Body>
          <Right>
            <Icon name="more" style={{ color: "#85B8BA" }} />
          </Right>
        </Header>
        <Text>add or edit personal details here</Text>
      </View>
    );
  }
}

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 200,
        backgroundColor: "white",
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        source={require("./assets/useravatar.png")}
        style={{ height: 120, width: 120, borderRadius: 60 }}
      />
      <Text style={{ fontSize: 22, fontWeight: "300" }}>Username</Text>
    </View>

    <ScrollView>
      <DrawerItems
        {...props}
        onItemPress={route => {
          if (route.route.routeName == "Logout") {
            AsyncStorage.removeItem("@Learner:uid").then(() => Actions.login());
          }
        }}
      />
    </ScrollView>
  </SafeAreaView>
);

const MainScreenDrawer = createDrawerNavigator(
  {
    Home: { screen: InstitutesScreen },
    Notis: { screen: NotificationsScreen },
    History: { screen: LessonsHistory },
    Payment: { screen: PaymentOptions },
    LessonsBook: { screen: LessonsBookScreen },
    Settings: { screen: SettingsScreen },
    Logout: { screen: Logout }
  },
  {
    initialRouteName: "Home",
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "#455a64"
    }
  }
);

const AppContainer = createAppContainer(MainScreenDrawer);

export default MainScreen;
