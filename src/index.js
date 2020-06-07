import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Feather from "react-native-vector-icons/Feather";
import MainScreen from "./screens/main";
import AddTodoScreen from "./screens/add-todos";
import Login from "./screens/login";
import Signup from "./screens/signup";

const Home = createStackNavigator({
  // Signup: {
  //   screen: Signup,
  //   navigationOptions: () => {
  //     return {
  //       headerShown: false,
  //     };
  //   },
  // },
  MainScreen: {
    screen: MainScreen,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  AddTodoScreen: {
    screen: AddTodoScreen,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
});
const Profile = createSwitchNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  // Userprofile: {
  //   screen: Userprofile,
  //   navigationOptions: () => {
  //     return {
  //       headerTitle: "Profile",
  //       headerTitleStyle: {
  //         fontSize: 18,
  //         marginLeft: 0,
  //       },
  //     };
  //   },
  // },
});
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Feather;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Profile") {
          iconName = "user";
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
      statusBarOptions: { hidden: false, backgroundColor: "red" },
    }),
    tabBarOptions: {
      labelStyle: {
        fontSize: 11,
        paddingBottom: 4,
        textTransform: "uppercase",
        fontFamily: "avenirNextMedium",
      },
      activeTintColor: "white",
      inactiveTintColor: "#8D95DC",
      style: {
        backgroundColor: "#202B8B",
        height: 56,
        borderTopWidth: 0,
      },
    },
  }
);
export const AppContainer = createAppContainer(DashboardTabNavigator);
