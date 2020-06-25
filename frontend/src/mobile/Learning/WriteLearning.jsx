import React, { Component } from 'react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import {
  Container,
  View,
  Header,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Input,
  Icon,
  Item,
  H1,
  H3,
  Button,
} from 'native-base';

import { Alert, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default class WriteLearning extends Component {
  constructor(props) {
    super(props);

    this.showAnswer = this.showAnswer.bind(this);
  }

  state = {
    flashcards: [],
    showAnswer: false,
    TextInputHandler: '',
    answer: ' ',
    isGood: ' ',
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
  GetValueFunction = () => {
    const { TextInputHandler } = this.state;
    //Alert.alert(TextInputHandler);
    console.log(TextInputHandler);
    if (TextInputHandler === this.state.polish) {
      this.setState({
        showAnswer: true,
        isGood: true,
        TextInputHandler: '',
      });
    } else {
      this.setState({
        isGood: false,
        TextInputHandler: '',
      });
    }

    console.log(this.state.isGood);
  };

  showAnswer() {
    this.setState({
      showAnswer: true,
    });
  }
  componentDidMount = async () => {
    await this.getFlashcards();

    this.setState({
      german: this.state.flashcards[0].german,
      polish: this.state.flashcards[0].polish,
    });
  };
  updateCard(event) {
    const randNum = Math.floor(Math.random() * this.state.flashcards.length);
    const randId = this.state.flashcards[randNum].german;

    Math.floor(Math.random() * 10000) % 2 === 0
      ? this.setState({ polish: this.state.flashcards[randNum].polish, german: randId })
      : this.setState({ polish: randId, german: this.state.flashcards[randNum].polish });

    this.setState({
      TextInputHandler: '',
      showAnswer: false,
      isGood: ' ',
    });
  }
  render() {
    const { isGood } = this.state;
    const { showAnswer } = this.state;

    return (
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <Container style={{ paddingBottom: '10%' }}>
          <CardItem
            style={
              this.state.isGood === true
                ? [styles.card, styles.goodAnswer]
                : isGood === false
                ? [styles.card, styles.wrongAnswer]
                : [styles.card]
            }
          >
            <Left>
              <Body>
                <H1 style={{ marginTop: 0, marginBottom: '10%' }}>{this.state.german}</H1>
                {this.state.showAnswer === true ? (
                  <H3 note style={{ marginTop: '0%' }}>
                    {this.state.polish}
                  </H3>
                ) : (
                  <Text></Text>
                )}
              </Body>
            </Left>
          </CardItem>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              position: 'absolute',
              bottom: 260,
              left: 10,
              right: 10,
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            {this.state.showAnswer === true ? (
              <Input
                disabled
                placeholder=" Dalej"
                style={{ top: 0, borderBottomColor: 'gray', borderBottomWidth: 1, maxWidth: '65%' }}
              />
            ) : (
              <TextInput
                placeholder="Podaj odpowiedź"
                value={this.state.TextInputHandler}
                onChangeText={(TextInputHandler) => this.setState({ TextInputHandler })}
                //onChange={this.updateAnswer}
                style={{ top: 0, borderBottomColor: 'gray', borderBottomWidth: 1, width: '65%' }}
              />
            )}

            <Button bordered iconLeft style={{ width: '30%', top: 2 }} onPress={this.GetValueFunction}>
              <Text>SPRAWDŹ</Text>
            </Button>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              position: 'absolute',
              marginTop: 450,
              left: '5%',
              right: '5%',
              justifyContent: 'space-between',
              padding: 15,
            }}
          >
            <Button iconLeft style={{ width: '40%', backgroundColor: '#1890ff' }} onPress={this.showAnswer}>
              <Icon name="key" />
              <Text>Nie wiem</Text>
            </Button>
            <Button iconLeft style={{ width: '40%', backgroundColor: '#1890ff' }} onPress={() => this.updateCard()}>
              <Icon name="arrow-forward" />
              <Text>Dalej</Text>
            </Button>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    borderColor: 'white',
    backfaceVisibility: 'hidden',

    shadowOpacity: 1.37,

    elevation: 4,
    height: 250,
    width: '90%',
    alignContent: 'center',
    bottom: 370,
    left: '5%',
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
  },
  wrongAnswer: {
    borderColor: '#f24b4b',
    borderWidth: 3,
  },
  goodAnswer: {
    borderColor: '#24e589',
    borderWidth: 3,
  },
});
