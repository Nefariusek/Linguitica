import React, { Component } from 'react';
import { Button } from 'antd';
import setHeaders from '../../utils/setHeaders';

/* ----- shift - obraca fiszkę
enter nastepna 
jak sie zahaczy o buttona to spacja w sumie tez przewija do nastepnej fiszki
strzałka w prawo - quiz,
strzałka góra - pisanko ------- */

class CardLearning extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  state = {
    flashcards: [],
    temp: [],
    category: this.props.category,
    level: this.props.level,
    turn: false,
    changeLanguage: false,
  };

  getFlashcards = async () => {
    const response = await fetch('/api/flashcards', setHeaders());
    const body = await response.json();
    this.setState({ flashcards: body });
  };

  componentDidMount = async () => {
    await this.getFlashcards();

    const randNum = Math.floor(Math.random() * this.state.flashcards.length);
    const randCard = this.state.flashcards[randNum].polish;
    const randGer = this.state.flashcards[randNum].german;

    this.setState({ polish: randCard, german: randGer });

    for (let i = 0; i < 1; i++) {
      const { temp } = this.state;
      temp[i] = false;
    }
  };

  updateCard(event) {
    event.preventDefault();

    const randNum = Math.floor(Math.random() * this.state.flashcards.length);
    const randId = this.state.flashcards[randNum].german;

    this.setState({
      german: randId,
      polish: this.state.flashcards[randNum].polish,
    });
  }
  handleKey(event) {
    if (event.keyCode === 13) {
      this.updateCard(event);
      this.setState({
        changeLanguage: Math.floor(Math.random() * 1000),
      });
    }
    if (event.keyCode === 16) {
      //shift
      this.state.turn === true
        ? this.setState({
            turn: false,
          })
        : this.setState({
            turn: true,
          });
    }
  }

  render() {
    const { turn } = this.state;
    const { changeLanguage } = this.state;
    return (
      <div tabIndex={-1} onKeyDown={this.handleKey}>
        {changeLanguage % 2 === 0 ? (
          <div className="cardRow">
            <div className="learningCardContainer">
              <div
                className="learningCard"
                style={turn === true ? { transition: 'all 0.4s ease-in-out' } : { border: 'none' }}
              >
                <div
                  className="front"
                  style={turn === true ? { transform: 'rotateY(180deg)' } : { transform: 'rotateY(0deg)' }}
                >
                  <div className="german">{this.state.german}</div>
                </div>
                <div
                  className="back"
                  style={turn === true ? { transform: 'rotateY(0deg)' } : { transform: 'rotateY(180deg)' }}
                >
                  <div className="polish">{this.state.polish}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="cardRow">
            <div className="learningCardContainer">
              <div
                className="learningCard"
                style={turn === true ? { transition: 'all 0.4s ease-in-out' } : { border: 'none' }}
              >
                <div
                  className="front"
                  style={turn === true ? { transform: 'rotateY(180deg)' } : { transform: 'rotateY(0deg)' }}
                >
                  <div className="german">{this.state.polish}</div>
                </div>
                <div
                  className="back"
                  style={turn === true ? { transform: 'rotateY(0deg)' } : { transform: 'rotateY(180deg)' }}
                >
                  <div className="polish">{this.state.german}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="nextBtnContainer">
          <Button className="clickNextBtn" onClick={this.updateCard}>
            Dalej
          </Button>
        </div>
      </div>
    );
  }
}
export default CardLearning;
