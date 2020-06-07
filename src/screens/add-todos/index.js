import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Metrics } from "../../global/constants/";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  setClearData,
  setUserData,
  saveUsersData,
  setClearTodoData,
  setTodoData,
  addTodoListsData,
} from "../../redux/userdata/userdata.actions";
import {
  selectData,
  selectListsData,
} from "../../redux/userdata/userdata.selectors";
import { ScrollView } from "react-native-gesture-handler";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const formValidator = yup.object({
//   name: yup
//     .string()
//     .required()
//     .min(4),
//   country: yup.string().required(),
//   favPhone: yup.string().required(),
//   contact: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
// });
class addtodo extends Component {
  handleSubmit = async () => {
    await this.props.saveUsersData(this.props.data);
    await this.props.setClearData();
  };
  handleListSubmit = async () => {
    await this.props.addTodoListsData(this.props.selectListsData);
    await this.props.setClearTodoData();
  };
  onHandleChange = (key, value) => {
    this.props.setUserData({
      key,
      value,
    });
  };
  onHandleListChange = (key, value) => {
    this.props.setTodoData({
      key,
      value,
    });
  };
  render() {
    const backgroundColors = [
      "#595BD9",
      "#5CD859",
      "#D88559",
      "#8022D9",
      "#24A6D9",
      "#D85963",
      "#D159D8",
    ];
    const { data, selectListsData } = this.props;
    return (
      <View
        style={{
          flex: 1,
          width: Metrics.screenWidth,
          height: Metrics.screenHeight,
          marginTop: Metrics.subHeadingTop,
          justifyContent: "center",
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: "#000",
              alignSelf: "center",
              marginBottom: 16,
              fontFamily: "avenirNextMedium",
            }}
          >
            Create Todo List
          </Text>
          <Text style={{ fontFamily: "avenirNextMedium" }}>Title</Text>
          <TextInput
            style={{
              height: 40,
              width: "100%",
              marginBottom: 20,
              borderWidth: 0.5,
              borderColor: data.color,
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
              fontFamily: "avenirNextMedium",
            }}
            value={data.title}
            onChangeText={(text) => this.onHandleChange("title", text)}
            placeholder={"Todo Title"}
          />
          <Text style={{ fontFamily: "avenirNextMedium" }}>List Todos</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={{
                height: 40,
                width: "85%",
                borderWidth: 0.5,
                borderColor: data.color,
                padding: 10,
                borderRadius: 5,
                marginTop: 5,
                fontFamily: "avenirNextMedium",
              }}
              value={selectListsData.title}
              onChangeText={(text) => this.onHandleListChange("title", text)}
              placeholder={"Add Todo"}
            />
            <TouchableOpacity
              style={{
                backgroundColor: data.color,
                height: 40,
                width: 40,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: data.color,
                elevation: 4,
              }}
              onPress={this.handleListSubmit}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: "avenirNextMedium",
                  fontWeight: "800",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
          {data.todos
            ? data.todos.map((each) => (
                <View key={each.title}>
                  <Text>{each.title}</Text>
                </View>
              ))
            : null}
          <Text style={{ fontFamily: "avenirNextMedium", marginTop: 5 }}>
            Choose Background
          </Text>
          <View style={{ flexDirection: "row" }}>
            {backgroundColors
              ? backgroundColors.map((each) => (
                  <ScrollView horizontal key={each}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: each,
                        height: 30,
                        width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        // marginBottom: 10,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: each,
                        // elevation: 4,
                        overflow: "hidden",
                      }}
                      onPress={() => this.onHandleChange("color", each)}
                    />
                  </ScrollView>
                ))
              : null}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: data.color,
              height: 50,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: data.color,
              elevation: 4,
            }}
            onPress={this.handleSubmit}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontFamily: "avenirNextMedium",
                fontWeight: "800",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectData,
  selectListsData,
});
const mapDispatchToProps = {
  setClearData,
  setUserData,
  saveUsersData,
  setClearTodoData,
  setTodoData,
  addTodoListsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(addtodo);
