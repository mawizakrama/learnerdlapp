import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  AsyncStorage
} from "react-native";
import MapView from "react-native-maps";
//import { db } from './config';
import firebase from "firebase";
import io from "socket.io-client";
import config from "./config";
import { Actions } from "react-native-router-flux";

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      uid: ""
    };
    console.log(this.props);
    this.socket = io.connect(config.baseApiUrl);
  }

  requestInstructor() {
    this.socket.emit("request_ins", {
      uid: this.state.uid,
      lat: this.state.latitude,
      lng: this.state.longitude,
      insId: this.props.insID.insId
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
    AsyncStorage.getItem("@Learner:uid")
      .then(uid => {
        if (uid !== undefined && uid !== null) {
          this.setState({ uid });
        } else {
          Actions.login();
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
        />

        <TouchableOpacity
          onPress={() => this.requestInstructor()}
          style={styles.bottomButton}
        >
          <View>
            <Text style={styles.bottomButtonText}>FIND INSTRUCTOR</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: "#1c313a",
    marginTop: "auto",
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center"
  },
  bottomButtonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "600"
  },

  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default MapScreen;
