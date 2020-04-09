import React from 'react';
import bugIcon from '../../images/bugIcon.png';
import flowerIcon from '../../images/flowerIcon.png';
import infoIcon from '../../images/infoIcon.png';

import check from '../../images/check.png';
import flowerLevel from '../../images/flowerLevel.png';

class Body extends React.Component {
  render() {
    return (
      <div className="startBody-home">
        <div className="left-home">
          <div className="action-home">
            <img src={bugIcon} alt=""></img>
            <h2>dodaj nawóz</h2>
          </div>
          <div className="action-home">
            <img src={flowerIcon} alt=""></img>
            <h2>Ozdoby</h2>
          </div>
        </div>

        <div className="picture-home">
          <img src={flowerLevel} alt="roslinka" />
        </div>

        <div className="right-home">
          <div className="properties-home">
            <img classname="infoIcon-home" src={infoIcon} alt=""></img>
          </div>
          <div className="properties-home">
            <img src={check} alt=""></img>
            <h2>Nawodnienie: </h2>
          </div>
          <div className="properties-home">
            <img src={check} alt=""></img>
            <h2>Wzrost: </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
