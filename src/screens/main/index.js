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
  Alert,
} from "react-native";
import { Metrics } from "../../global/constants/Metrics";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { saveUsersData } from "../../redux/userdata/userdata.actions";
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
  handleDelete = (index) => () => {
    Alert.alert(
      "Alert",
      "Are you Sure Want to delete this Note?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const { data } = this.props;
            const delData = [...data];
            delData.splice(index, 1);
            this.props.saveUsersData([...delData]);
          },
        },
      ],
      { cancelable: false }
    );
  };
  renderItem = ({ item, index }) => {
    const completedCount = item.todos.filter((todo) => todo.completed).length;
    const remainingCount = item.todos.length - completedCount;
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
          onLongPress={this.handleDelete(index)}
          onPress={() =>
            this.props.navigation.navigate("NoteDetails", {
              // data: item,
              ind: index,
            })
          }
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "900",
              alignSelf: "center",
              color: "#fff",
              marginTop: 5,
              fontFamily: "avenirNextMedium",
            }}
            numberOfLines={1}
          >
            {item && item.title ? item.title : null}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "900",
              alignSelf: "center",
              color: "#fff",
              marginTop: 10,
              fontFamily: "avenirNextMedium",
            }}
            numberOfLines={1}
          >
            Completed{" "}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              alignSelf: "center",
              color: "#fff",
              fontFamily: "avenirNextMedium",
            }}
          >
            {completedCount}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "900",
              alignSelf: "center",
              color: "#fff",
              marginTop: 10,
              fontFamily: "avenirNextMedium",
            }}
            numberOfLines={1}
          >
            Remaining{" "}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              alignSelf: "center",
              color: "#fff",
              fontFamily: "avenirNextMedium",
            }}
          >
            {remainingCount}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { data } = this.props;
    const completedCount = data.map(
      (each) => each.todos.filter((todo) => todo.completed).length
    );
    const remainingCount =
      data.map((each) => each.todos).length - completedCount;
    const lists = data
      ? data.map(function state(each, index) {
          let displayName = "";
          displayName = each.title;
          return {
            id: each.title,
            title: displayName,
            color: each.color,
            index: index,
          };
        })
      : [];
    const filteredSearch = lists.filter((a) =>
      a.title.toLowerCase().includes(this.state.selectedText.toLowerCase())
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
                                <View
                                  key={each.title}
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
                                      backgroundColor: each.color,
                                      borderRadius: 5,
                                      elevation: 4,
                                      marginTop: 10,
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onPress={() => {
                                      this.props.navigation.navigate(
                                        "NoteDetails",
                                        {
                                          ind: each.index,
                                        }
                                      );
                                      this.setModalVisible(false);
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 25,
                                        fontWeight: "900",
                                        alignSelf: "center",
                                        color: "#fff",
                                        marginTop: 5,
                                        fontFamily: "avenirNextMedium",
                                      }}
                                      numberOfLines={1}
                                    >
                                      {each && each.title ? each.title : null}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
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
                  renderItem={(item, index) => this.renderItem(item, index)}
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
const mapDispatchToProps = {
  saveUsersData,
};

export default connect(mapStateToProps, mapDispatchToProps)(mainScreen);
