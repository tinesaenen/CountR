import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Colors from './Colors';

const ICON_SIZE = 18;

export default class TouchableButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={{ marginHorizontal: 0, marginVertical: 15 }}>
        <View style={styles.view}>
        <Ionicons name={this.props.icon} size={ICON_SIZE} color={Colors.text} /> 
        <Text style={styles.label}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    marginLeft: 5,
    lineHeight: 18,
    color: Colors.text,
  }
});
