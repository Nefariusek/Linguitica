import React from 'react';
import './startBody.css';
import bugIcon from '../../pictures/bugIcon.png';
import flowerIcon from '../../pictures/flowerIcon.png';
import infoIcon from '../../pictures/infoIcon.png';

import check from '../../pictures/check.png';
import flowerLevel from '../../pictures/flowerLevel.png';

import { Redirect } from 'react-router-dom';

class Body extends React.Component {
  render() {
    return (
      <div className="startBody">
        <div className="left">
          <div className="action">
            <img src={bugIcon} alt=""></img>
            <h2>dodaj nawóz</h2>
          </div>
          <div className="action">
            <img src={flowerIcon} alt=""></img>
            <h2>Ozdoby</h2>
          </div>
        </div>

        <div className="picture">
          <img src={flowerLevel} alt="roslinka" />
        </div>

        <div className="right">
          <div className="properties">
            <img classname="infoIcon" src={infoIcon} alt=""></img>
          </div>
          <div className="properties">
            <img src={check} alt=""></img>
            <h2>Nawodnienie: </h2>
          </div>
          <div className="properties">
            <img src={check} alt=""></img>
            <h2>Wzrost: </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
