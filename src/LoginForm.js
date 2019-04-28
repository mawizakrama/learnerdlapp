import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import config from "./config";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  mainpage = () => {
    Actions.mainpage();
  };

  onSignInPress = () => {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    return fetch(config.baseApiUrl + config.learnerLogin, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(dataJson => {
        if (dataJson.user !== undefined && dataJson.user !== null) {
          AsyncStorage.setItem("@Learner:uid", dataJson.user.uid)
            .then(this.mainpage)
            .catch(err => console.error(err));
        }
        if (dataJson.message !== undefined && dataJson.message !== null) {
          this.setState({ isLoading: false });
          Alert.alert("Message", dataJson.message);
        }
      })
      .catch(err => Alert.alert("Error", err));
  };

  render() {
    if (this.state.isLoading === true) {
      return <ActivityIndicator />;
    }
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="james@gmail.com"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          autoCorrect={false}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Your password"
          secureTextEntry
          placeholderTextColor="#ffffff"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity style={styles.button} onPress={this.onSignInPress}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10
  },

  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 16,
    marginVertical: 10,
    paddingVertical: 13
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },

  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});
