import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Constants } from "expo";
import { Ionicons } from "@expo/vector-icons";
import DataStore from "./DataStore";
import TouchableIcon from "./TouchableIcon";
import TouchableButton from "./TouchableButton";
import Colors from "./Colors";

export default class AddScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Location",
      headerStyle: {
        backgroundColor: "#272D38",
        borderBottomWidth: 0
      },
      headerTintColor: Colors.text,
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam("onAddLocation")}>
          <Text style={styles.addButton}>Add</Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      titleError: false,
      items: [{ title: "", count: 0 }]
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onAddLocation: this._onAddLocation.bind(this)
    });
  }

  render() {
    const inputs = this.state.items.map(this._renderItemInput.bind(this));
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.inputLabel}>TITLE</Text>
        <View
          style={[
            styles.inputWrap,
            this.state.titleError ? styles.errorInput : null
          ]}
        >
          <TextInput
            style={styles.titleInput}
            value={this.state.title}
            onChangeText={this._onChangeTitle.bind(this)}
            placeholder="At Home"
          />
        </View>
        <Text style={styles.inputLabel}>ITEMS</Text>
        {inputs}
        <TouchableButton
          icon="md-add"
          label="Add Item"
          action={this._onAddItem.bind(this)}
        />
      </ScrollView>
    );
  }

  _renderItemInput(item, index) {
    return (
      <View style={styles.inputWrap} key={index}>
        <TextInput
          style={styles.titleInput}
          value={item.value}
          onChangeText={this._onChangeItem.bind(this, index)}
          placeholder="People"
        />
      </View>
    );
  }

  _onChangeTitle(text) {
    this.setState({ title: text });
    if (this.state.title.trim().length > 0) {
      this.setState({ titleError: false });
    }
  }

  _onChangeItem(index, text) {
    const items = JSON.parse(JSON.stringify(this.state.items));
    items[index].title = text;
    this.setState({ items });
  }

  _onAddItem() {
    const items = JSON.parse(JSON.stringify(this.state.items));
    const key = items.length;
    items.push({ title: "", count: 0 });
    this.setState({ items });
  }

  _onAddLocation() {
    if (this.state.title.trim().length === 0) {
      this.setState({ titleError: true });
      return;
    }
    const addLocation = this.props.navigation.getParam("addLocation");
    const key = DataStore.data.length;
    addLocation({ key, title: this.state.title, items: this.state.items });
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
    paddingTop: 10
  },
  inputLabel: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
    marginBottom: 10
  },
  inputWrap: {
    width: "100%",
    backgroundColor: "white",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10
  },
  errorInput: {
    borderColor: "red"
  },
  titleInput: {
    fontSize: 18
  },
  addButton: {
    marginHorizontal: 15,
    color: Colors.text
  }
});
