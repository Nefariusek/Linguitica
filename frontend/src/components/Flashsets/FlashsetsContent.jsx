import React, { Component } from 'react';
import CardsContent from './CardsContent';
import { Layout, Menu, Empty, Button } from 'antd';
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
    nazwa: 'tescik',
    currentTitle: '',
    userID: '',
    plantID: '',
    questID: '',
    flashsetsID: [],
    currentFlashsetID: '',
    temp: false,
    temp2: false,
    infoText: 'Ładowanie...',
  };
  static contextType = Store;

  componentDidMount = async () => {
    //getting user ID from localstorage
    let ID = localStorage.getItem('id');
    await this.setState({ userID: ID });
    console.log('ID uzytkownika: ', this.state.userID);

    //getting plantID
    await this.getPlantID();
    console.log('ID plantsa: ', this.state.plantID);

    //getting questID
    //await this.getQuestID();
    //console.log('ID questa: ', this.state.questID);

    //getting flashsetsID
    await this.getFlashsetsID();
    console.log('ID flashsetow: ', this.state.flashsetsID);

    this.setState({
      currentFlashsetID: this.state.flashsetsID[0],
    });

    let count = this.state.flashsetsID.length;

    console.log(count);

    await this.getFlashsets(count);
    console.log(this.state.flashsets);
    // this.setState({ temp: true });

    // setTimeout(this.changeTemp, 200);
    await this.changeTemp();
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

  /*
  getQuestID = async () => {
    await axios({
      url: `/api/plants/${this.state.plantID}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ questID: response.data.quests[0] });
      },
      (error) => {
        console.log(error);
      },
    );
  };
*/
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
      // const response = await fetch(`/api/flashsets/${this.state.flashsetsID[index]}`, setHeaders());
      //const body = await response.json();
      //this.setState({ flashsets: body });
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
      //  this.state.flashsets.push(response.data);
    }
  };

  changeTemp = async () => {
    await this.setState({ temp: true });
  };

  componentDidUpdate = () => {
    //let count = this.state.flashsetsID.length;
    //this.getFlashsets(count);
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleClick = async (e) => {
    //console.log('click ', e);
    //console.log(e.item.props.title);

    //console.log(e.item.props.id);
    await this.setState({
      temp2: false,
      currentTitle: e.item.props.title,
      currentFlashsetID: e.item.props.id,
    });

    this.setState({ temp2: true });
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
            ) : (
              <h2 style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>{this.state.infoText}</h2>
            )}
          </Menu>
          <FlashsetCreate />
          <FlashsetDelete id={this.state.flashsets} />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            {this.state.currentTitle}

            {this.state.temp2 ? (
              <CardsCreate temp={this.state.temp2} />
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
                <CardsContent id={this.state.currentFlashsetID} />
              ) : (
                <Empty description={false} image={false}>
                  <div style={{ fontSize: 30 }}>
                    Utwórz nowy zestaw lub wybierz istniejący z listy po lewej stronie!
                  </div>
                </Empty>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default FlashsetsContent;
