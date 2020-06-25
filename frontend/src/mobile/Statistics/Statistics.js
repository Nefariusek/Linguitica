import React, { Component } from 'react';
import axios from 'axios';
import setHeaders from '../../utils/setHeadersMobile';
import { View, StyleSheet, Animated, TouchableHighlightBase } from 'react-native';
import Store from '../../Store';
import {
  Container,
  Text,
  H3,
  Badge,
  Header,
  Title,
  Left,
  Button,
  Content,
  Icon,
  Body,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Thumbnail,
  Right,
} from 'native-base';

export default class Statistics extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    statistics_ID: null,
    plantID: '',
    words_learned: 8,
    quest_completed: 1,
    tests_passed: '',
    streak: 11,
    learning_since: '2020 - 06 - 03',
    statistics: '',
    numberOfFlashcards: 1,
    numberofQuests: 1,
  };
  //static contextType = Store;

  getStatisticsID = async () => {
    await axios({
      url: `https://linguitica.herokuapp.com/api/plants/5ed3db66415db20017e14e86`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ statistics_ID: response.data.statistics_id });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getStatistics = async () => {
    await axios({
      url: `/api/statistics/${this.state.statistics_ID}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        let formatted_data = response.data.learning_since.slice(0, 10);
        console.log(response);
        this.setState({
          words_learned: response.data.words_learned,
          tests_passed: response.data.tests_passed,
          quest_completed: response.data.quest_completed,
          streak: response.data.streak,
          learning_since: formatted_data,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getFlashcards = async () => {
    await axios({
      url: `https://linguitica.herokuapp.com/api/flashcards`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ flashcards: response.data });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getQuests = async () => {
    await axios({
      url: `https://linguitica.herokuapp.com/api/quests`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ quests: response.data });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  componentDidMount = async () => {
    await this.getStatisticsID();
    await this.getStatistics();
    await this.getFlashcards();
    await this.getQuests();
    await console.log(this.state);
    this.setState({
      numberOfFlashcards: this.state.flashcards.length,
      numberofQuests: this.state.quests.length,
    });
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
            <Title>Statystyki</Title>
          </Body>
        </Header>
        <Content>
          <Card style={styles.row}>
            <CardItem>
              <Left style={{ marginTop: 0 }}>
                <Icon style={{ color: '#1890ff', fontSize: 45 }} name="calendar" />
                <Body style={{ textAlign: 'center' }}>
                  <Text style={{ fontSize: 20 }}>Z nami od: </Text>
                  <Text note style={{ color: '#1890ff', fontSize: 15, fontWeight: 'bold' }}>
                    {this.state.learning_since}
                  </Text>
                </Body>
              </Left>
              <Right style={{ marginTop: '5%' }}>
                <Body style={{ textAlign: 'center' }}>
                  <Text style={{ fontSize: 20 }}>Dni z rzędu: </Text>
                  <Badge
                    success
                    style={{
                      backgroundColor: '#AEDC1B',
                      textAlign: 'center',
                      marginTop: 10,
                      marginLeft: '15%',
                      height: 50,
                      width: 50,
                      borderRadius: 90,
                      textAlign: 'center',
                    }}
                  >
                    <Text style={{ marginTop: 15, marginLeft: -3, fontSize: 20, fontWeight: 'bold' }}>
                      {this.state.streak}
                    </Text>
                  </Badge>
                </Body>
              </Right>
            </CardItem>
          </Card>
          <Card style={styles.row}>
            <CardItem>
              <Body>
                <Left>
                  <H3 style={{ marginTop: 20 }}>Nauczonych słówek:</H3>
                </Left>
                <H3
                  style={{
                    left: '47%',
                    marginTop: '3%',
                    color: '#AEDC1B',
                    fontWeight: 'bold',
                    fontSize: 32,
                    lineHeight: 40,
                  }}
                >
                  {this.state.words_learned}
                </H3>

                <View style={styles.progress}>
                  <View
                    style={{
                      width: (this.state.words_learned / this.state.numberOfFlashcards) * 350,
                      fontSize: 20,

                      backgroundColor: '#AEDC1B',
                      borderRadius: 2,
                    }}
                  >
                    <Text></Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.row}>
            <CardItem>
              <Body>
                <Left>
                  <H3 style={{ marginTop: 20 }}>Ukończonych misji: </H3>
                </Left>
                <H3
                  style={{
                    left: '50%',
                    marginTop: '3%',
                    color: '#1890ff',
                    fontWeight: 'bold',
                    fontSize: 32,
                    lineHeight: 40,
                  }}
                >
                  {this.state.quest_completed}
                </H3>

                <View style={styles.progress}>
                  <View
                    style={{
                      width: (this.state.quest_completed / this.state.numberofQuests) * 350,
                      fontSize: 20,
                      backgroundColor: '#1890ff',
                      borderRadius: 2,
                    }}
                  >
                    <Text></Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: '#1890ff' }}>
            <Button full>
              <Text>Linguitica</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'white',
    marginLeft: -2,
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
  row: {
    flex: 1,
    width: '95%',
    marginLeft: '2.5%',
    marginTop: '12%',
    height: '30%',
  },
});
