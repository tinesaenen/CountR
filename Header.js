import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

const ICON_SIZE = 24;

export default class Header extends React.Component {
  render() {
    let leftComponent = <View style={{ width: ICON_SIZE }}/>;
    if (this.props.leftIcon && this.props.leftAction) {
      leftComponent = this._renderAction(
        this.props.leftIcon,
        this.props.leftAction
      );
    }
    let rightComponent  = <View style={{ width: ICON_SIZE }}/>;
    if (this.props.rightIcon && this.props.rightAction) {
      rightComponent = this._renderAction(
        this.props.rightIcon,
        this.props.rightAction
      );
    }
    return (
      <View style={styles.container}>
        {leftComponent}
        <Text style={styles.title}>Turven</Text>
        {rightComponent}
      </View>
    );
  }

  _renderAction(icon, action) {
    return (
      <TouchableOpacity onPress={action}>
        <Ionicons name={icon} size={ICON_SIZE} color="#666" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: Constants.statusBarHeight,
    height: 50,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
