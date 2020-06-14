import React, { Component } from 'react';
import { Animated, StyleSheet } from 'react-native';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import { Container, Button, View, DeckSwiper, Thumbnail, Card, Text, Left, Body, Icon, H1 } from 'native-base';
export default class CardLearning extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    flashcards: [],
  };

  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '0deg'],
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });
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
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  componentDidMount = async () => {
    await this.getFlashcards();
    console.log(this.state.flashcards[9].german);

    this.setState({
      german: this.state.flashcards[0].german,
      polish: this.state.flashcards[0].polish,
    });
  };
  updateCard(event) {
    const randNum = Math.floor(Math.random() * this.state.flashcards.length);
    const randId = this.state.flashcards[randNum].german;

    this.setState({
      german: randId,
      polish: this.state.flashcards[randNum].polish,
    });
  }
  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };

    return (
      <Container>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Left>
            <Body>
              <H1 style={[styles.flipText]}>{this.state.german}</H1>
            </Body>
          </Left>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <Left>
            <Body>
              <H1 style={[styles.flipText]}>{this.state.polish}</H1>
            </Body>
          </Left>
        </Animated.View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            position: 'absolute',
            bottom: 200,
            left: 10,
            right: 10,
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Button bordered iconLeft style={{ width: '40%' }} onPress={() => this.flipCard()}>
            <Icon name="sync" />
            <Text>Obróć</Text>
          </Button>
          <Button iconRight style={{ width: '40%', backgroundColor: '#1890ff' }} onPress={() => this.updateCard()}>
            <Text>Dalej</Text>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  flipCard: {
    backgroundColor: 'white',
    shadowColor: '#000',
    borderColor: 'white',
    backfaceVisibility: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.37,
    shadowRadius: 3.49,
    elevation: 4,
    height: 270,
    width: '90%',
    alignContent: 'center',
    top: '19%',
    left: '5%',
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
  },
  flipCardBack: {
    position: 'absolute',
  },

  flipText: {
    height: '100%',
    width: 300,
    top: '29%',
    left: '0%',
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});
