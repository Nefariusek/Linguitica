import React, { Component } from 'react';
import Quiz from './Quiz';
import NextButton from '../cardMode/NextButton.jsx';

class QuizLearning extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.drawCard = this.drawCard.bind(this);

    this.state = {
      cards: [
        {
          id: 1,
          german: 'die Schwester',
          polish: 'siostra',
          options: ['Schwester', 'das Schwester', 'die Schwestern', 'die Schweste'],
          tip: 'die',
        },
        {
          id: 2,
          german: 'der Hund',
          polish: 'pies',
          options: ['hund', 'das Hund', 'der Hunde', 'der Hund'],
          tip: 'der',
        },
        {
          id: 3,
          german: 'der Tierarzt',
          polish: 'weterynarz',
          options: ['das Tierarzt', 'der Tierarzte', 'der Arzt', 'der Hund'],
          tip: 'der',
        },
      ],
      currentCard: {},
    };
  }
  drawCard() {
    this.props.drawCard();
  }
  componentWillMount() {
    const currentCards = this.state.cards;

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards),
    });
  }
  getRandomCard(currentCards) {
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  }

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards),
    });
  }

  render() {
    return (
      <>
        <Quiz
          german={this.state.currentCard.german}
          tip={this.state.currentCard.tip}
          polish={this.state.currentCard.polish}
        />
        <div className="btn-next" style={{ marginLeft: '13%', marginTop: '5px' }}>
          <NextButton drawCard={this.updateCard} />
        </div>
      </>
    );
  }
}

export default QuizLearning;
