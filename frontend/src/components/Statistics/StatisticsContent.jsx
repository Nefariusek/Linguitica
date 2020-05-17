import React, { Component } from 'react';
import { Layout, Row, Col, Card } from 'antd';
import rose6 from '../../images/rose/rose6.PNG';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';

class StatisticsContent extends Component {
  state = {
    statistics_ID: '5ec17864572090064000e480',
    plantID: '',
    words_learned: '5',
    quest_completed: '5',
    tests_passed: '5',
    streak: '5',
    learning_since: Date,
    from: '',
    statistics: '',
  };

  componentDidMount = async () => {
    console.log(this.context);
    //await this.getStatisticsID();
    await this.getStatistics();
    this.state.from = this.state.learning_since.slice(0, 10);
  };

  getStatisticsID = async () => {
    await axios({
      url: `/api/plants/${this.context.userProfile.plantID}`,
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
        this.setState({
          words_learned: response.data.words_learned,
          tests_passed: response.data.tests_passed,
          quest_completed: response.data.quest_completed,
          streak: response.data.streak,
          learning_since: response.data.learning_since,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  render() {
    return (
      <Layout className="flashsets-layout">
        <Row justify="space-around" gutter={50}>
          <Col span={2}>
            <Card title="twoja roślinka" style={{ width: 500, padding: 6 }}>
              <Row justify="space-around" gutter={16}>
                <img src={rose6} style={{ width: 200 }}></img>
              </Row>
              <p>Z nami od: {this.state.from}</p>
              <p></p>
            </Card>
          </Col>
          <Col span={2}>
            <Card title="nauka" style={{ width: 500, padding: 6 }}>
              <p>Streak: {this.state.streak}</p>
              <p>Liczba nauczonych słówek: {this.state.words_learned} </p>
              <p>Słówka ukończonych testów: {this.state.tests_passed}</p>
              <p>Liczba ukończonych misji: {this.state.quest_completed} </p>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default StatisticsContent;
