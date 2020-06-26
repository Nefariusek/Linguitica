import React from 'react';
import axios from 'axios';
import { ImageBackground } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text } from 'native-base';
import Plant from '../../images/rose6.png';

export default class HomeScreen extends React.Component {
  state = {
    plantName: '',
    species: '',
    level: 0,
    health: 0,
    max_health: 0,
    toughness: 15,
    charmingness: 10,
    irrigation_points: 0,
    irrigation_required: 0,
    stage: 'first',
  };

  getPlant = async () => {
    await axios({
      url: `https://linguitica.herokuapp.com/api/plants/5ed3db66415db20017e14e86`,
      method: 'GET',
    }).then(
      (res) => {
        this.setState({
          plantName: res.data.name,
          species: res.data.species,
          level: res.data.level,
          health: res.data.health,
          max_health: res.data.max_health,
          toughness: res.data.toughness,
          charmingness: res.data.charmingness,
          irrigation_points: res.data.irrigation_points,
          irrigation_required: res.data.irrigation_required,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  componentDidMount = () => {
    this.getPlant();
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
            <Title>Home</Title>
          </Body>
        </Header>
        <Content>
          <ImageBackground source={Plant} style={styles.image} />
          <Text style={styles.textSection}>Informacje</Text>
          <Text style={styles.textLine}>
            <Text style={styles.textLine}>Nazwa: </Text>
            <Text style={styles.textLine}> {this.state.plantName}</Text>
          </Text>
          <Text style={styles.textLine}>
            <Text style={styles.textLine}>Poziom: </Text>
            <Text style={styles.textLine}> {this.state.level}</Text>
          </Text>
          <Text style={styles.textLine}>
            <Text style={styles.textLine}>Wytrzymałość: </Text>
            <Text style={styles.textLine}> {this.state.toughness}</Text>
          </Text>
          <Text style={styles.textLine}>
            <Text style={styles.textLine}>Urokliwość: </Text>
            <Text style={styles.textLine}> {this.state.charmingness}</Text>
          </Text>
          <Text style={styles.textLine}>Życie:</Text>
          <Text style={styles.textLineCenter}>
            {this.state.health}/{this.state.max_health}
          </Text>
          <Text style={styles.textLine}>Nawodnienie:</Text>
          <Text style={styles.textLineCenter}>
            {this.state.irrigation_points}/{this.state.irrigation_required}
          </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textSection: {
    marginTop: 10,
    width: '100%',
    fontSize: 25,
    textAlign: 'center',
  },
  textLine: {
    marginTop: 20,
    width: '100%',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 20,
  },
  textLineCenter: {
    marginTop: 20,
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
  },
  textLineLeft: {
    textAlign: 'left',
  },
  textLineRight: {
    marginTop: 10,
    width: '40%',
    fontSize: 20,
    textAlign: 'right',
    marginRight: 20,
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
  progress: {
    backgroundColor: 'white',
    marginLeft: 10,
    width: 350,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: '5%',
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
