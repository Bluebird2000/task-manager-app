import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Block } from "expo-ui-kit";

export default class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [
      styles.card,
      style,
    ];

    return (
      <Block color={color || '#FFFFFF'} style={cardStyles} {...props}>
        {children}
      </Block>
    )
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    padding: 14 + 4,
    marginBottom: 14,
  },
})
