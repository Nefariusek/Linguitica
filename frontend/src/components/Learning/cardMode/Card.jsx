import React from 'react';

const Card = (props) => (
  <div className="learningCardContainer">
    <div className="learningCard">
      <div className="front">
        <div className="german">{props.german}</div>
      </div>
      <div className="back">
        <div className="polish">{props.polish}</div>
      </div>
    </div>
  </div>
);

export default Card;
