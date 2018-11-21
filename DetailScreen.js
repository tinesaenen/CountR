import * as React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
import { Constants } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import DataStore from "./DataStore";
import TouchableIcon from "./TouchableIcon";
import Colors from "./Colors";
import InputModal from "./InputModal";
import { itemsToArray } from "./utils";

export default class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "ERROR"),
      headerRight: (
        <TouchableIcon
          icon="md-settings"
          action={navigation.getParam("onSettings")}
        />
      ),
      headerStyle: {
        backgroundColor: "#272D38",
        borderBottomWidth: 0
      },
      headerTintColor: Colors.text
    };
  };

  state = { isLoading: true, location: null, itemModal: 1 };

  async componentDidMount() {
    const locationKey = this.props.navigation.getParam("locationKey");
    const locationTitle = this.props.navigation.getParam("locationTitle");
    this.props.navigation.setParams({
      title: locationTitle,
      onSettings: this._onSettings.bind(this)
    });
    const location = await DataStore.getLocation(locationKey);
    this.setState({ location, isLoading: false });
  }

  render() {
    const { location, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    const items = itemsToArray(location.items);
    return (
      <View style={styles.container}>
        {this.state.modalItem ? this._renderItemModal() : null}
        <FlatList
          style={styles.itemList}
          data={items}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  _renderItem({ item }) {
    return (
      <View style={styles.item} key={item.key}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <TouchableOpacity
          onPress={this._onIncreaseCount.bind(this, item)}
          onLongPress={this._onChangeCount.bind(this, item)}
          style={styles.buttonWrap}
        >
          <View style={styles.button}>
            <Text style={styles.buttonCount}>{item.count}</Text>
            <Ionicons
              name="md-add"
              size={18}
              color="#fff"
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderItemModal() {
    console.log("render modal", this.state.modalItem);
    return (
      <InputModal
        value={this.state.modalItem.count}
        onCancel={() => this.setState({ modalItem: null })}
        onSubmit={this._onChangeModalValue.bind(this)}
      />
    );
    // console.log('render modal', this.state.modalItem);
    // const item = this.state.location.items[this.state.itemModal];
    // return (
    //   <Modal visible={true} animationType="fade" style={{height: 100, width: '80%'}} transparent={true} onDismiss={()=>this.setState({modalItem: null})}>
    //     <View style={{height: 100, width: '80%'}}>
    //       <Text>hello</Text>
    //       <TextInput defaultValue={this.state.modalItem.count} />
    //     </View>
    //   </Modal>
    // );
  }

  _onSettings() {
    console.log("onSettings");
  }

  async _onIncreaseCount(item) {
    const location = await DataStore.increaseCount(
      this.state.location.key,
      item
    );
    console.log(location);
    this.setState({ location });
  }

  _onChangeCount(item) {
    console.log("on change count");
    this.setState({ modalItem: item });
  }

  _onChangeModalValue(value) {
    const location = DataStore.setCount(
      this.state.location.key,
      this.state.modalIndex,
      parseInt(value)
    );
    this.setState({ location, modalItem: null });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  itemList: {
    flex: 1
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  titleWrap: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginRight: 4
  },
  title: {
    lineHeight: 36,
    paddingLeft: 10,
    color: "#fff"
  },
  button: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: Colors.orange,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  buttonIcon: {
    padding: 5,
    borderRadius: 5
  },
  buttonCount: {
    color: "white",
    width: 30,
    lineHeight: 18,
    paddingVertical: 5,
    marginLeft: 5
  }
});
