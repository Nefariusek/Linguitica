import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Item, Input } from 'native-base';
import Logo from '../../images/logo_mobile.png';
export default class HomeScreen extends React.Component {
  state = {
    login: '',
    email: '',
    password: '',
    passwordRepeat: '',
    invalidData: false,
  };
  handleEmailChange = async (text) => {
    await this.setState({ email: text });
    console.log('email', this.state.email);
  };
  handlePasswordChange = async (text) => {
    await this.setState({ password: text });
    console.log('haslo', this.state.password);
  };
  handleLoginChange = async (text) => {
    await this.setState({ login: text });
    console.log('login', this.state.login);
  };
  handlePasswordRepeatChange = async (text) => {
    await this.setState({ passwordRepeat: text });
    console.log('haslo_powtorka', this.state.passwordRepeat);
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
            <Title>Zarejestruj się</Title>
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
            autoCompleteType="login"
          >
            <Input placeholder="LOGIN" onChangeText={(text) => this.handleLoginChange(text)} />
          </Item>
          <Item rounded style={{ marginTop: 10, height: 60, width: 350, marginLeft: 'auto', marginRight: 'auto' }}>
            <Input placeholder="EMAIL" onChangeText={(text) => this.handleEmailChange(text)} autoCompleteType="email" />
          </Item>
          <Item rounded style={{ marginTop: 10, height: 60, width: 350, marginLeft: 'auto', marginRight: 'auto' }}>
            <Input
              placeholder="HASLO"
              onChangeText={(text) => this.handlePasswordChange(text)}
              secureTextEntry={true}
            />
          </Item>
          <Item
            rounded
            style={{ marginTop: 10, height: 60, width: 350, marginLeft: 'auto', marginRight: 'auto' }}
            autoCompleteType="password"
          >
            <Input
              secureTextEntry={true}
              placeholder="POWTÓRZ HASLO"
              onChangeText={(text) => this.handlePasswordRepeatChange(text)}
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
            onPress={() => this.props.navigation.navigate('Flashcards')}
          >
            <Text>Zarejestruj się</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
