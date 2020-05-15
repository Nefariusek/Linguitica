import { Input, Button } from 'antd';
import React, { Component } from 'react';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false,
      showAnswer: false,
      answer: ' ',
      isGood: ' ',
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
  }

  updateAnswer(e) {
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

    if (this.state.answer === this.props.german) {
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

  render() {
    const { isGood } = this.state;
    const { showContent } = this.state;
    const { showAnswer } = this.state;
    return (
      <div className="writeRow" style={{ display: 'flex' }}>
        <div className="writeCardContainer">
          {isGood === true ? (
            <div className="writeCard" style={{ boxShadow: '0px 0px 30px green ' }}></div>
          ) : isGood === false ? (
            <div className="writeCard" style={{ boxShadow: '0px 0px 30px red ' }}></div>
          ) : (
            <div className="writeCard" style={{ boxShadow: '0px 0px 30px #0070ad ' }}></div>
          )}
          <div className="wordContent">
            <div className="word">{this.props.polish}</div>
            <div className="tip" style={{ visibility: 'false' }}>
              {showContent === true ? (
                <div style={{ display: 'flex', marginTop: '10%', whiteSpace: 'pre' }}>
                  <h1 style={{ fontWeight: 'bold', color: '#0070ad' }}>Podpowiedź: </h1>
                  <h1>{this.props.tip}</h1>
                </div>
              ) : (
                ' '
              )}
            </div>
            <div className="word" style={{ visibility: 'false', marginTop: '5%', color: '#65e616' }}>
              {showAnswer === true ? <div> {this.props.german}</div> : ' '}
            </div>
          </div>
        </div>
        <div className="asnwerDiv">
          <div className="translateDiv">
            <Input
              type="text"
              className="answerInput"
              id="answerInput"
              placeholder="Podaj odpowiedź"
              value={this.setState.answer}
              onChange={this.updateAnswer}
              onfocus="this.value=''"
            />
          </div>
          <div style={{ display: 'flex', margin: 'auto' }}>
            <Button className="checkAnswer" onClick={this.toggleAnswer}>
              Sprawdź
            </Button>
            <Button className="tipBtn" onClick={this.toggleVisibility}>
              Podpowiedź
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Write;
