import React, { Component } from 'react';
import './QuestsContent.css';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';
import { Statistic, Menu, message, Button, Modal, Calendar, Badge, Input, Form, InputNumber } from 'antd';

import { ScheduleOutlined, CalendarOutlined, TrophyOutlined, BellOutlined } from '@ant-design/icons';
const { Countdown } = Statistic;

class QuestsContent extends Component {
  state = {
    plantID: '5e85bd0c0fc921686c98dd1d', //tymczasowo dopoki nie naprawimy store
    questsID: [],
    quests: [],
    allQuests: [],
    isLoaded: false,
    isLoaded2: false,
    isLoaded3: false,
    hasQuests: false,
    deadline: [],
    current: 'your',
    visible: false,
    curID: '0',
    secondCurID: '0',
    priority: 0,
    description: '',
    goal: '',
    addedQuestID: '0',
    dates: [],
    date: 0,
    curEvent: '',
  };

  static contextType = Store;
  componentDidMount = async () => {
    console.log(this.context);

    await this.getQuestsID();

    let count = this.state.questsID.length;

    if (count > 0) {
      await this.getQuests(count);
      await this.setState({ isLoaded: true });

      await this.getListOfData();
      await this.setState({ isLoaded3: true });
    }
    await this.getAllQuests();
    await this.setState({ isLoaded2: true });
  };

