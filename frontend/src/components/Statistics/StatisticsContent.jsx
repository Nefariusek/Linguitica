import React, { Component } from 'react';
import { Layout, Row, Col, Card } from 'antd';
import rose6 from '../../images/rose6.PNG';

class StatisticsContent extends Component {
  render() {
    return (
      <Layout className="flashsets-layout">
        <Row justify="space-around" gutter={50}>
          <Col span={3}>
            <Card title="twoja roślinka" style={{ width: 400, padding: 6 }}>
              <Row justify="space-around" gutter={16}>
                <img alt="plant" src={rose6} style={{ width: 200 }}></img>
              </Row>
              <p>Czas życia: 16 dni</p>
              <p></p>
            </Card>
          </Col>
          <Col span={3}>
            <Card title="nauka" style={{ width: 400, padding: 6 }}>
              <p>
                Liczba nauczonych słówek: <strong>26</strong>
              </p>
              <p>
                Słówka nauczone dzisiaj: <strong>2</strong>
              </p>
              <p>
                Liczba ukończonych misji: <strong>3</strong>{' '}
              </p>
            </Card>
          </Col>
          <Col span={3}>
            <Card title="bitwy" style={{ width: 400, padding: 6 }}>
              <p>
                Liczba wygranych bitw: <strong>value</strong>
              </p>

              <p>
                Liczba rozegranych bitw: <strong>value</strong>
              </p>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default StatisticsContent;
