import React, { Component } from 'react';
import { Carousel, Button, Input, Radio, message } from 'antd';
import axios from 'axios';

import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

import './PlantCreationContent.css';

class PlantCreationContent extends Component {
  state = {
    name: '',
    species: 'Bonsai',
    _id: null,
    statistics_id: '5eb0a90442688a21ecd19507',
  };

  static contextType = Store;

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
    await this.postPlant();
    await this.putPlantId();
  };

  handleInputChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleRadioChange = (e) => {
    this.setState({ species: e.target.value });
  };

  render() {
    return (
      <div className="Wrapper">
        <div className="PlantTitle">
          <h3>{this.state.species}</h3>
          <h3>{this.state.name}</h3>
        </div>
        <div className="PlantImage">
          <Carousel>
            <div className="Slide">1</div>
            <div className="Slide">2</div>
            <div className="Slide">3</div>
            <div className="Slide">4</div>
            <div className="Slide">5</div>
          </Carousel>
        </div>
        <div className="PlantInfo">Informacje</div>
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
