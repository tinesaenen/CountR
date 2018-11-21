import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';
import Colors from './Colors';
import TouchableButton from './TouchableButton';

const ICON_SIZE = 18;

export default class InputModal extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructing...', props);
    this.state = {value: '' + props.value};
  }

  render() {
    return (
      <Modal animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.container}>
            <View style={styles.inner}>
              <Text style={styles.inputLabel}>CHANGE VALUE</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  autoFocus={true}
                  styles={styles.titleInput}
                  value={this.state.value}
                  onChangeText={value => this.setState({ value })}
                  onSubmitEditing={this._onSubmit.bind(this)}
                />
              </View>
              <TouchableButton
                icon="md-checkmark"
                label="Change Value"
                action={this._onSubmit.bind(this)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  _onSubmit() {
    this.props.onSubmit(this.state.value);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  inner: {
    backgroundColor: '#272D38',
    width: '80%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,

  },
  inputLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
    marginBottom: 10,
  },
  inputWrap: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 18,
  },
});
