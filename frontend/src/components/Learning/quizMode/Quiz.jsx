import { Input, Button } from 'antd';
import React, { Component } from 'react';

const { Search } = Input;

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false,
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(event) {
    event.preventDefault();
    this.setState({
      showContent: true,
    });
  }

  render() {
    const { showContent } = this.state;

    return (
      <div className=" quizCardContainer">
        <div className="quizCard">
          <div className="wordQuiz">{this.props.polish}</div>
          <div className="possibleAnswers">
            <div className="singleAnswer">
              <Button className="odpBtn">der Hund</Button>
            </div>
            <div className="singleAnswer">
              <Button className="odpBtn">der Tierarzt</Button>
            </div>
            <div className="singleAnswer">
              <Button className="odpBtn">die Zeit</Button>
            </div>
            <div className="singleAnswer">
              <Button className="odpBtn">die Katze</Button>
            </div>
          </div>
          <div className="tipQuiz">
            {showContent === true ? (
              <div
                style={{ display: 'flex', marginTop: '5px', marginBottom: '0', marginLeft: '3%', whiteSpace: 'pre' }}
              >
                <h1 style={{ fontWeight: 'bold', color: '#0070ad' }}>Podpowiedź: </h1>
                <h1>{this.props.tip}</h1>
              </div>
            ) : (
              ' '
            )}
          </div>
        </div>
        <div
          className="quizButtons"
          style={{ display: 'flex', marginTop: '90%', marginLeft: '0', position: 'absolute' }}
        >
          <div className="nextBtnContainer">
            <button className="clickNextBtn" onClick={this.toggleVisibility}>
              Podpowiedź
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Quiz;
