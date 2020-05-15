import React, { Component } from 'react';

class NextButton extends Component {
  constructor(props) {
    super(props);

    this.drawCard = this.drawCard.bind(this);
  }

  drawCard() {
    this.props.drawCard();
  }

  render(props) {
    return (
      <div className="nextBtnContainer">
        <button className="clickNextBtn" onClick={this.drawCard}>
          Dalej
        </button>
      </div>
    );
  }
}
export default NextButton;
