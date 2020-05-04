import React, { Component } from 'react';
import CardsContent from './CardsContent';
import { Layout, Menu, Empty, Button, Badge } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import FlashsetCreate from './FlashsetCreate';
import FlashsetDelete from './FlashsetDelete';
import CardsCreate from './CardsCreate';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';
//import { LoadingOutlined } from '@ant-design/icons';
//const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'black' }} spin />;

const { Header, Content, Sider } = Layout;

class FlashsetsContent extends Component {
  state = {
    flashsets: [],
    currentTitle: '',
    userID: '',
    plantID: '',
    questID: '',
    flashsetsID: [],
    currentFlashsetID: '',
    temp: false,
    temp2: false,
    temp3: true,
    created: false,
    counter: 0,
  };
  static contextType = Store;

  componentDidMount = async () => {
    //getting user ID from localstorage
    let ID = localStorage.getItem('id');
    await this.setState({ userID: ID });
    // console.log('ID uzytkownika: ', this.state.userID);

    //getting plantID
    await this.getPlantID();

    //getting flashsetsID
    await this.getFlashsetsID();
    //console.log('ID flashsetow: ', this.state.flashsetsID);

    this.setState({
      currentFlashsetID: this.state.flashsetsID[0],
    });

    let count = this.state.flashsetsID.length;

    //console.log(count);
    if (count > 0) {
      await this.setState({ temp3: false });
      await this.getFlashsets(count);
      // console.log(this.state.flashsets);
      await this.changeTemp(count);
    }
  };

  getPlantID = async () => {
    await axios({
      url: `/api/users/${this.state.userID}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ plantID: response.data.plant_id[0] });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getFlashsetsID = async () => {
    await axios({
      url: `/api/plants/${this.state.plantID}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ flashsetsID: response.data.flashsets });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  //getting flashsets
  getFlashsets = async (count) => {
    let index;
    for (index = 0; index < count; index++) {
      await axios({
        url: `/api/flashsets/${this.state.flashsetsID[index]}`,
        method: 'get',
        headers: setHeaders(),
      }).then(
        (response) => {
          this.state.flashsets.push(response.data);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };
  myCallback = async (dataFromChild) => {
    await this.setState({ created: dataFromChild });

    if (this.state.created === true) {
      this.setState({ temp2: false });
      setTimeout(this.setState({ temp2: true }), 100);
    }
  };

  myCallbackCounter = async (dataFromChild) => {
    await this.setState({ counter: dataFromChild });
  };

  changeTemp = async () => {
    await this.setState({ temp: true });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleClick = async (e) => {
    await this.setState({
      temp2: false,
      currentTitle: e.item.props.title,
      currentFlashsetID: e.item.props.id,
    });

    this.setState({ temp2: true, counter: 0 });
  };
  render() {
    return (
      <Layout className="flashsets-layout">
        <Sider
          className="sider-flashsets"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo-flashsets">Twoje zestawy:</div>

          <Menu
            theme="dark"
            mode="inline"
            //defaultSelectedKeys={['0']}
            className="menu-flashsets"
            onClick={this.handleClick}
          >
            {this.state.temp ? (
              this.state.flashsets.map((val, keyy) => (
                <Menu.Item key={keyy} className="menuitem-flashsets" title={val.title} id={val._id}>
                  <FileOutlined />
                  <span className="nav-text">{val.title}</span>
                </Menu.Item>
              ))
            ) : this.state.temp3 ? (
              <h2 style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>Brak zestawow</h2>
            ) : (
              <h2 style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>Ładowanie...</h2>
            )}
          </Menu>
          <FlashsetCreate plantID={this.state.plantID} />
          <FlashsetDelete id={this.state.flashsets} />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            {this.state.currentTitle}

            {this.state.temp2 ? (
              <CardsCreate
                callbackFromParent={this.myCallback}
                temp={this.state.temp2}
                flashsetID={this.state.currentFlashsetID}
              />
            ) : (
              <Button
                onClick={this.handleOpen}
                style={{
                  float: 'left',
                  height: 52,
                  margin: 6,
                  width: 235,
                  background: '#fff',
                  border: 'solid 1px red',
                }}
                disabled
              >
                DODAJ NOWĄ FISZKĘ
              </Button>
            )}
          </Header>

          <Content style={{ margin: '24px 16px 0' }} className="content-flashcards">
            <div className="site-layout-background" style={{ padding: 24 }}>
              {this.state.temp2 ? (
                <CardsContent id={this.state.currentFlashsetID} callbackFromParent={this.myCallbackCounter} />
              ) : (
                <Empty description={false} image={false}>
                  <div style={{ fontSize: 30 }}>
                    Utwórz nowy zestaw lub wybierz istniejący z listy po lewej stronie!
                  </div>
                </Empty>
              )}
            </div>
            {this.state.counter > 0 ? (
              <div className="learn-flashsets">
                <Badge count={this.state.counter} overflowCount={99}>
                  <Button className="learn-button-flashsets" shape="round" size="large">
                    NAUKA
                  </Button>
                </Badge>
              </div>
            ) : (
              <div className="learn-flashsets-none">
                <Badge count={this.state.counter} overflowCount={99}>
                  <Button className="learn-button-flashsets" shape="round" size="large">
                    NAUKA
                  </Button>
                </Badge>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default FlashsetsContent;
