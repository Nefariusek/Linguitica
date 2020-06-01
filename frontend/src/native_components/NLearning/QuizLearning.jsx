import React, { Component } from 'react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import { Container, Button, View, Card, CardItem, Text, Left, Body, Icon, H1 } from 'native-base';
import { StyleSheet } from 'react-native';

export default class QuizLearning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcards: [],
      good: false,
      wrong: false,
      wrong2: false,
      wrong3: false,
      hidden1: false,
      hidden2: false,
      hidden3: false,
      randQueue: 0,
    };
  }
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
  componentDidMount = async () => {
    await this.getFlashcards();

    const randA = Math.floor(Math.random() * this.state.flashcards.length);
    const randB = Math.floor(Math.random() * this.state.flashcards.length);
    const randC = Math.floor(Math.random() * this.state.flashcards.length);
    const randD = Math.floor(Math.random() * this.state.flashcards.length);

    this.setState({
      german: this.state.flashcards[0].german,
      polish: this.state.flashcards[0].polish,
      answ1: this.state.flashcards[randB].polish,
      answ2: this.state.flashcards[randC].polish,
      answ3: this.state.flashcards[randD].polish,
    });
  };
  goodAnswer() {
    this.setState({
      good: true,
    });
  }

  wrongAnswer() {
    this.setState({
      wrong: true,
    });
  }
  wrongAnswer2() {
    this.setState({
      wrong2: true,
    });
  }
  wrongAnswer3() {
    this.setState({
      wrong3: true,
    });
  }

  updateCard = () => {
    const randA = Math.floor(Math.random() * this.state.flashcards.length);
    const randB = Math.floor(Math.random() * this.state.flashcards.length);
    const randC = Math.floor(Math.random() * this.state.flashcards.length);

    const randD = Math.floor(Math.random() * this.state.flashcards.length);

    this.setState({
      polish: this.state.flashcards[randA].polish,
      german: this.state.flashcards[randA].german,
      answ1: this.state.flashcards[randB].polish,
      answ2: this.state.flashcards[randC].polish,
      answ3: this.state.flashcards[randD].polish,
      showAnswer: false,
      randQueue: Math.floor(Math.random() * 1000),
      good: false,
      wrong: false,
      wrong2: false,
      wrong3: false,
      hidden3: false,
      hidden2: false,
      hidden1: false,
    });
  };

  tipOn() {
    const RandTip = Math.floor(Math.random() * 1000);
    RandTip % 3 === 0
      ? this.setState({
          hidden1: true,
          hidden2: true,
        })
      : RandTip % 3 === 1
      ? this.setState({
          hidden1: true,
          hidden3: true,
        })
      : this.setState({
          hidden2: true,
          hidden3: true,
        });
  }

  render() {
    return (
      <Container>
        <View>
          {this.state.randQueue % 4 === 0 ? (
            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Body>
                    <H1 style={{ textTransform: 'none' }}>{this.state.german}</H1>
                  </Body>
                </Left>
              </CardItem>

              <Button
                onPress={() => this.goodAnswer(this)}
                style={
                  this.state.good === true
                    ? { backgroundColor: 'green', marginBottom: 10, height: '14%' }
                    : { marginBottom: 10, height: '14%' }
                }
              >
                <Text>{this.state.polish}</Text>
              </Button>
              {this.state.hidden2 === false ? (
                <Button
                  onPress={() => this.wrongAnswer(this)}
                  style={
                    this.state.wrong === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ1}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              {this.state.hidden1 === false ? (
                <Button
                  onPress={() => this.wrongAnswer2(this)}
                  style={
                    this.state.wrong2 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ2}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              {this.state.hidden3 === false ? (
                <Button
                  onPress={() => this.wrongAnswer3(this)}
                  style={
                    this.state.wrong3 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 0, height: '14%' }
                  }
                >
                  <Text> {this.state.answ3}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
            </Card>
          ) : this.state.randQueue % 4 === 1 ? (
            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Body>
                    <H1 style={{ textTransform: 'none' }}>{this.state.german}</H1>
                  </Body>
                </Left>
              </CardItem>

              {this.state.hidden2 === false ? (
                <Button
                  onPress={() => this.wrongAnswer(this)}
                  style={
                    this.state.wrong === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ1}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              <Button
                onPress={() => this.goodAnswer(this)}
                style={
                  this.state.good === true
                    ? { backgroundColor: 'green', marginBottom: 10, height: '14%' }
                    : { marginBottom: 10, height: '14%' }
                }
              >
                <Text> {this.state.polish}</Text>
              </Button>
              {this.state.hidden1 === false ? (
                <Button
                  onPress={() => this.wrongAnswer2(this)}
                  style={
                    this.state.wrong2 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ2}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              {this.state.hidden3 === false ? (
                <Button
                  onPress={() => this.wrongAnswer3(this)}
                  style={
                    this.state.wrong3 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 0, height: '14%' }
                  }
                >
                  <Text> {this.state.answ3}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
            </Card>
          ) : this.state.randQueue % 4 === 2 ? (
            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Body>
                    <H1 style={{ textTransform: 'none' }}>{this.state.german}</H1>
                  </Body>
                </Left>
              </CardItem>
              {this.state.hidden2 === false ? (
                <Button
                  onPress={() => this.wrongAnswer(this)}
                  style={
                    this.state.wrong === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ1}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              {this.state.hidden1 === false ? (
                <Button
                  onPress={() => this.wrongAnswer2(this)}
                  style={
                    this.state.wrong2 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ2}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              <Button
                onPress={() => this.goodAnswer(this)}
                style={
                  this.state.good === true
                    ? { backgroundColor: 'green', marginBottom: 10, height: '14%' }
                    : { marginBottom: 10, height: '14%' }
                }
              >
                <Text>{this.state.polish}</Text>
              </Button>
              {this.state.hidden3 === false ? (
                <Button
                  onPress={() => this.wrongAnswer3(this)}
                  style={
                    this.state.wrong3 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 0, height: '14%' }
                  }
                >
                  <Text> {this.state.answ3}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
            </Card>
          ) : (
            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Body>
                    <H1 style={{ textTransform: 'none' }}>{this.state.german}</H1>
                  </Body>
                </Left>
              </CardItem>
              {this.state.hidden2 === false ? (
                <Button
                  onPress={() => this.wrongAnswer(this)}
                  style={
                    this.state.wrong === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ1}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              {this.state.hidden1 === false ? (
                <Button
                  onPress={() => this.wrongAnswer2(this)}
                  style={
                    this.state.wrong2 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ2}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              {this.state.hidden3 === false ? (
                <Button
                  onPress={() => this.wrongAnswer3(this)}
                  style={
                    this.state.wrong3 === true
                      ? { backgroundColor: 'red', marginBottom: 10, height: '14%' }
                      : { marginBottom: 10, height: '14%' }
                  }
                >
                  <Text> {this.state.answ3}</Text>
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'white', marginBottom: 10, height: '14%' }}></Button>
              )}
              <Button
                onPress={() => this.goodAnswer(this)}
                style={
                  this.state.good === true
                    ? { backgroundColor: 'green', marginBottom: 10, height: '14%' }
                    : { marginBottom: 10, height: '14%' }
                }
              >
                <Text> {this.state.polish}</Text>
              </Button>
            </Card>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            position: 'absolute',
            bottom: 150,
            left: 10,
            right: 10,
            justifyContent: 'space-between',
            padding: 15,
          }}
        >
          <Button style={{ width: '44%' }} bordered iconLeft onPress={() => this.tipOn(this)}>
            <Icon name="key" />
            <Text>Podpowiedź</Text>
          </Button>
          <Button
            style={{ width: '44%', textAlign: 'center', backgroundColor: '#0027ac' }}
            iconRight
            onPress={() => this.updateCard()}
          >
            <Text>Dalej</Text>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    elevation: 7,
    height: 350,
    width: '90%',
    alignContent: 'center',
    top: '20%',
    left: '5%',
  },
});
