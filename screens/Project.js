import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Block, Button, Text } from "expo-ui-kit";

import { Card, Badge } from '../components';
import { mocks } from '../constants';

const { width } = Dimensions.get('window');

class ProjectController extends Component {
  state = {
    active: 'Products',
    httpMock: [],
  }

  componentDidMount() {
    this.setState({ httpMock: this.props.httpMock });
  }

  handleTab = tab => {
    const { httpMock } = this.props;
    const filtered = httpMock.filter(
      category => category.tags.includes(tab.toUpperCase())
    );

    this.setState({ active: tab, httpMock: filtered });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { profile, navigation } = this.props;
    const { httpMock } = this.state;
    const tabs = ['Projects', 'Create new project', 'Suspended'];

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold> Projects </Text>
          <Button onPress={() => navigation.navigate('Settings')}>
            {/* <Image
              source={profile.avatar}
              style={styles.avatar}
            /> */}
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 14 * 2}}
        >
          <Block flex={false} row space="between" style={styles.httpMock}>
            {httpMock.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate('Units', { category })}
              >
                <Card center middle shadow style={styles.category}>
                <Text medium height={20}>{category.name}</Text>
                  <Text gray caption>{category.count} products</Text>
                  <Badge margin={[0, 0, 15]} size={50} color="rgba(123, 104, 238,0.40)">
                    <Image source={category.image} />
                  </Badge>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

ProjectController.defaultProps = {
  // profile: mocks.profile,
  httpMock: mocks.httpMock,
}

export default ProjectController;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 14 * 2,
  },
  avatar: {
    height: 14 * 2.2,
    width: 14 * 2.2,
  },
  tabs: {
    borderBottomColor: '#7b68ee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 14,
    marginHorizontal: 14 * 2,
  },
  tab: {
    marginRight: 14 * 2,
    paddingBottom: 14
  },
  active: {
    borderBottomColor: '#7b68ee',
    borderBottomWidth: 3,
  },
  httpMock: {
    flexWrap: 'wrap',
    paddingHorizontal: 14 * 2,
    marginBottom: 14 * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (25 * 2.4) - 14) / 2,
    maxWidth: (width - (25 * 2.4) - 14) / 2,
    maxHeight: (width - (25 * 2.4) - 14) / 2,
  }
})
