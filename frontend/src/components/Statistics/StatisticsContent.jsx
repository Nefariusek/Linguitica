import React, { Component } from 'react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import CanvasJSReact from './canvasjs.react';
import Store from '../../Store';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StatisticsContent extends Component {
  state = {
    statistics_ID: null,
    plantID: '',
    words_learned: '',
    words_learned_weekly: [],
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
        let new_arr = [];
        var i;
        for (i = 0; i < response.data.words_learned_weekly.length; i++) {
          let newDay = {
            label: response.data.words_learned_weekly[i].date.slice(5, 10),
            y: response.data.words_learned_weekly[i].words_learned,
          };
          new_arr.push(newDay);
        }
        console.log(response.data);
        console.log(new_arr);
        this.setState({
          words_learned: response.data.words_learned,
          tests_passed: response.data.tests_passed,
          quest_completed: response.data.quest_completed,
          streak: response.data.streak,
          learning_since: formatted_data,
          words_learned_weekly: new_arr,
        });
        console.log(this.state.words_learned_weekly);
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
    const options = {
      animationEnabled: true,
      theme: 'light2', // "light1", "light2", "dark1", "dark2"
      title: {
        text: 'Liczba nauczonych słówek w tym tygodniu',
      },
      axisY: {
        title: 'Liczba słówek',
        //labelFormatter: this.addSymbols,
        /*scaleBreaks: {
          autoCalculate: true,
        },*/
      },
      axisX: {
        title: 'Dzień',
        labelAngle: 0,
      },
      data: [
        {
          type: 'column',
          /*  dataPoints: [
            { label: '25.06', y: 10 },
            { label: '26.06', y: 3 },
            { label: '27.06', y: 0 },
            { label: '28.06', y: 8 },
            { label: '29.06', y: 1 },
            { label: '30.06', y: 3 },
            { label: '01.07', y: 9 },
          ],*/
          dataPoints: this.state.words_learned_weekly,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
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
        <br></br>
      </div>
    );
  }
}

export default StatisticsContent;
