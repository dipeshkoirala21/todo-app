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

class signup extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    user: null,
    textentry: false,
  };
  componentDidMount() {}

  signUpUser = (displayName, email, password) => {
    try {
      if (this.state.password < 6) {
        alert("Please enter more than 6 characters for password!");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(displayName, email, password);
    } catch (error) {
      alert(error.toString());
    }
  };
  handleChange = (name) => (text) => this.setState({ [name]: text });
  toggleEyes = () => {
    this.setState({
      textentry: !this.state.textentry,
    });
  };
  render() {
    const { name, email, password } = this.state;
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
                    Sign Up
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
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
                    value={this.state.displayName}
                    onChangeText={this.handleChange("displayName")}
                    placeholder={"Name"}
                    keyboardType={"default"}
                  />
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
                    onPress={() => this.signUpUser(email, password)}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        color: "#000080",
                        fontWeight: "bold",
                      }}
                    >
                      Sign Up
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
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#555",
                      }}
                    >
                      Already Have an account?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                    onPress={() => this.props.navigation.navigate("Login")}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#555",
                      }}
                    >
                      Login
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
export default signup;
