import React, { Component } from 'react';
import setHeaders from '../../utils/setHeaders';
import { Input, Form, Button } from 'antd';
import Instruction from './Instruction';
import Store from '../../Store';

/* ----- shift - podpowiedz, (trzeba ja wymyslic jeszcze, bo na razie kategoria)
enter dalej gdy dobra odpowiedz, 
shift trzeba zmienic, bo jak sie da duza literke to sie włącza podpowiedz 
strzałka w prawo - quiz,
strzałka w lewo - fiszki ------- */

class WriteLearning extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  state = {
    flashcards: [],
    temp: [],
    showContent: false,
    showAnswer: false,
    isGood: ' ',
  };
  static contextType = Store;

  updateAnswer(e) {
    e.preventDefault();
    this.setState({
      answer: e.target.value,
    });
  }

  toggleVisibility(event) {
    event.preventDefault();
    this.setState({
      showContent: true,
    });
  }

  toggleAnswer(event) {
    event.preventDefault();

    if (this.state.answer === this.state.german) {
      this.setState({
        showAnswer: true,
        isGood: true,
      });
    } else {
      this.setState({
        isGood: false,
      });
    }
  }

  getFlashcards = async () => {
    const response = await fetch('/api/flashcards', setHeaders());
    const body = await response.json();
    this.setState({ flashcards: body });
  };

  componentDidMount = async () => {
    // await this.getFlashcards();
    await this.setState({ flashcards: this.context.setToLearn });
    const numRows = this.state.flashcards.length;
    const randNum = Math.floor(Math.random() * numRows);
    const randCard = this.state.flashcards[randNum].polish;
    const randGer = this.state.flashcards[randNum].german;
    const randTip = this.state.flashcards[randNum].level;

    Math.floor(Math.random() * 10000) % 2 === 0
      ? this.setState({ polish: randCard, german: randGer, level: randTip, answer: ' ' })
      : this.setState({ polish: randGer, german: randCard, level: randTip, answer: ' ' });

    for (let i = 0; i < 1; i++) {
      const { temp } = this.state;
      temp[i] = false;
    }
  };

  updateCard(event) {
    event.preventDefault();

    const randNum = Math.floor(Math.random() * this.state.flashcards.length);
    const randId = this.state.flashcards[randNum].german;

    Math.floor(Math.random() * 10000) % 2 === 0
      ? this.setState({ polish: this.state.flashcards[randNum].polish, german: randId })
      : this.setState({ polish: randId, german: this.state.flashcards[randNum].polish });

    this.setState({
      showInfo: false,
      isGood: ' ',
      showContent: false,
      showAnswer: false,
      level: this.state.flashcards[randNum].level,
      answer: '',
    });
  }

  handleKey(event) {
    if (event.keyCode === 17) {
      this.setState({
        showContent: true,
      });
    } else if (event.keyCode === 13) {
      if (this.state.answer === this.state.german) {
        this.setState({
          showAnswer: true,
          isGood: true,
        });
      } else {
        this.setState({
          isGood: false,
          answer: '',
        });
      }
      if (this.state.isGood === true || this.state.showContent === true) {
        this.updateCard(event);
      }
    }
  }
  //
  render() {
    const { isGood } = this.state;
    const { showContent } = this.state;
    const { showAnswer } = this.state;

    return (
      <>
        <div className="writeRow" style={{ display: 'flex' }} tabIndex={1} onKeyDown={this.handleKey}>
          <div className="writeCardContainer">
            <div
              className="writeCard"
              style={
                isGood === true
                  ? { boxShadow: '0px 0px 30px green ' }
                  : isGood === false
                  ? { boxShadow: '0px 0px 30px red ' }
                  : { boxShadow: '0px 0px 30px #0070ad ' }
              }
            ></div>

            <div className="wordContent">
              <div className="word">{this.state.polish}</div>

              {showContent === true ? <div className="tip">{this.state.german}</div> : ' '}

              {showAnswer === true ? (
                <div className="word" style={{ color: '#65e616' }}>
                  {' '}
                  {this.state.german}
                </div>
              ) : (
                ' '
              )}
            </div>
          </div>
          <div className="asnwerDiv">
            <div className="translateDiv">
              <Form className="form">
                <Input
                  type="text"
                  //  className="answerInput"
                  id="answerInput"
                  placeholder="Podaj odpowiedź"
                  //value={this.setState.answer}
                  value={this.state.answer}
                  onChange={this.updateAnswer}
                  // onfocus="this.value=''"
                  autoComplete="off"
                  autoFocus="on"
                  onPressEnter={this.toggleAnswer}
                  allowClear="true"
                />
              </Form>
            </div>
            <div style={{ display: 'flex', margin: 'auto' }}>
              <Button className="checkAnswer" onClick={this.toggleAnswer}>
                Sprawdź
              </Button>
              <Button className="tipBtn" onClick={this.toggleVisibility}>
                Nie wiem
              </Button>
            </div>
          </div>
        </div>
        <div className="nextBtnContainer" style={{ display: 'flex', justifyContent: 'center' }}>
          <Instruction />
          <Button className="clickNextBtn" onClick={this.updateCard} style={{ marginLeft: '1%' }}>
            Dalej
          </Button>
        </div>
      </>
    );
  }
}

export default WriteLearning;
