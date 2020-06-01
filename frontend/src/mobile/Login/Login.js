import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'jwt-decode';
import { ImageBackground, Alert } from 'react-native';

import setHeaders from '../../utils/setHeadersMobile';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Item, Input } from 'native-base';
import Logo from '../../images/logo_mobile.png';

export default class HomeScreen extends React.Component {
  state = {
    email: '',
    password: '',
    invalidData: true,
    test: '',
    users: [],
  };
  handleEmailChange = async (text) => {
    await this.setState({ email: text });
  };
  handlePasswordChange = async (text) => {
    await this.setState({ password: text });
  };
  authUser = async () => {
    // this.storeData(this.state.email);
    //var bcrypt = require('bcryptjs');
    await AsyncStorage.setItem('@_id', '');
    await AsyncStorage.setItem('@isLogged', 'no');
    await this.setState({ invalidData: true });
    const response = await fetch('http://linguitica.herokuapp.com/api/users', setHeaders());
    const body = await response.json();

    await this.setState({ users: body });

    for (let i = 0; i < (await this.state.users.length); i++) {
      // let validPassword = await bcrypt.compare(this.state.password, this.state.users[i].password);
      if (this.state.users[i].email === this.state.email) {
        try {
          await AsyncStorage.setItem('@_id', this.state.users[i]._id);
          await AsyncStorage.setItem('@isLogged', 'yes');
          await this.setState({ invalidData: false });
        } catch (e) {
          // saving error
        }
        return true;
      }
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@_id');
      if (value !== null) {
        // value previously stored
        await this.setState({ test: value });
      }
    } catch (e) {
      // error reading value
    }
  };

  onButtonSubmit = async (e) => {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      Alert.alert('Pola nie mogą być puste!');
    } else {
      await this.authUser();
      await this.getData();
      if (await !this.state.invalidData) {
        await this.props.navigation.navigate('Fiszki');
        await this.setState({ email: '', password: '' });
      } else {
        await Alert.alert('Niepoprawne dane!');
      }
    }
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#1890ff' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Zaloguj się</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <ImageBackground
            source={Logo}
            style={{
              height: 70,
              width: 300,
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 0,
              marginTop: 70,
              marginBottom: 70,
            }}
          />
          <Item
            rounded
            style={{ marginTop: 10, height: 60, width: 350, marginLeft: 'auto', marginRight: 'auto' }}
            autoCompleteType="email"
          >
            <Input placeholder="EMAIL" onChangeText={(text) => this.handleEmailChange(text)} />
          </Item>
          <Item
            rounded
            style={{ marginTop: 10, height: 60, width: 350, marginLeft: 'auto', marginRight: 'auto' }}
            autoCompleteType="password"
          >
            <Input
              placeholder="HASLO"
              secureTextEntry={true}
              onChangeText={(text) => this.handlePasswordChange(text)}
            />
          </Item>

          <Button
            full
            rounded
            style={{
              marginTop: 50,
              backgroundColor: '#1890ff',
              height: 60,
              width: 250,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onPress={this.onButtonSubmit}
          >
            <Text>Zaloguj sie</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
