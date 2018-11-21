import * as React from "react";
import { Text, View, StatusBar } from "react-native";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";
import ListScreen from "./ListScreen";
import DetailScreen from "./DetailScreen";
import AddScreen from "./AddScreen";
import DataStore from "./DataStore";

const RootNavigator = createStackNavigator({
  List: ListScreen,
  Detail: DetailScreen,
  Add: AddScreen
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle="light-content"
        />
        <RootNavigator />
      </View>
    );
  }
}
