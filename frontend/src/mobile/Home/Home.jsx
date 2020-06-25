import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text } from 'native-base';
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
            <Title>Home</Title>
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
          <Button
            full
            rounded
            style={{ marginTop: 10, backgroundColor: '#1890ff', height: 60 }}
            onPress={() => this.props.navigation.navigate('Logowanie')}
          >
            <Text>Zaloguj sie</Text>
          </Button>
          <Button
            full
            rounded
            style={{ marginTop: 10, backgroundColor: '#1890ff', height: 60 }}
            onPress={() => this.props.navigation.navigate('Rejestracja')}
          >
            <Text>Zarejestruj sie</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
