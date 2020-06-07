/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  Vibration,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
// import { loginRequest, facebook, google } from '../../redux/auth/auth.actions';
// import { selectToken } from '../../redux/app/app.selectors';
// import {
//   selectAuthErrors,
//   selectLoading,
// } from '../../redux/auth/auth.selectors';
// import SafariView from 'react-native-safari-view';
import * as firebase from "firebase";
import { firebaseConfig } from "../../../firebaseConfig";
firebase.initializeApp(firebaseConfig);
class Login extends Component {
  state = {
    email: "dipeshkoirala21@gmail.com",
    password: "hdmq8win",
    user: null,
    textentry: false,
  };
  componentDidMount() {}

  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.token) {
      nextProps.navigation.navigate("Userprofile");
    }
    return null;
  };

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          if (user.user.email === this.state.email)
            this.props.navigation.navigate("MainScreen");
          return;
        });
    } catch (error) {
      alert(error);
    }
  };
  handleChange = (name) => (text) => this.setState({ [name]: text });
  toggleEyes = () => {
    this.setState({
      textentry: !this.state.textentry,
    });
  };
  render() {
    const { email, password } = this.state;
    const { loading, errors } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F3FBFF",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              flex: 1,
              backgroundColor: "#F3FBFF",
              bottom: 0,
              overflow: "hidden",
            }}
          >
            <KeyboardAvoidingView
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: Platform.OS === "ios" ? 0 : 40 }}>
                  <Text
                    style={{
                      fontSize: 28,
                      color: "#333",
                      fontWeight: "bold",
                      marginHorizontal: 16,
                    }}
                  >
                    Login
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "#999",
                    marginTop: 20,
                    paddingVertical: 10,
                  }}
                >
                  Continue with email
                </Text>
                <View
                  style={{
                    borderRadius: 4,
                    borderColor: "#d3d3d3",
                    marginHorizontal: 16,
                    position: "relative",
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                  }}
                >
                  <TextInput
                    style={{
                      height: 48,
                      borderBottomWidth: 1,
                      borderColor: "#d3d3d3",
                      marginBottom: 5,
                      paddingHorizontal: 16,
                    }}
                    value={this.state.email}
                    onChangeText={this.handleChange("email")}
                    placeholder={"Email"}
                    keyboardType={"default"}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      marginBottom: 5,
                      borderBottomColor: "#d3d3d3",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextInput
                      style={{
                        height: 48,
                        paddingHorizontal: 16,
                        width: Dimensions.get("window").width - 80,
                      }}
                      value={this.state.password}
                      onChangeText={this.handleChange("password")}
                      placeholder={"Password"}
                      secureTextEntry={!this.state.textentry}
                    />
                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 90,
                      }}
                      onPress={this.toggleEyes}
                    >
                      {this.state.textentry === false ? (
                        <Image
                          style={{ width: 20, height: 20, marginRight: 12 }}
                          source={require("../../../assets/eyeoff.png")}
                        />
                      ) : (
                        <Image
                          style={{ width: 20, height: 15, marginRight: 12 }}
                          source={require("../../../assets/eyeon.png")}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      height: 48,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => this.loginUser(email, password)}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        color: "#000080",
                        fontWeight: "bold",
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator />}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    justifyContent: "space-between",
                    paddingVertical: 40,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      this.props.navigation.navigate("ForgotPassword")
                    }
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#555",
                      }}
                    >
                      Dont Have an Account?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => this.props.navigation.navigate("Signup")}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#555",
                      }}
                    >
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
// export default Login;
const mapStateToProps = createStructuredSelector({
  // token: selectToken,
  // loading: selectLoading,
  // errors: selectAuthErrors,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
