import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Icon } from 'expo';

import { theme } from '../constants';
import { Block, Button, Text } from "expo-ui-kit";
export default class Input extends Component {
  state = {
    toggleSecure: false,
  }

  renderLabel() {
    const { label, error } = this.props;

    return (
      <Block flex={false} style={styles.errorHandler}>
        {label ? <Text gray2={!error} accent={error}></Text> : null}
      </Block>
    )
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {
          // rightLabel ? rightLabel :
          //   <Icon.Ionicons
          //     color={'#9DA3B4'}
          //     size={14 * 1.35}
          //     name={!toggleSecure ? "md-eye" : "md-eye-off"}
          // />
        }
      </Button>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  render() {
    const {
      email,
      phone,
      number,
      secure,
      error,
      style,
      ...props
    } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error && { borderColor: '#000000' },
    //   error && { borderColor: theme.colors.accent },
      style,
    ];

    const inputType = email
      ? 'email-address' : number
      ? 'numeric' : phone
      ? 'phone-pad' : 'default';

    return (
      <Block flex={false} margin={[14, 0]}>
        {this.renderLabel()}
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          {...props}
        />
        {this.renderToggle()}
        {this.renderRight()}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000000',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    height: 14 * 1.5,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: 14 * 2,
    height: 14 * 2,
    top: 14,
    right: 0,
  },
  errorHandler: {
    color: '#F3534A'
  }
});