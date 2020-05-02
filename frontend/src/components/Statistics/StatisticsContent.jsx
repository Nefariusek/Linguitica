import React, { Component } from 'react';
import { Layout, Row, Col, Card, Avatar } from 'antd';
import rose6 from '../../images/rose6.PNG';

class StatisticsContent extends Component {
  render() {
    return (
      <Layout className="flashsets-layout">
        <Row justify="space-around" gutter={50}>
          <Col span={3}>
            <Card title="twoja roślinka" style={{ width: 400, padding: 6 }}>
              <Row justify="space-around" gutter={16}>
                <img src={rose6} style={{ width: 200 }}></img>
              </Row>
              <p>Czas życia: 16 dni</p>
              <p></p>
            </Card>
          </Col>
          <Col span={3}>
            <Card title="nauka" style={{ width: 400, padding: 6 }}>
              <p>Liczba nauczonych słówek: 56 </p>
              <p>Słówka nauczone dzisiaj: 6</p>
              <p>Liczba ukończonych misji: 78 </p>
            </Card>
          </Col>
          <Col span={3}>
            <Card title="bitwy" style={{ width: 400, padding: 6 }}>
              <p>Liczba wygranych bitw:</p>
              <p>
                <strong>value</strong>
              </p>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default StatisticsContent;
