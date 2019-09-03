import React, { Component } from "react";
import { Image, Modal, StyleSheet, ScrollView, Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, AsyncStorage } from "react-native";
import axios from 'axios';
import { Block, Button, Text, Utils } from "expo-ui-kit";
import { Input } from '../components';

// constants
import { images, theme, servers } from "../constants";
const { icons } = images;

// theme
const { rgba } = Utils;
const { SIZES, COLORS } = theme;

export default class LoginController extends Component {
  state = {
    connected: false,
    show: false,
    email: null, 
    password: null,  
    errors: [], loading: false, 
    userData: {}
  };

  componentDidMount() {
    this._getUserToken();
  }

  async _storeUserToken(user) {
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      alert("Something went wrong", error);
    }
  }

  async _getUserToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  } 


  async _destroySession(user) {
      try {
        await AsyncStorage.removeItem(user);
        return true;
      }
      catch(exception) {
        return false;
      }
  }

  async handleLogin() {
    // const { navigation } = this.props;
    
    const { username, password, connected } = this.state;
    // this.setState({ connected: !connected });
    const errors = [];
    let payload = { username, password };
    const baseUrl = 'https://p-user-api-dev.quabbly.com/v1/auth/login';    

    Keyboard.dismiss();

    if (!username) errors.push('username');
    if (!password) errors.push('password');
    this.setState({ errors, loading: false });   

    if (!errors.length) {
      this.setState({ loading: true });
     await this.authenticateUserLoginDetails(payload, baseUrl);
    }

  }

  async authenticateUserLoginDetails(payload, baseUrl) {
    await axios({
        url: baseUrl,
        method: "post",
        data: payload,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        this._storeUserToken(JSON.stringify(response.data.data));
          Alert.alert(
          'Success!',
          'successfully logged in',
          [
            {
              text: 'Continue', onPress: () => {
                // navigation.navigate('DashBoard')
              }
            }
          ],
          { cancelable: false }
        );
        this.setState({ loading: false });
      }).catch(error => {
          Alert.alert(
          '',
          'invalid credentials',
          [
            {
              text: 'Try again', onPress: () => {
                // navigation.navigate('Login')
              }
            }
          ],
          { cancelable: false }
        );
        this.setState({ loading: false });
      })
  }


  handleConnect() {
    const { connected } = this.state;
    this.setState({ connected: !connected });
  }

  render() {
    const { connected, loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block safe center space="between">
          <Block flex={false} padding={[70, 0]}>
          {/* <Image
            source={require('../assets/images/Logo.png')}
            style={{ height: 28, width: 102 }}
          /> */}
          </Block>

          <Block center bottom flex={0.4} >
          <Image
            source={require('../assets/images/quabbly.png')}
            style={{ height: 38, width: 180, marginBottom: 30 }}
          />
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
              <Text theme={theme} title semibold>
                {connected ? "Authenticating user ..." : "Sign in to Quabbly"}
              </Text>
              <Block
                flex={false}
                radius={SIZES.base}
                style={styles.status}
                color={connected ? COLORS.success : rgba('#ff3333', 0.5)}
              />
            </Block> 
        </Block>
        </Block> 


      <Block padding={[0, 14 * 3]}>
        {/* <Text h1 bold>Login</Text> */}
          
        <Block>
          <Input
            label="Email"
            error={hasErrors('username')}
            style={[styles.input, hasErrors('username')]}
            defaultValue={this.state.username}
            placeholder={'Email address'} placeholderTextColor={'#777777'} underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ username: text.trim() })}
          />
          <Input
          label="Password"
            secure
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            defaultValue={this.state.password}
            placeholder={'Password'} placeholderTextColor={'#777777'} underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ password: text.trim() })}
          />
          <Block center flex={false}>
          <Button
              theme={theme}
              outlined={connected}
              style={[styles.connect, connected && styles.connected]}
              onPress={() => this.handleLogin()}
            >
               {loading ?
                  <ActivityIndicator size="small" color="black" /> : 
                  <Text
                    caption
                    center
                    bold
                    white={!connected}
                    margin={[SIZES.padding / 2, 0]}
                  >
                    {connected ? "CANCEL" : "SIGN IN"}
                  </Text>
                }
              
          </Button>
          </Block>
          {/* <Button style={styles.btnActionActive} onPress={() => this.handleLogin()}>
            {loading ?
              <ActivityIndicator size="small" color="white" /> : 
              <Text bold white center>Login</Text>
            }
          </Button> */}
        </Block>
      </Block>

        
        

      {/* <Block center flex={false}>
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
                {connected ? "CANCEL" : "SIGN IN"}
              </Text>
            </Button>
          </Block> */}
      
    </KeyboardAvoidingView>

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
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: '#999999',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: '#1aaff3',
  },
  btnActionActive: {
    backgroundColor: '#07b8ae'
  },
  btnActionNonActive: {
    backgroundColor: '#eeeeee'
  },
});
