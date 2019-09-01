import React, { Component } from "react";
import { Image, Modal, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, View, ImageBackground, Platform } from "react-native";
import { Block, Button, Text, Utils } from "expo-ui-kit";
import Icon from 'react-native-vector-icons/Ionicons';
// constants
import { images, theme, servers } from "../constants";
const { icons } = images;

// theme
const { rgba } = Utils;
const { SIZES, COLORS } = theme;
const { width: WIDTH } = Dimensions.get('window');
export default class LoginController extends Component {
  state = {
    connected: false,
    server: null,
    show: false,
    email: null, password: null,  errors: [], loading: false, userData: {}
  };

  handleConnect() {
    const { connected } = this.state;
    this.setState({ connected: !connected });
  }

  handleServer(server) {
    this.setState({ server, connected: false, show: false });
  }

  renderServer() {
    const { server, automatic } = this.state;
    const connection = server || automatic;

    return (
      <Block flex={false} row center middle>
        <Image source={connection.icon} />
        <Text margin={[0, 10, 0, 20]}>{connection.name}</Text>
        <Image source={icons.dropdown} />
      </Block>
    );
  }
  
  render() {
    const { connected } = this.state;

    return (
      // <ImageBackground source={require('./../assets/images/background.png')} style={ styles.backgroundContainer }>
        <Block safe center space="between">
          <Block flex={false} padding={[SIZES.h3, 0]}>
            <Text title semibold>
              {/* QUABBLY */}
            </Text>
          </Block>

          <Block center flex={false}>
            <Block
              flex={false}
              row
              center
              middle
              white
              shadow
              radius={SIZES.radius}
              padding={[SIZES.base, SIZES.padding]}
            >
              <Text theme={theme} subtitle semibold gray height={SIZES.h3}>
                {connected ? "Authenicating..." : "log in to your account"}
              </Text>
              <Block
                flex={false}
                radius={SIZES.base}
                style={styles.status}
                color={connected ? COLORS.success : rgba(COLORS.gray, 0.5)}
              />
            </Block>
                  <View style={ styles.logoContainer }>
                      {/* <Text style={ styles.logoText }>Photizzo Technologies</Text> */}
                  </View>
                  <View>
                    <Icon
                        name={Platform.OS === "ios" ? "ios-person-outline" : "md-person"}
                        size={25}
                        color={'#4630EB'}
                        style={styles.inputIcons}
                    />
                    <TextInput 
                    style={ styles.input }
                    placeholder={'Username'} placeholderTextColor={'#535453'} underlineColorAndroid='transparent'
                      />
                  </View>

                  <View>
                    <Icon
                        name={Platform.OS === "ios" ? "ios-lock-outline" : "md-lock"}
                        size={25}
                        color={'#4630EB'}
                        style={styles.inputIcons}
                    />
                    <TextInput 
                    style={ styles.input }
                    placeholder={'Password'} secureTextEntry={true} placeholderTextColor={'#535453'} underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity style={styles.btnEye}>
                      <Icon                           
                          name={Platform.OS === "ios" ? "ios-eye-outline" : "md-eye"}
                          color="#4630EB"
                          size={20}                          
                        />
                    </TouchableOpacity>
                  </View>
            <Button
              theme={theme}
              outlined={connected}
              style={[styles.connect, connected && styles.connected]}
              onPress={() => this.handleConnect()}
            >
              <Text
                caption
                center
                bold
                white={!connected}
                margin={[SIZES.padding / 2, 0]}
              >
                {connected ? "Cancel" : " Sign In"}
              </Text>
            </Button>
          </Block>

          <Block flex={false} middle white shadow style={styles.servers}>
          </Block>
        </Block>
      // </ImageBackground>
    );
    
  }
}

const styles = StyleSheet.create({
  connect: {
    width: SIZES.width / 2
  },
  connected: {
    borderColor: COLORS.black
  },
  image: {
    width: 180,
    height: 180,
    marginVertical: 20
  },
  status: {
    width: SIZES.base,
    height: SIZES.base,
    marginLeft: SIZES.small
  },
  servers: {
    width: SIZES.width,
    height: SIZES.base * 9,
    shadowOffset: {
      width: 0,
      height: -5
    },
    shadowOpacity: 0.05,
    shadowRadius: SIZES.base / 2
  },
  backgroundContainer:{
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
}, 
  logoContainer: {
      alignItems: 'center',
  },
logo: {
    width: 120,
    height: 120,
},
logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    opacity: 0.5
},
input: {
    width: WIDTH - 55,
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor:'#f4f4f4',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
    marginBottom: 5,
    borderWidth: 1, borderColor: '#4630EB', borderStyle:'solid'
},
inputIcons: {
    position: 'absolute',
    top: 15,
    left: 37
},
btnEye: {
    position: 'absolute',
    top: 15,
    right: 37
},
btnLogin: {
    width: WIDTH - 55,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#004d00',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 25,
},
text: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center'
}
});
