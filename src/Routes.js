import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { Scene, Router, ActionConst } from "react-native-router-flux";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MainScreen from "./MainScreen";
import MapScreen from "./MapScreen";
import LessonsScreen from "./LessonsScreen";
//hideBackImage drawerImage={'Hamburger'}

class RouterComponent extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      isLoading: true
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("@Learner:uid")
      .then(uid => {
        if (uid !== undefined && uid !== null) {
          this.setState({ loggedIn: true, isLoading: false });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <React.Fragment>
          <ActivityIndicator />
        </React.Fragment>
      );
    }
    if (this.state.loggedIn) {
      return (
        <Router
          navigationBarStyle={{ backgroundColor: "#455a64" }}
          sceneStyle={{ backgroundColor: "white" }}
        >
          <Scene key="root">
            <Scene
              key="login"
              component={LoginPage}
              title=""
              hideNavBar
              type={ActionConst.RESET}
            />
            <Scene
              key="signup"
              component={SignupPage}
              title=" Signup Here"
              hideNavBar
            />
            <Scene
              key="mainpage"
              component={MainScreen}
              title=""
              hideNavBar
              initial
              type={ActionConst.RESET}
            />
            <Scene
              key="lessonsscreen"
              component={LessonsScreen}
              title=""
              hideNavBar
            />
            <Scene
              key="mapscreenpage"
              component={MapScreen}
              title=""
              hideNavBar
            />
          </Scene>
        </Router>
      );
    } else {
      return (
        <Router
          navigationBarStyle={{ backgroundColor: "#455a64" }}
          sceneStyle={{ backgroundColor: "white" }}
        >
          <Scene key="root">
            <Scene
              key="login"
              component={LoginPage}
              title=""
              hideNavBar
              initial
              type={ActionConst.RESET}
            />
            <Scene
              key="signup"
              component={SignupPage}
              title=" Signup Here"
              hideNavBar
            />
            <Scene key="mainpage" component={MainScreen} title="" hideNavBar />
            <Scene
              key="lessonsscreen"
              component={LessonsScreen}
              title=""
              hideNavBar
            />
            <Scene
              key="mapscreenpage"
              component={MapScreen}
              title=""
              hideNavBar
            />
          </Scene>
        </Router>
      );
    }
  }
}

/*//
		//<Scene key="socialnetwork" component={SocialNetworks} title="" />
		*/

export default RouterComponent;
