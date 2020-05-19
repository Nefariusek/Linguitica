import React from 'react';
import { Col, Divider, Row, Layout, Breadcrumb, Button } from 'antd';
import { FileDoneOutlined, LineChartOutlined, HomeOutlined, ReadOutlined, BellOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserInformation from './UserInformation';

import Store from '../../Store';
import './HomepageContent.css';

const { Content } = Layout;
const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

class HomepageContent extends React.Component {
  static contextType = Store;

  render() {
    if (!this.context.hasPlant) {
      return (
        <div className="no-plant">
          Na początek stwórz swoją wymarzoną roślinkę.
          <br></br>
          <Button href="/plantCreation">Tworzenie rośliny</Button>
        </div>
      );
    }
    return (
      <Layout className="layout">
        <Content style={{ padding: '0' }}>
          <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
            </Breadcrumb>
          </Divider>
          <Row justify="space-between" align="middle">
            <Col span={7}>
              <DemoBox value={200}>
                <UserInformation />
              </DemoBox>
            </Col>
            <Col span={7}>
              <DemoBox value={200}>
                <Link to="/flashsets">
                  <Button block>
                    <ReadOutlined className="buttonIcon" />
                    <div className="buttonText">ZESTAWY</div>
                  </Button>
                </Link>
              </DemoBox>
              <DemoBox value={200}>
                <Link to="/profile">
                  <Button block>
                    <LineChartOutlined className="buttonIcon" />
                    <div className="buttonText">PROFIL</div>
                  </Button>
                </Link>
              </DemoBox>
            </Col>
            <Col span={7}>
              <DemoBox value={200}>
                <Link to="/quests">
                  <Button block>
                    <BellOutlined className="buttonIcon" />
                    <div className="buttonText">ZADANIA</div>
                  </Button>
                </Link>
              </DemoBox>
              <DemoBox value={200}>
                <Link to="/flashcards">
                  <Button block>
                    <FileDoneOutlined className="buttonIcon" />
                    <div className="buttonText">FISZKI</div>
                  </Button>
                </Link>
              </DemoBox>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default HomepageContent;
