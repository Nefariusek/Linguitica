import React, { Component } from 'react';
import { Carousel, Button, Input, Radio } from 'antd';

import Store from '../../Store';
import './PlantCreationContent.css';

class PlantCreationContent extends Component {
  state = {
    name: '',
    species: 'Bonsai',
  };

  static contextType = Store;

  putPlantId = async () => {};

  postPlant = async () => {};

  handleSubmitClick = async (e) => {};

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
          <Button>Submit</Button>
        </div>
      </div>
    );
  }
}

export default PlantCreationContent;
