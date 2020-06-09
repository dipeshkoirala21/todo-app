import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Metrics } from "../../global/constants/Metrics";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { setCompletedBoolean } from "../../redux/userdata/userdata.actions";
import {
  selectLists,
  selectAllUsersData,
} from "../../redux/userdata/userdata.selectors";

export class index extends Component {
  state = {
    cardIndex: null,
  };
  componentDidMount() {
    this.setState({
      cardIndex: this.props.navigation.getParam("ind"),
    });
  }
  selectedList = (cIndex, key, value, index) => () => {
    this.props.setCompletedBoolean({
      cIndex,
      key,
      value: !value,
      index,
    });
  };
  render() {
    const { cardIndex } = this.state;
    const { data } = this.props;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#F3FBFF",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: 10 }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "800",
                color: "#000",
                alignSelf: "center",
                marginBottom: 16,
                fontFamily: "avenirNextMedium",
              }}
            >
              {data && data[cardIndex] && data[cardIndex].title
                ? data[cardIndex].title
                : null}
            </Text>
            <View style={{ marginTop: 20 }}>
              {data && data[cardIndex] && data[cardIndex].todos
                ? data[cardIndex].todos.map((each, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ flexDirection: "row" }}
                      onPress={this.selectedList(
                        cardIndex,
                        "completed",
                        each.completed,
                        index
                      )}
                    >
                      <Icon
                        style={{
                          color: "#000",
                          marginTop: 10,
                        }}
                        size={20}
                        name={
                          each.completed ? "ios-square" : "ios-square-outline"
                        }
                      />
                      <Text
                        style={{
                          color: "#000",
                          marginTop: 5,
                          marginLeft: 10,
                          fontSize: 15,
                          fontFamily: "avenirNextMedium",
                        }}
                      >
                        {each.title}
                      </Text>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  list: selectLists,
  data: selectAllUsersData,
});
const mapDispatchToProps = {
  setCompletedBoolean,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
