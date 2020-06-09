import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./screens/main";
import AddTodoScreen from "./screens/add-todos";
import Login from "./screens/login";
import NoteDetails from "./screens/note-details";

const Home = createStackNavigator({
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
  NoteDetails: {
    screen: NoteDetails,
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
  Home,
});
// const DashboardTabNavigator = createBottomTabNavigator(
//   {
//     Home,
//     Profile,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ tintColor }) => {
//         const { routeName } = navigation.state;
//         let IconComponent = Feather;
//         let iconName;
//         if (routeName === "Home") {
//           iconName = "home";
//         } else if (routeName === "Profile") {
//           iconName = "user";
//         }
//         return <IconComponent name={iconName} size={25} color={tintColor} />;
//       },
//       statusBarOptions: { hidden: false, backgroundColor: "red" },
//     }),
//     tabBarOptions: {
//       labelStyle: {
//         fontSize: 11,
//         paddingBottom: 4,
//         textTransform: "uppercase",
//         fontFamily: "avenirNextMedium",
//       },
//       activeTintColor: "white",
//       inactiveTintColor: "#8D95DC",
//       style: {
//         backgroundColor: "#202B8B",
//         height: 56,
//         borderTopWidth: 0,
//       },
//     },
//   }
// );
export const AppContainer = createAppContainer(Profile);