  getQuestsID = async () => {
    await axios({
      url: `/api/plants/${this.context.userProfile.plant_id}`,
      // url: `/api/plants/${this.state.plantID}`,
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
      url: `/api/plants/${this.context.userProfile.plant_id}/quests`,
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

    await this.getQuestsID();
    let count = this.state.questsID.length;
    if (count > 0) {
      await this.getQuests(count);
      await this.setState({ isLoaded: true });
    }
  };
  addQuestAndStart = async (e) => {
    await this.setState({
      secondCurID: e.target.value,
      questsID: [],
      quests: [],
    });
    await this.postQuestAndStart();
    await this.putQuest();

    await this.getQuestsID();
    let count = this.state.questsID.length;
    if (count > 0) {
      await this.getQuests(count);
      await this.setState({ isLoaded: true });
    }
  };
  postQuestAndStart = async () => {
    var moment = require('moment'); // require
    await axios({
      url: 'api/quests/',
      method: 'post',
      data: {
        status: 'in_progress',
        duration: this.state.allQuests[this.state.secondCurID].duration,
        description: this.state.allQuests[this.state.secondCurID].description,
        is_requrring: this.state.allQuests[this.state.secondCurID].is_requrring,
        flashset_id: this.state.allQuests[this.state.secondCurID].flashset_id,
        goal: this.state.allQuests[this.state.secondCurID].goal,
        finish_date: moment().add(this.state.allQuests[this.state.secondCurID].duration, 'day').format(),
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
  getListOfData = async () => {
    for (let i = 0; i < this.state.quests.length; i++) {
      await this.state.dates.push({
        finish_date: this.state.quests[i].finish_date,
        type:
          (this.state.quests[i].status === 'in_progress' && 'warning') ||
          (this.state.quests[i].status === 'completed' && 'success') ||
          (this.state.quests[i].status === 'failed' && 'error'),
        description: this.state.quests[i].description,
      });
    }
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
      dates: [],
    });
    let count = this.state.questsID.length;
    await this.getQuests(count);
    await this.getListOfData();
    await this.setState({ isLoaded: true });
    await this.setState({ isLoaded3: true });
  };
  getListData = (value) => {
    let listData;

    if (this.state.dates.length > 0) {
      for (let i = 0; i < this.state.dates.length; i++) {
        if (
          value.date() === parseInt(this.state.dates[i].finish_date.slice(8, 10), 10) &&
          value.month() === parseInt(this.state.dates[i].finish_date.slice(5, 7) - 1, 10)
        ) {
          listData = [
            {
              type: this.state.dates[i].type,
              content: this.state.dates[i].description,
            },
          ];
        }
      }
      return listData || [];
    }
  };

  dateCellRender = (value) => {
    var listData = this.getListData(value);
    console.log(listData);

    return listData ? (
      <div>
        {listData.map((item) => (
          <Badge status={item.type} text={item.content} />
        ))}
      </div>
    ) : null;
  };
  onFinish = async () => {
    if (this.state.description !== '' && this.state.priority !== 0 && this.state.date !== 0 && this.state.goal !== '') {
      await this.addMyQuest();
      await this.putQuest();
      await this.getQuestsID();
      let count = this.state.questsID.length;
      if (count > 0) {
        await this.getQuests(count);
        await this.setState({ isLoaded: true });
      }
      await this.setState({ description: '', priority: 0, date: 0, goal: '' });
    } else message.error('Proszę wypełnić wszystkie pola!', 3);
  };

  addMyQuest = async () => {
    var moment = require('moment'); // require
    var mom = moment().format();

    await axios({
      url: 'api/quests/',
      method: 'post',
      data: {
        status: 'failed',
        duration: this.state.date,
        description: this.state.description,
        priority: this.state.priority,
        goal: this.state.goal,
        finish_date: mom,
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
  onChangePriority = async (value) => {
    await this.setState({ priority: value });
  };
  onChangeData = async (value) => {
    await this.setState({ date: value });
  };
  handleChange = async (e) => {
    const { value, name } = e.target;
    await this.setState({ [name]: value });
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
              Dodaj zadanie
            </Menu.Item>
            <Menu.Item className="nav-item-quests" key="schedule">
              <ScheduleOutlined />
              Harmonogram
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
                      <div className="quest-description">
                        {' '}
                        {val.description} <h3>twój cel</h3> {val.goal}
                      </div>
                      <div className="quest-attributes">
                        <div className="quest-single-attribute-1">
                          {' '}
                          Długość: {val.duration}dni <CalendarOutlined />{' '}
                        </div>{' '}
                        <div className="quest-single-attribute-2">
                          Priorytet: {val.priority}
                          <BellOutlined />{' '}
                        </div>
                        <div className="quest-single-attribute-3">
                          Doświadczenie:
                          <TrophyOutlined />{' '}
                        </div>
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
                        )) || (
                          <div className="quest-completed">
                            <h1>Zadanie ukończone!</h1>
                          </div>
                        )}

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
                ) : this.state.hasQuests ? (
                  <div className="no-quests">Ładowanie zadań...</div>
                ) : (
                  <div className="no-quests">Wybierz zadanie z dostępnej listy i sprawdź się!</div>
                )}
              </div>
            </div>
          )) ||
            (this.state.current === 'all' && (
              <div className="container-all">
                <div>
                  {this.state.isLoaded2 ? (
                    this.state.allQuests.map((val, key) => (
                      <div className="quest-all" key={key}>
                        <h2>opis</h2>
                        <div className="quest-description">
                          {' '}
                          {val.description}
                          <h3>cel zadania</h3> {val.goal}
                        </div>
                        <div className="quest-attributes">
                          <div className="quest-single-attribute-1">
                            {' '}
                            Długość: {val.duration}dni <CalendarOutlined />{' '}
                          </div>{' '}
                          <div className="quest-single-attribute-2">
                            Priorytet: {val.priority}
                            <BellOutlined />{' '}
                          </div>
                          <div className="quest-single-attribute-3">
                            Doświadczenie:
                            <TrophyOutlined />{' '}
                          </div>
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
                          <Button
                            value={key}
                            style={{ height: '7vh', borderRadius: '1000px' }}
                            onClick={this.addQuestAndStart}
                          >
                            ROZPOCZNIJ ZADANIE
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
                    <div className="no-quests">Ładowanie zadań...</div>
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

                    <Form.Item label="Priorytet" rules={[{ type: 'number', min: 0, max: 5 }]}>
                      <InputNumber name="priority" value={this.state.priority} onChange={this.onChangePriority} />
                    </Form.Item>
                    <Form.Item label="Długość" rules={[{ type: 'number', min: 0, max: 10 }]}>
                      <InputNumber name="date" value={this.state.date} onChange={this.onChangeData} />
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
            )) ||
            (this.state.current === 'schedule' &&
              (this.state.isLoaded3 ? (
                <div className="container-schedule">
                  <Calendar dateCellRender={this.dateCellRender} />
                </div>
              ) : (
                <div className="container-schedule">
                  sialala
                  <Calendar />
                </div>
              ))) || <div className="container-all">default</div>}
        </div>
      </>
    );
  }
}

export default QuestsContent;
