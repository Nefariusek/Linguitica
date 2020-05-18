import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input, Radio, message } from 'antd';
import axios from 'axios';

import PlantCarousel from './PlantCarousel';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

import './PlantCreationContent.css';

const plantChosen = {
  Bonsai: {
    name: 'Bonsai',
    text: 'Roślina dla wytrwałych, wymaga regularnego podlewania. Solidne podstawy zapewnią dobre efekty przez lata.',
    stats: '+10 do wytrzymałości, +5 do urokliwości',
  },
  Cactus: {
    name: 'Kaktus',
    text: 'Podlać i zapomnieć.',
    stats: '+15 do wytrzymałości, +1 do urokliwości',
  },
  Rose: {
    name: 'Róża',
    text: 'Krucha i piękna',
    stats: '+1 do wytrzymałości, +15 do urokliwości',
  },
  Dandelion: {
    name: 'Mlecz',
    text: 'Ostatni w tym sezonie.',
    stats: '+5 do wytrzymałości, +10 do urokliwości',
  },
};

class PlantCreationContent extends Component {
  state = {
    name: '',
    species: 'Bonsai',
    _id: null,
    health: 0,
    toughness: 0,
    charmingness: 0,
    statistics_id: '5eb0a90442688a21ecd19507',
    irrigation_required: 100,
  };

  static contextType = Store;

  setStatistics = async () => {
    if (this.state.species === 'Bonsai') {
      this.setState({
        health: 50,
        toughness: 10,
        charmingness: 5,
      });
    } else if (this.state.species === 'Cactus') {
      this.setState({
        health: 40,
        toughness: 15,
        charmingness: 1,
      });
    } else if (this.state.species === 'Rose') {
      this.setState({
        health: 40,
        toughness: 1,
        charmingness: 15,
      });
    } else if (this.state.charClass === 'Dandelion') {
      this.setState({
        health: 50,
        toughness: 5,
        charmingness: 10,
      });
    }
  };

  putPlantId = async () => {
    await axios({
      url: `api/users/${this.context.userProfile._id}/plant_id`,
      method: 'PUT',
      data: {
        plant_id: this.state._id,
      },
      headers: setHeaders(),
    }).then(
      (res) => {
        if (res.status === 200) {
          console.log('ID dodane do usera');
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  postPlant = async () => {
    await axios({
      url: 'api/plants',
      method: 'POST',
      data: {
        name: this.state.name,
        species: this.state.species,
        statistics_id: this.state.statistics_id,
        health: this.state.health,
        max_health: this.state.health,
        toughness: this.state.toughness,
        charmingness: this.state.charmingness,
        irrigation_required: this.state.irrigation_required,
      },
      headers: setHeaders(),
    }).then(
      (res) => {
        if (res.status === 200) {
          this.setState({ _id: res.data._id });
          console.log('Utworzono');
          message.success('Created', 3);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  handleSubmitClick = async (e) => {
    e.preventDefault();
    await this.setStatistics();
    await this.postPlant();
    await this.putPlantId();
    this.context.changeStore('hasPlant', true);
    this.setState({ hasPlant: true });
  };

  handleInputChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleRadioChange = (e) => {
    this.setState({ species: e.target.value });
  };

  render() {
    if (this.state.hasPlant) return <Redirect to="/home" />;
    return (
      <div className="Wrapper">
        <div className="PlantTitle">
          <h3>
            {plantChosen[this.state.species].name} {this.state.name}
          </h3>
        </div>
        <div className="PlantImage">
          <PlantCarousel species={this.state.species} />
        </div>
        <div className="PlantInfo">
          <h3> {plantChosen[this.state.species].text}</h3>
          <h3> {plantChosen[this.state.species].stats}</h3>
        </div>
        <div className="PlantType">
          Gatunek:
          <Radio.Group defaultValue="Bonsai" buttonStyle="solid" onChange={this.handleRadioChange}>
            <Radio.Button value="Bonsai">Bonsai</Radio.Button>
            <Radio.Button value="Cactus">Kaktus</Radio.Button>
            <Radio.Button value="Rose">Róża</Radio.Button>
            <Radio.Button value="Dandelion">Mlecz</Radio.Button>
          </Radio.Group>
        </div>
        <div className="PlantName">
          Nazwa rośliny:
          <Input placeholder="Nazwa rośliny" onChange={this.handleInputChange} value={this.name} />
          <Button onClick={this.handleSubmitClick}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default PlantCreationContent;
