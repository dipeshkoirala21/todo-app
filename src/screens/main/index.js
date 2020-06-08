import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Metrics } from "../../global/constants/Metrics";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {} from "../../redux/userdata/userdata.actions";
import { selectAllUsersData } from "../../redux/userdata/userdata.selectors";

import Icon from "react-native-vector-icons/Ionicons";
class mainScreen extends Component {
  state = {
    modalVisible: false,
    selectedText: "",
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  handleChange = (text) => {
    this.setState({ selectedText: text });
  };
  clearText = () => {
    this.setState({ selectedText: "" });
  };
  handleNav = () => {
    this.props.navigation.navigate("AddTodoScreen");
  };
  handleLongPress = () => (index) => {
    console.log(index);
  };
  renderItem = ({ item, index }) => {
    return (
      <View
        key={item.title}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          style={{
            height: 200,
            width: Metrics.screenWidth / 2 - 20,
            backgroundColor: item.color,
            borderRadius: 5,
            elevation: 4,
            marginTop: 10,
          }}
          // activeOpacity={1}
          onLongPress={this.handleLongPress(index)}
        >
          {/* <View style={{ flex: 1, justifyContent: "center" }}> */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              alignSelf: "center",
              color: "#fff",
              marginTop: 5,
              // marginLeft: 10,
              fontFamily: "avenirNextMedium",
            }}
            numberOfLines={1}
          >
            {item && item.title ? item.title : null}
          </Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { data } = this.props;
    // let searchResults = Object.assign({}, data);
    const offers = data
      ? data.map(function state(each) {
          let displayName = "";
          displayName = each.name;
          return {
            id: each.name,
            name: displayName,
            country: each.country,
            phone_brand: each.favPhone,
            contact: each.contact,
          };
        })
      : [];
    const filteredSearch = offers.filter(
      (a) =>
        a.name &&
        a.phone_brand
          .toLowerCase()
          .includes(this.state.selectedText.toLowerCase())
    );
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F3FBFF",
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            {Object.keys(data).length === 0 ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#C4C4C4",
                  fontFamily: "avenirNextMedium",
                }}
              >
                Press "+" to add Todos
              </Text>
            ) : (
              <View>
                <View>
                  <View style={{ width: Metrics.screenWidth - 20 }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => this.setState({ modalVisible: true })}
                      style={{
                        height: 40,
                        backgroundColor: "white",
                        flexDirection: "row",
                        // marginHorizontal: 16,
                        marginVertical: 8,
                        alignItems: "center",
                        borderRadius: 24,
                        marginTop: 20,
                        borderColor: "#000",
                        borderWidth: 0.5,
                      }}
                    >
                      <Icon
                        style={{
                          marginHorizontal: 12,
                          color: "#4A4A4A",
                        }}
                        size={25}
                        name="ios-search"
                      />
                      <Text
                        style={{
                          color: "#4A4A4A",
                          fontSize: 14,
                          fontFamily: "avenirNextMedium",
                        }}
                      >
                        Search Todos
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Modal
                    animationType="fade"
                    handleClick={this.setModalVisible}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      this.setModalVisible(false);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        elevation: 4,
                        position: "absolute",
                        width: Dimensions.get("window").width,
                        backgroundColor: "#fff",
                        height: 56,
                        alignItems: "center",
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 90,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: 48,
                          width: 48,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => this.setState({ modalVisible: false })}
                      >
                        <Icon size={24} name="md-arrow-back" />
                      </TouchableOpacity>
                      <View style={{ position: "relative" }}>
                        <TextInput
                          numberOfLines={1}
                          style={{
                            // width: this.state.hideContents ? '80%' : '90%',
                            height: 40,
                            color: "#4A4A4A",
                            marginLeft: 16,
                            fontSize: 16,
                            textTransform: "capitalize",
                            textAlign: "left",
                            width: Metrics.screenWidth,
                          }}
                          value={this.state.selectedText}
                          onChangeText={(text) => this.handleChange(text)}
                          placeholder={"Search By Title"}
                          autoFocus={true}
                        />
                        <TouchableOpacity
                          onPress={this.clearText}
                          style={{
                            position: "absolute",
                            backgroundColor: "#fff",
                            width: 40,
                            zIndex: 900,
                            height: 40,
                            right: 0,
                            top: 0,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon size={20} name="ios-close" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="always"
                      style={{
                        backgroundColor: "#F4F4F7",
                        height: Dimensions.get("window").height,
                      }}
                    >
                      {this.state.selectedText === "" ? null : (
                        <View style={{ padding: 10, marginTop: 50 }}>
                          {Object.keys(filteredSearch).length > 0
                            ? filteredSearch.map((each) => (
                                <TouchableOpacity
                                  key={each.title}
                                  style={{
                                    flex: 1,
                                    height: 100,
                                    width: Metrics.screenWidth - 20,
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: 5,
                                    elevation: 4,
                                    marginVertical: 5,
                                    justifyContent: "center",
                                  }}
                                  activeOpacity={1}
                                >
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <View style={{ flexDirection: "row" }}>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                            fontWeight: "bold",
                                          }}
                                          numberOfLines={1}
                                        >
                                          Name :
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}
                                          numberOfLines={1}
                                        >
                                          {each && each.name ? each.name : null}
                                        </Text>
                                      </View>
                                      <View style={{ flexDirection: "row" }}>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                            fontWeight: "bold",
                                          }}
                                          numberOfLines={1}
                                        >
                                          Country :
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}
                                          numberOfLines={1}
                                        >
                                          {each && each.country
                                            ? each.country
                                            : null}
                                        </Text>
                                      </View>
                                      <View style={{ flexDirection: "row" }}>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                            fontWeight: "bold",
                                          }}
                                          numberOfLines={1}
                                        >
                                          Phone Brand :
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}
                                          numberOfLines={1}
                                        >
                                          {each && each.favPhone
                                            ? each.favPhone
                                            : null}
                                        </Text>
                                      </View>
                                      <View style={{ flexDirection: "row" }}>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                            fontWeight: "bold",
                                          }}
                                          numberOfLines={1}
                                        >
                                          Contact :
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#000",
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}
                                          numberOfLines={1}
                                        >
                                          {each && each.contact
                                            ? each.contact
                                            : null}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              ))
                            : null}
                        </View>
                      )}
                    </ScrollView>
                  </Modal>
                </View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={({ item, index, separators }) =>
                    this.renderItem({ item, index, separators })
                  }
                  keyExtractor={(item) => item.title}
                  numColumns={2}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#000080",
              justifyContent: "center",
              alignItems: "center",
              height: 60,
              width: 60,
              borderRadius: 30,
              right: 20,
              position: "absolute",
              bottom: 30,
              elevation: 4,
            }}
            onPress={this.handleNav}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "avenirNextMedium",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  data: selectAllUsersData,
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(mainScreen);
