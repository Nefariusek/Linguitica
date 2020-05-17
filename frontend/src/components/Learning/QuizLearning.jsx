import React, { Component } from 'react';
import { Button } from 'antd';
import setHeaders from '../../utils/setHeaders';

/* ----- shift - podpowiedz, 
enter zatwierdza odp + dalej gdy dobra odpowiedz, 
strzałka góra - pisanko,
strzałka w lewo - fiszki ------- */

class QuizLearning extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  state = {
    flashcards: [],
    temp: [],
    category: this.props.category,
    level: this.props.level,
    answ1: ' ',
    answ2: 'great ',
    answ3: ' ',
    answer: ' ',
    givenAnswer: null,
    tipON: ' ',
    isGood: ' ',
    randQueue: ' ',
    focus: ' ',
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

    /* losowanko złych odp */

    const randNum1 = Math.floor(Math.random() * this.state.flashcards.length);

    const randAnsw1 = this.state.flashcards[randNum1].german;

    const randNum2 = Math.floor(Math.random() * this.state.flashcards.length);
    const randAnsw2 = this.state.flashcards[randNum2].german;

    const randNum3 = Math.floor(Math.random() * this.state.flashcards.length);
    const randAnsw3 = this.state.flashcards[randNum3].german;

    this.setState({ polish: randCard, german: randGer, answ1: randAnsw1, answ2: randAnsw2, answ3: randAnsw3 });
  };

  handleKey(event) {
    if (event.keyCode === 16) {
      this.setState({
        //shift
        tipON: true,
      });
    } else if (event.keyCode === 13) {
      if (this.state.isGood === true) {
        //zmienia karte gdy dobra odp
        this.updateCard(event);
      }
    } else if (event.keyCode === 9) {
      if (this.state.focus === ' ') {
        this.setState({
          focus: 1,
        });
        console.log('9');
      }
      if (this.state.focus === 1) console.log('1');
    }
  }
  updateCard(event) {
    event.preventDefault();

    const randNum = Math.floor(Math.random() * this.state.flashcards.length);

    const randNum1 = Math.floor(Math.random() * this.state.flashcards.length);
    const randNum2 = Math.floor(Math.random() * this.state.flashcards.length);
    const randNum3 = Math.floor(Math.random() * this.state.flashcards.length);

    this.setState({
      german: this.state.flashcards[randNum].german,
      polish: this.state.flashcards[randNum].polish,
      answ2: this.state.flashcards[randNum2].german,
      answ1: this.state.flashcards[randNum1].german,
      answ3: this.state.flashcards[randNum3].german,
      isGood: ' ',
      randQueue: Math.floor(Math.random() * 1000),
      tipON: false,
    });
  }
  toggleAnswer(givenAnswer) {
    this.setState({
      answer: givenAnswer,
    });
    if (givenAnswer === this.state.german) {
      this.setState({
        isGood: true,
      });
    } else
      this.setState({
        isGood: false,
      });
  }
  deleteTwo() {
    console.log(this.state.tipON);
    this.setState({
      tipON: true,
    });
  }

  render() {
    const { isGood } = this.state;
    const { tipON } = this.state;

    return (
      <div tabIndex={-1} onKeyDown={this.handleKey}>
        <div className=" quizCardContainer">
          <div
            className="quizCard"
            style={
              isGood === true
                ? { boxShadow: '0px 0px 30px green ' }
                : isGood === false
                ? { boxShadow: '0px 0px 30px red ' }
                : { boxShadow: '0px 0px 30px #0070ad ' }
            }
          >
            <div className="wordQuiz">{this.state.polish}</div>

            <div className="tipQuiz">
              {this.state.randQueue % 4 === 0 ? (
                <div className="possibleAnswers">
                  <div className="singleAnswer">
                    <Button
                      className="odpBtn"
                      onClick={() => this.toggleAnswer(this.state.german)}
                      onKeyPressCapture={() => this.toggleAnswer(this.state.german)}
                      autoFocus="on"
                    >
                      {this.state.german}
                    </Button>
                  </div>
                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ2)}>
                      {this.state.answ2}
                    </Button>
                  </div>
                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ3)}>
                      {this.state.answ3}
                    </Button>
                  </div>
                  <div className="singleAnswer">
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ1)}>
                      {this.state.answ1}
                    </Button>
                  </div>
                </div>
              ) : this.state.randQueue % 4 === 1 ? (
                <div className="possibleAnswers">
                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ2)} autoFocus="on">
                      {this.state.answ2}
                    </Button>
                  </div>
                  <div className="singleAnswer">
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.german)}>
                      {this.state.german}
                    </Button>
                  </div>
                  <div className="singleAnswer">
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ3)}>
                      {this.state.answ3}
                    </Button>
                  </div>
                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ1)}>
                      {this.state.answ1}
                    </Button>
                  </div>
                </div>
              ) : this.state.randQueue % 4 === 2 ? (
                <div className="possibleAnswers">
                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ2)} autoFocus="on">
                      {this.state.answ2}
                    </Button>
                  </div>
                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ3)}>
                      {this.state.answ3}
                    </Button>
                  </div>
                  <div className="singleAnswer">
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.german)}>
                      {this.state.german}
                    </Button>
                  </div>
                  <div className="singleAnswer">
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ1)}>
                      {this.state.answ1}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="possibleAnswers">
                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ2)} autoFocus="on">
                      {this.state.answ2}
                    </Button>
                  </div>

                  <div className="singleAnswer">
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ3)}>
                      {this.state.answ3}
                    </Button>
                  </div>

                  <div
                    className="singleAnswer"
                    style={tipON === true ? { visibility: ' hidden' } : { visibility: 'visible' }}
                  >
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.answ1)}>
                      {this.state.answ1}
                    </Button>
                  </div>
                  <div className="singleAnswer">
                    <Button className="odpBtn" onClick={() => this.toggleAnswer(this.state.german)}>
                      {this.state.german}Focus
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="quizButtons"
            style={{
              display: 'flex',
              marginTop: '90%',
              marginLeft: '0',
              position: 'absolute',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              tabIndex={1}
              className="clickNextBtn"
              style={{ width: '130px', fontSize: '1.3em', padding: '0' }}
              onClick={() => this.deleteTwo(this.state.tipON)}
            >
              Podpowiedź
            </Button>

            <Button
              tabIndex={-2}
              className="clickNextBtn"
              style={{ width: '130px', fontSize: '1.3em' }}
              onClick={this.updateCard}
            >
              Dalej
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default QuizLearning;
