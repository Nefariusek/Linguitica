import React from 'react';
import { Redirect } from 'react-router-dom';
import { Col, Divider, Row, Layout, Breadcrumb, Button } from 'antd';
import { FileDoneOutlined, LineChartOutlined, HomeOutlined, ReadOutlined, BellOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserInformation from './UserInformation';

import Store from '../../Store';

const { Content } = Layout;
const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

class HomepageContent extends React.Component {
  static contextType = Store;

  render() {
    if (!this.context.hasPlant) {
      return <div>Placeholder</div>;
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
                    <div className="buttonText">NAUKA</div>
                  </Button>
                </Link>
              </DemoBox>
              <DemoBox value={200}>
                <Link to="/statistics">
                  <Button block>
                    <LineChartOutlined className="buttonIcon" />
                    <div className="buttonText">STATYSTYKI</div>
                  </Button>
                </Link>
              </DemoBox>
            </Col>
            <Col span={7}>
              <DemoBox value={200}>
                <Link to="/flashsets">
                  <Button block>
                    <BellOutlined className="buttonIcon" />
                    <div className="buttonText">KALENDARZ</div>
                  </Button>
                </Link>
              </DemoBox>
              <DemoBox value={200}>
                <Link to="/flashsets">
                  <Button block>
                    <FileDoneOutlined className="buttonIcon" />
                    <div className="buttonText">TESTY</div>
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
