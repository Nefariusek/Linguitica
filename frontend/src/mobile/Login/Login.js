import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Item, Input } from 'native-base';
import Logo from '../../images/logo_mobile.png';
export default class HomeScreen extends React.Component {
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
            <Input placeholder="EMAIL" />
          </Item>
          <Item
            rounded
            style={{ marginTop: 10, height: 60, width: 350, marginLeft: 'auto', marginRight: 'auto' }}
            autoCompleteType="password"
          >
            <Input placeholder="HASLO" />
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
            <Text>Zaloguj sie</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
