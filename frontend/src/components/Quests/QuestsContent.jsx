import React, { Component } from 'react';
import './QuestsContent.css';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';
import { Statistic, Menu, message, Button, Modal, Input, Form, InputNumber, DatePicker, Select } from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Countdown } = Statistic;

class QuestsContent extends Component {
  state = {
    plantID: '5e85bd0c0fc921686c98dd1d', //tymczasowo dopoki nie naprawimy store
    questsID: [],
    quests: [],
    allQuests: [],
    isLoaded: false,
    deadline: [],
    current: 'your',
    visible: false,
    curID: '0',
    secondCurID: '0',
    priority: 0,
    description: '',
    date: '',
    goal: '',
    addedQuestID: '0',
  };

  static contextType = Store;
  componentDidMount = async () => {
    // console.log(this.context);
    await this.getQuestsID();
    let count = this.state.questsID.length;
    if (count > 0) {
      await this.getQuests(count);
      await this.getAllQuests();
      await this.setState({ isLoaded: true });
    }
  };

  getQuestsID = async () => {
    await axios({
      // url: `/api/plants/${this.context.userProfile.plant_id}`,
      url: `/api/plants/${this.state.plantID}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ questsID: response.data.quests });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getQuests = async (count) => {
    let index;
    for (index = 0; index < count; index++) {
      await axios({
        // url: `/api/plants/${this.context.userProfile.plant_id}`,
        url: `/api/quests/${this.state.questsID[index]}`,
        method: 'get',
        headers: setHeaders(),
      }).then(
        (response) => {
          this.state.quests.push(response.data);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  getAllQuests = async () => {
    const response = await fetch('/api/quests', setHeaders());
    const body = await response.json();
    let filteredBody = body;

    filteredBody = body.filter((quests) => {
      return quests.copy !== true;
    });

    await this.setState({ allQuests: filteredBody });
    console.log(this.state.allQuests);
  };
  postQuest = async () => {
    await axios({
      url: 'api/quests/',
      method: 'post',
      data: {
        status: 'failed',
        duration: this.state.allQuests[this.state.secondCurID].duration,
        description: this.state.allQuests[this.state.secondCurID].description,
        is_requrring: this.state.allQuests[this.state.secondCurID].is_requrring,
        flashset_id: this.state.allQuests[this.state.secondCurID].flashset_id,
        goal: this.state.allQuests[this.state.secondCurID].goal,
        copy: true,
      },
      headers: setHeaders(),
    }).then(
      (res) => {
        if (res.status === 200) {
          console.log(res.data._id);
          this.setState({ addedQuestID: res.data._id });
          console.log(this.state.addedQuestID);
          message.success('Quest dodany', 3);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  putQuest = async () => {
    await axios({
      url: `/api/plants/${this.state.plantID}/quests`,
      method: 'put',
      data: {
        quests: {
          _id: this.state.addedQuestID,
        },
      },
      headers: setHeaders(),
    }).then(
      (res) => {
        if (res.status === 200) {
          console.log('quest dodany do planta');
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };
  addQuest = async (e) => {
    await this.setState({
      secondCurID: e.target.value,
      questsID: [],
      quests: [],
    });
    await this.postQuest();
    await this.putQuest();
    // await this.setState({ isLoaded: false });

    await this.getQuestsID();
    let count = this.state.questsID.length;
    if (count > 0) {
      await this.getQuests(count);
      await this.setState({ isLoaded: true });
    }
  };
  handleChange = async (e) => {
    const { value, name } = e.target;
    await this.setState({ [name]: value });
  };

  handleMenuClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  showModal = async (e) => {
    await this.setState({
      curID: e.target.value,
    });
    await this.setState({
      visible: true,
    });
  };
  showModalAll = async (e) => {
    await this.setState({
      secondCurID: e.target.value,
    });
    await this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChangeDate = (value, dateString) => {
    this.setState({ date: dateString });
  };
  onChangePriority = async (value) => {
    await this.setState({ priority: value });
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  cancelButton = async (e) => {
    await this.setState({
      curID: e.target.value,
    });
    var moment = require('moment'); // require
    var mom = moment().format();
    await axios({
      url: `/api/quests/${this.state.quests[this.state.curID]._id}/status`,
      method: 'put',
      headers: setHeaders(),
      data: {
        status: 'failed',
        finish_date: mom,
      },
    }).then(
      (res) => {},
      (error) => {
        console.log(error);
      },
    );
    await this.reload();
  };

  startButton = async (e) => {
    await this.setState({
      curID: e.target.value,
    });
    var moment = require('moment'); // require
    var mom = moment().add(this.state.quests[this.state.curID].duration, 'day').format();
    await axios({
      url: `/api/quests/${this.state.quests[this.state.curID]._id}/status`,
      method: 'put',
      headers: setHeaders(),
      data: {
        status: 'in_progress',
        finish_date: mom,
      },
    }).then(
      (res) => {},
      (error) => {
        console.log(error);
      },
    );
    await this.reload();
  };
  reload = async () => {
    await this.setState({
      quests: [],
    });
    //await this.getQuestsID();
    let count = this.state.questsID.length;
    // if (count > 0) {
    await this.getQuests(count);
    await this.setState({ isLoaded: true });
    // }
  };
  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    return (
      <>
        <div className="nav-quests">
          <Menu onClick={this.handleMenuClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item className="nav-item-quests" key="your">
              Twoje zadania
            </Menu.Item>
            <Menu.Item className="nav-item-quests" key="all">
              Wszystkie zadania
            </Menu.Item>

            <Menu.Item className="nav-item-quests" key="new">
              <PlusOutlined />
              Dodaj nowe zadanie
            </Menu.Item>
          </Menu>
        </div>

        <div>
          {(this.state.current === 'your' && (
            <div className="container-all">
              <div>
                {this.state.isLoaded ? (
                  this.state.quests.map((val, key) => (
                    <div className="quest-all" key={key}>
                      <h2>opis</h2>
                      <div className="quest-description"> {val.description}</div>
                      <div className="quest-attributes">
                        Długość: {val.duration}dni Priorytet: {val.priority} Cel: {val.goal}
                      </div>
                      <div className="quest-info-button">
                        <Button value={key} style={{ height: '7vh', borderRadius: '1000px' }} onClick={this.showModal}>
                          INFO
                        </Button>
                      </div>
                      {(val.status === 'in_progress' && (
                        <div>
                          <div className="quest-info-button">
                            <Button
                              value={key}
                              style={{ height: '7vh', borderRadius: '1000px' }}
                              onClick={this.cancelButton}
                            >
                              ANULUJ
                            </Button>
                          </div>
                          <div className="quest-countdown">
                            {' '}
                            <Countdown title="Pozostały czas:" value={val.finish_date} format="D dni HH:mm:ss" />{' '}
                          </div>
                        </div>
                      )) ||
                        (val.status === 'failed' && (
                          <>
                            <div className="quest-info-button">
                              <Button
                                value={key}
                                style={{ height: '7vh', borderRadius: '1000px' }}
                                onClick={this.startButton}
                              >
                                ROZPOCZNIJ
                              </Button>
                            </div>
                            <div className="quest-countdown">
                              <Countdown title="Pozostały czas:" value={val.finish_date} format="D dni HH:mm:ss" />
                            </div>
                          </>
                        )) || <div>Ukonczyles questa</div>}

                      <Modal
                        key={val.key}
                        title="Szczegółowe informacje"
                        visible={this.state.visible}
                        onOk={this.handleCancel}
                        onCancel={this.handleCancel}
                      >
                        <p>
                          <h3>Opis:</h3>
                          {this.state.quests[this.state.curID].description}
                        </p>
                        <p>
                          <h3>Cel:</h3>
                          {this.state.quests[this.state.curID].goal}
                        </p>
                        <p>
                          <h3>Priorytet:</h3>
                          {this.state.quests[this.state.curID].priority}
                        </p>
                        <p>
                          <h3>Kategoria:</h3>
                          {this.state.quests[this.state.curID].category}
                        </p>
                        <p>
                          <h3>Data zakończenia:</h3>
                          {this.state.quests[this.state.curID].finish_date.slice(0, 10)}
                        </p>
                        <p>
                          <h3>Godzina zakończenia:</h3>
                          {this.state.quests[this.state.curID].finish_date.slice(11, 19)}
                        </p>
                      </Modal>
                    </div>
                  ))
                ) : (
                  <LoadingOutlined />
                )}
              </div>
            </div>
          )) ||
            (this.state.current === 'all' && (
              <div className="container-all">
                <div>
                  {this.state.isLoaded ? (
                    this.state.allQuests.map((val, key) => (
                      <div className="quest-all" key={key}>
                        <h2>opis</h2>
                        <div className="quest-description"> {val.description}</div>
                        <div className="quest-attributes">
                          Czas trwania: {val.duration}dni Priorytet: {val.priority} Cel: {val.goal}
                        </div>
                        <div className="quest-info-button">
                          <Button
                            value={key}
                            style={{ height: '7vh', borderRadius: '1000px' }}
                            onClick={this.showModalAll}
                          >
                            INFORMACJE
                          </Button>
                          <Button value={key} style={{ height: '7vh', borderRadius: '1000px' }} onClick={this.addQuest}>
                            DODAJ DO MOJEJ LISTY
                          </Button>
                        </div>

                        <Modal
                          key={val.key}
                          title="Szczegółowe informacje"
                          visible={this.state.visible}
                          onOk={this.handleCancel}
                          onCancel={this.handleCancel}
                        >
                          <p>
                            <h3>Opis:</h3>
                            {this.state.allQuests[this.state.secondCurID].description}
                          </p>
                          <p>
                            <h3>Cel:</h3>
                            {this.state.allQuests[this.state.secondCurID].goal}
                          </p>
                          <p>
                            <h3>Priorytet:</h3>
                            {this.state.allQuests[this.state.secondCurID].priority}
                          </p>
                          <p>
                            <h3>Kategoria:</h3>
                            {this.state.allQuests[this.state.secondCurID].category}
                          </p>
                          <p>
                            <h3>Czas trwania:</h3>
                            {this.state.allQuests[this.state.secondCurID].duration}dni
                          </p>
                        </Modal>
                      </div>
                    ))
                  ) : (
                    <LoadingOutlined />
                  )}
                </div>
              </div>
            )) ||
            (this.state.current === 'new' && (
              <div className="container-all">
                <div className="quest-add">
                  <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={this.onFinish}
                    validateMessages={this.validateMessages}
                  >
                    <Form.Item label="Cel" rules={[{ required: true }]}>
                      <Input name="goal" value={this.state.goal} onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item name={'flashset_id'} label="Zestaw(y)">
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Wybierz zestawy do których chcesz przypisać zadanie"
                        onChange={this.handleChange}
                      ></Select>
                    </Form.Item>
                    <Form.Item label="Priorytet" rules={[{ type: 'number', min: 0, max: 5 }]}>
                      <InputNumber name="priority" value={this.state.priority} onChange={this.onChangePriority} />
                    </Form.Item>
                    <Form.Item label="Data">
                      <DatePicker showTime onChange={this.onChangeDate} name="date" />
                    </Form.Item>
                    <Form.Item label="Opis">
                      <Input.TextArea
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                      <Button type="primary" htmlType="submit" style={{ width: '15vw', position: 'flex' }}>
                        Dodaj
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            )) || <div className="container-all">default</div>}
        </div>
      </>
    );
  }
}

export default QuestsContent;
