import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import Header from "./Header";
import DataStore from "./DataStore";
import TouchableIcon from "./TouchableIcon";
import Colors from "./Colors";
import { itemsToArray } from "./utils";

export default class ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Turven",
      headerRight: (
        <TouchableIcon
          icon="md-add"
          action={navigation.getParam("onAddLocation")}
        />
      ),
      headerStyle: {
        backgroundColor: "#272D38",
        borderBottomWidth: 0
      },
      headerTintColor: Colors.text
    };
  };

  state = { locations: [] };

  async componentDidMount() {
    this.props.navigation.setParams({
      onAddLocation: this._onAddLocation.bind(this)
    });
    const locations = await DataStore.getLocations();
    console.log(locations);
    this.setState({ locations });
  }

  render() {
    const locations = itemsToArray(this.state.locations);
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.locationList}
          data={locations}
          renderItem={this._renderLocation.bind(this)}
        />
      </View>
    );
  }

  _renderLocation(item) {
    // console.log(item);
    const location = item.item;
    return (
      <TouchableOpacity
        onPress={this._onSelectLocation.bind(this, location)}
        key={item.index}
        style={styles.location}
      >
        <Text style={styles.locationTitle}>{location.name}</Text>
      </TouchableOpacity>
    );
  }

  _onAddLocation() {
    this.props.navigation.navigate("Add", {
      addLocation: this._addLocation.bind(this)
    });
  }

  _addLocation(location) {
    this.setState({ locations: DataStore.addLocation(location) });
  }

  _onSelectLocation(location) {
    this.props.navigation.navigate("Detail", { location });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  locationList: {
    flex: 1
  },
  location: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  locationTitle: {
    color: Colors.text
  }
});
