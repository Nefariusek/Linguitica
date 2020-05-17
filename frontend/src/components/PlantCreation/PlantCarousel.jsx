import React, { Component } from 'react';
import { Carousel } from 'antd';
import bonsai1 from '../../images/bonsai/bonsai1.PNG';
import bonsai2 from '../../images/bonsai/bonsai2.PNG';
import bonsai3 from '../../images/bonsai/bonsai3.PNG';
import bonsai4 from '../../images/bonsai/bonsai4.PNG';
import bonsai5 from '../../images/bonsai/bonsai5.PNG';
import bonsai6 from '../../images/bonsai/bonsai6.PNG';

import cactus1 from '../../images/cactus/kaktus1.PNG';
import cactus2 from '../../images/cactus/kaktus2.PNG';
import cactus3 from '../../images/cactus/kaktus3.PNG';
import cactus4 from '../../images/cactus/kaktus4.PNG';
import cactus5 from '../../images/cactus/kaktus5.PNG';
import cactus6 from '../../images/cactus/kaktus6.PNG';

import rose1 from '../../images/rose/rose1.PNG';
import rose2 from '../../images/rose/rose2.PNG';
import rose3 from '../../images/rose/rose3.PNG';
import rose4 from '../../images/rose/rose4.PNG';
import rose5 from '../../images/rose/rose5.PNG';
import rose6 from '../../images/rose/rose6.PNG';

import dandelion1 from '../../images/dandelion/mlecz1.PNG';
import dandelion2 from '../../images/dandelion/mlecz2.PNG';
import dandelion3 from '../../images/dandelion/mlecz3.PNG';
import dandelion4 from '../../images/dandelion/mlecz4.PNG';
import dandelion5 from '../../images/dandelion/mlecz5.PNG';
import dandelion6 from '../../images/dandelion/mlecz6.PNG';

class PlantCarousel extends Component {
  render() {
    if (this.props.species === 'Bonsai') {
      return (
        <Carousel autoplay="true">
          <div className="Slide">
            <img src={bonsai1} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={bonsai2} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={bonsai3} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={bonsai4} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={bonsai5} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={bonsai6} alt="nasionko" />
          </div>
        </Carousel>
      );
    } else if (this.props.species === 'Cactus') {
      return (
        <Carousel autoplay="ture">
          <div className="Slide">
            <img src={cactus1} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={cactus2} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={cactus3} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={cactus4} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={cactus5} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={cactus6} alt="nasionko" />
          </div>
        </Carousel>
      );
    } else if (this.props.species === 'Rose') {
      return (
        <Carousel autoplay="ture">
          <div className="Slide">
            <img src={rose1} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={rose2} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={rose3} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={rose4} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={rose5} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={rose6} alt="nasionko" />
          </div>
        </Carousel>
      );
    } else {
      return (
        <Carousel autoplay="true">
          <div className="Slide">
            <img src={dandelion1} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={dandelion2} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={dandelion3} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={dandelion4} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={dandelion5} alt="nasionko" />
          </div>
          <div className="Slide">
            <img src={dandelion6} alt="nasionko" />
          </div>
        </Carousel>
      );
    }
  }
}

export default PlantCarousel;
