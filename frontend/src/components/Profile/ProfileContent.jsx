import React, { Component } from 'react';
import axios from 'axios';

import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import PlantImage from './PlantImage';
import ProgressBar from './ProgressBar';
import './ProfileContent.css';

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
          charmingness: res.data.toughness,
          irrigation_points: res.data.irrigation_points,
          irrigation_required: res.data.irrigation_required,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  componentDidMount = async () => {
    await this.getPlant();
  };

  render() {
    return (
      <div className="Wrapper">
        <div className="ProfilePlantImage">
          <PlantImage />
        </div>
        <div className="ProgressBars">
          <ProgressBar current={this.state.health} maximum={this.state.max_health} />
          <ProgressBar current={this.state.irrigation_points} maximum={this.state.irrigation_required} />
        </div>
        <div className="PlantStats">
          <h3>Nazwa</h3> {this.state.plantName}
          <h3>Poziom</h3>
          {this.state.level}
          <h3>Wytrzymałość</h3>
          {this.state.toughness}
          <h3>Urokliwość</h3>
          {this.state.charmingness}
        </div>
      </div>
    );
  }
}

export default ProfileContent;
