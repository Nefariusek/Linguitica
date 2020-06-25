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
        <div className="StatsLine">
          <div className="Left"> Z nami od: </div>
          <div className="Right">{this.state.learning_since}</div>
        </div>
        <br></br>
        <div className="StatsLine">
          <div className="Left">Streak: </div>
          <div className="Right">{this.state.streak}</div>
        </div>
        <br></br>
        <div className="StatsLine">
          <div className="Left">Nauczone słówka: </div>
          <div className="Right">{this.state.words_learned}</div>
        </div>
        <br></br>
        <div className="StatsLine">
          <div className="Left">Ukończone testy: </div>
          <div className="Right">{this.state.tests_passed}</div>
        </div>
        <br></br>
        <div className="StatsLine">
          <div className="Left">Ukończone zadania: </div>
          <div className="Right">{this.state.quest_completed}</div>
        </div>
      </div>
    );
  }
}

export default StatisticsContent;
