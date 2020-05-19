import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';

import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import ProgressBar from './ProgressBar';
import './ProfileContent.css';

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

const plantStages = {
  first: {
    bonsai: bonsai1,
    cactus: cactus1,
    rose: rose1,
    dandelion: dandelion1,
  },
  second: {
    bonsai: bonsai2,
    cactus: cactus2,
    rose: rose2,
    dandelion: dandelion2,
  },
  third: {
    bonsai: bonsai3,
    cactus: cactus3,
    rose: rose3,
    dandelion: dandelion3,
  },
  fourth: {
    bonsai: bonsai4,
    cactus: cactus4,
    rose: rose4,
    dandelion: dandelion4,
  },
  fifth: {
    bonsai: bonsai5,
    cactus: cactus5,
    rose: rose5,
    dandelion: dandelion5,
  },
  sixth: {
    bonsai: bonsai6,
    cactus: cactus6,
    rose: rose6,
    dandelion: dandelion6,
  },
};

class ProfileContent extends Component {
  state = {
    plantName: '',
    species: '',
    level: 0,
    health: 0,
    max_health: 0,
    toughness: 0,
    charmingness: 0,
    irrigation_points: 0,
    irrigation_required: 0,
    stage: 'first',
  };

  static contextType = Store;

  getPlant = async () => {
    await axios({
      url: `api/plants/${this.context.userProfile.plant_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({
          plantName: res.data.name,
          species: res.data.species,
          level: res.data.level,
          health: res.data.health,
          max_health: res.data.max_health,
          toughness: res.data.toughness,
          charmingness: res.data.charmingness,
          irrigation_points: res.data.irrigation_points,
          irrigation_required: res.data.irrigation_required,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  setPlantStage = () => {
    if (this.state.level < 5) {
      this.setState({ stage: 'first' });
    } else if (this.state.level >= 5 && this.state.level < 10) {
      this.setState({ stage: 'second' });
    } else if (this.state.level >= 10 && this.state.level < 15) {
      this.setState({ stage: 'third' });
    } else if (this.state.level >= 15 && this.state.level < 20) {
      this.setState({ stage: 'fourth' });
    } else if (this.state.level >= 20 && this.state.level < 25) {
      this.setState({ stage: 'fifth' });
    } else if (this.state.level >= 25 && this.state.level < 30) {
      this.setState({ stage: 'sixth' });
    }
  };

  componentDidMount = async () => {
    await this.getPlant();
    await this.setPlantStage();
  };

  render() {
    if (!this.context.hasPlant) {
      return (
        <div className="no-plant">
          Na początek stwórz swoją wymarzoną roślinkę.
          <br></br>
          <Button href="/plantCreation">Tworzenie rośliny</Button>
        </div>
      );
    }
    return (
      <div className="Wrapper">
        <div className="ProfilePlantImage">
          <img src={plantStages[this.state.stage].bonsai} alt="bonsai" />
        </div>
        <div className="ProgressBars">
          <ProgressBar current={this.state.health} maximum={this.state.max_health} />
          HP: {this.state.health}/{this.state.max_health}
          <ProgressBar current={this.state.irrigation_points} maximum={this.state.irrigation_required} />
          Irrigation: {this.state.irrigation_points}/{this.state.irrigation_required}
        </div>
        <div className="PlantStats">
          <h3>Nazwa: {this.state.plantName}</h3>
          <h3>Poziom: {this.state.level}</h3>
          <h3>Wytrzymałość: {this.state.toughness}</h3>
          <h3>Urokliwość: {this.state.charmingness}</h3>
        </div>
      </div>
    );
  }
}

export default ProfileContent;
