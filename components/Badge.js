import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Block } from "expo-ui-kit";

export default class Badge extends Component {
  render() {
    const { children, style, size, color, ...props } = this.props;

    const badgeStyles = StyleSheet.flatten([
      styles.badge,
      size && {
        height: size,
        width: size,
        borderRadius: size,
      },
      style,
    ]);

    return (
      <Block flex={false} middle center color={color} style={badgeStyles} {...props}>
        {children}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    height: 14,
    width: 14,
    borderRadius: 0,
  }
})
