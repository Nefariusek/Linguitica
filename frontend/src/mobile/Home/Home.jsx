import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text } from 'native-base';
import Plant from '../../images/rose/rose6.png';

export default class HomeScreen extends React.Component {
  state = {};

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
        </Header>
        <Content>
          <ImageBackground source={Plant} style={styles.image} />
          <Text style={styles.textSection}>Informacje</Text>
          <Text style={styles.textLine}>Nazwa:</Text>
          <Text style={styles.textLine}>Poziom:</Text>
          <Text style={styles.textLine}>Wytrzymałość:</Text>
          <Text style={styles.textLine}>Urokliwość:</Text>
          <Text style={styles.textSection}>Statystyki</Text>
          <Text style={styles.textLine}>Z nami od:</Text>
          <Text style={styles.textLine}>Streak:</Text>
          <Text style={styles.textLine}>Nauczone słówka:</Text>
          <Text style={styles.textLine}>Ukończone testy:</Text>
          <Text style={styles.textLine}>Ukończone zadania:</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textSection: {
    marginTop: 10,
    width: '50%',
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 20,
  },
  textLine: {
    marginTop: 10,
    width: '50%',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 20,
  },
  image: {
    height: 400,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    marginTop: 20,
    marginBottom: 70,
  },
});
