import React, { Component } from 'react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';

import Store from '../../Store';

class StatisticsContent extends Component {
  state = {
    statistics_ID: null,
    plantID: '',
    words_learned: '',
    quest_completed: '',
    tests_passed: '',
    streak: '',
    learning_since: null,
    statistics: '',
  };
  static contextType = Store;

  getStatisticsID = async () => {
    await axios({
      url: `/api/plants/${this.context.userProfile.plant_id}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ statistics_ID: response.data.statistics_id });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getStatistics = async () => {
    await axios({
      url: `/api/statistics/${this.state.statistics_ID}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        let formatted_data = response.data.learning_since.slice(0, 10);
        console.log(response.data);
        this.setState({
          words_learned: response.data.words_learned,
          tests_passed: response.data.tests_passed,
          quest_completed: response.data.quest_completed,
          streak: response.data.streak,
          learning_since: formatted_data,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  componentDidMount = async () => {
    console.log(this.context);
    await this.getStatisticsID();
    await this.getStatistics();
  };

  render() {
    return (
      <div>
        <h3>Z nami od: {this.state.learning_since}</h3>
        <h3>Streak: {this.state.streak}</h3>
        <h3>Liczba nauczonych słówek: {this.state.words_learned} </h3>
        <h3>Słówka ukończonych testów: {this.state.tests_passed}</h3>
        <h3>Liczba ukończonych misji: {this.state.quest_completed} </h3>
      </div>
    );
  }
}

export default StatisticsContent;
