import React from 'react';
import { Layout, Button } from 'antd';
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

class GuestpageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };

    this.handleCLick = this.handleCLick.bind(this);
  }

  handleCLick() {
    this.setState((state) => ({
      isClicked: !state.isClicked,
    }));
  }

  render() {
    if (this.state.isClicked) return <Redirect to="/register" />;
    return (
      <Layout className="layout">
        <Content style={{ padding: '0' }}>
          <div className="site-layout-content">
            <div className="page">
              <div className="front">
                <div className="fiszki">
                  <h1>Fiszki</h1>
                </div>
              </div>
              <div className="back">
                <div className="tekst">
                  <h1>Ucz się słówek z każdej kategorii lub twórz własne zestawy fiszek </h1>
                </div>
              </div>
            </div>

            <div className="page">
              <div className="front">
                <div className="kalendarz">
                  <h1>Kalendarz</h1>
                </div>
              </div>
              <div className="back">
                <div className="tekst">
                  <h1>Stawiaj sobie nowe zadania do wykonania, my przypmonimy Ci o ich wykonaniu!</h1>
                </div>
              </div>
            </div>

            <div className="page">
              <div className="front">
                <div className="testy">
                  <h1>Testy</h1>
                </div>
              </div>
              <div className="back">
                <div className="tekst">
                  <h1> Testuj zdobytą wiedzę, zdobywaj cenne puknty i zadbaj o swoją roślinkę</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="homepageButton">
            <Button type="primary" className="joinButton" onClick={this.handleCLick}>
              DOŁĄCZ DO NAS
            </Button>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default GuestpageContent;
