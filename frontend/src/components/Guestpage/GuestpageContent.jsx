import React from 'react';
import { Layout, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import studyTime from './../../images/studyTime.png';

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
          <div className="startpage">
            <div className="introduction">
              <div className="intro-text">
                <h1> Tutaj bedzie Mądre hasło1 </h1>
                <p>A tu Madre hasło 2</p>
              </div>
              <div buttons>
                <Button className="btn-start" onClick={this.handleCLick}>
                  DOŁĄCZ DO NAS
                </Button>
                <Button className="btn-more">POZNAJ NAS</Button>
              </div>
            </div>
            <div className="start-cover">
              <img src={studyTime} />
            </div>
          </div>

          <div className="site-layout-content">
            <div className="blocks-title">
              <h1>Sprawdź, co dla Ciebie przygotowaliśmy!</h1>
            </div>
            <div className="blocks">
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
            </div>
            <div className="homepageButton">
              <Button className="btn-join" onClick={this.handleCLick}>
                DOŁĄCZ DO NAS
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default GuestpageContent;
