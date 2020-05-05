import React, { Component } from 'react';
import Card from './Card';
import NextButton from './NextButton';

class CardLearning extends Component {
  constructor(props) {
    super(props);

    this.updateCard = this.updateCard.bind(this);
    this.drawCard = this.drawCard.bind(this);

    this.state = {
      cards: [
        {
          id: 1,
          german: 'der Computer',
          polish: 'komputer',
          category: 'elektornika',
        },
        {
          id: 1,
          german: 'die Katze',
          polish: 'kot',
          category: 'zwierzę',
        },
        { id: 3, german: 'Der Hund', polish: 'pies' },
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
      <div>
        <div className="cardRow">
          <Card german={this.state.currentCard.german} polish={this.state.currentCard.polish} />
        </div>
        <div className="btn-next">
          <NextButton drawCard={this.updateCard} />
        </div>
      </div>
    );
  }
}

export default CardLearning;
