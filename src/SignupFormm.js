import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import config from "./config";
import { Actions } from "react-native-router-flux";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      cpassword: "",
      fullname: "",
      phone: "",
      type: "learner",
      isLoading: true
    };
  }

  register = () => {
    const { fullname, email, password, cpassword, phone } = this.state;
    console.log(fullname, email, password, cpassword, phone);
    return fetch(config.baseApiUrl + config.learnerRegister, {
      method: "POST",
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        password: password,
        cpassword: cpassword,
        phone: phone
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(dataJson => {
        console.log(dataJson);
        if (dataJson.message !== undefined && dataJson.message !== null) {
          Alert.alert("Message", dataJson.message);
        }
      })
      .catch(err => {
        Alert.alert("Error", err.message);
      });
    // .then(dataJson => {
    //   console.log(dataJson);
    //   if (dataJson.message !== undefined && dataJson.message !== null) {
    //     Alert.alert("Message", dataJson.message);
    //     Actions.mainpage();
    //   }
    // });
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="james@gmail.com"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          // onSubmitEditing={() => this.password.focus()}
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Full name"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          // onSubmitEditing={() => this.password.focus()}
          value={this.state.fullname}
          onChangeText={text => this.setState({ fullname: text })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Your password"
          secureTextEntry
          placeholderTextColor="#ffffff"
          value={this.state.password}
          //ref={() => this.password = input}
          onChangeText={text => this.setState({ password: text })}
        />

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Confirm password"
          secureTextEntry
          placeholderTextColor="#ffffff"
          value={this.state.cpassword}
          //ref={() => this.password = input}
          onChangeText={text => this.setState({ cpassword: text })}
        />

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Phone"
          placeholderTextColor="#ffffff"
          value={this.state.phone}
          //ref={() => this.password = input}
          onChangeText={text => this.setState({ phone: text })}
        />

        <TouchableOpacity style={styles.button} onPress={this.register}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignupForm;

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
  }
});
