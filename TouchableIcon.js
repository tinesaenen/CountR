import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Colors from './Colors';

const ICON_SIZE = 24;

export default class TouchableIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={{ marginHorizontal: 15 }}>
        <Ionicons name={this.props.icon} size={ICON_SIZE} color={Colors.text} /> 
      </TouchableOpacity>
    );
  }
}
