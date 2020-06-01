import React from 'react';
import 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { ImageBackground, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flashcards from '../frontend/src/mobile/Flashcards/Flashcards.js';
import Home from '../frontend/src/mobile/Home/Home.js';
import Login from '../frontend/src/mobile/Login/Login.js';
import Register from '../frontend/src/mobile/Register/Register.js';
import Flashsets from '../frontend/src/mobile/Flashsets/Flashsets.js';
import LearningContent from './src/mobile/NLearning/LearningContent';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Button } from 'native-base';
import Logo from '../frontend/src/images/logo_mobile.png';

export default class App extends React.Component {
  state = {
    isReady: false,
    isLogged: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    // await this.getData();
    await this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    const Drawer = createDrawerNavigator();

    function CustomDrawerContent(props) {
      return (
        <Container>
          <Container
            style={{
              height: 70,
              position: 'absolute',
            }}
          >
            <Content>
              <Button
                onPress={() => props.navigation.navigate('Home')}
                transparent
                style={{
                  height: 70,
                  width: 270,
                  marginLeft: 5,
                  zIndex: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 0,
                }}
              >
                <ImageBackground
                  source={Logo}
                  style={{
                    height: 60,
                    width: 265,
                    marginLeft: 5,

                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 0,
                  }}
                />
              </Button>
            </Content>
          </Container>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </Container>
      );
    }

    class Hidden extends React.Component {
      render() {
        return <Container disabled style={styles.hid}></Container>;
      }
    }

    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              style={{
                marginTop: 70,
              }}
            />
          )}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{ drawerAnimation: 'none' }}
            options={{
              animationEnabled: false,
            }}
          />

          <Drawer.Screen
            name="Logowanie"
            component={Login}
            options={{ drawerAnimation: 'none' }}
            options={{
              animationEnabled: false,
              // drawerLabel: () => <Hidden />,
            }}
          />
          <Drawer.Screen
            name="Rejestracja"
            component={Register}
            options={{ drawerAnimation: 'none' }}
            options={{
              animationEnabled: false,

              //  drawerLabel: () => <Hidden />,
            }}
          />
          <Drawer.Screen
            name="Fiszki"
            component={Flashcards}
            options={{ drawerAnimation: 'none' }}
            options={{
              animationEnabled: false,
              gestureEnabled: false,
              //  drawerLabel: () => <Hidden />,
            }}
          />

          <Drawer.Screen
            name="Zestawy"
            component={Flashsets}
            options={{ drawerAnimation: 'none' }}
            options={{
              animationEnabled: false,
            }}
          />
          <Drawer.Screen
            name="Nauka"
            component={LearningContent}
            options={{ drawerAnimation: 'none' }}
            options={{
              animationEnabled: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  hid: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  touch: {
    backgroundColor: 'red',
  },
});
