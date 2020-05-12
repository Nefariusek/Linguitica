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
    isLoaded: false,
    deadline: [],
    current: 'all',
    visible: false,
    curID: '0',
    priority: 0,
    description: '',
    date: '',
    goal: '',
  };

  static contextType = Store;
  componentDidMount = async () => {
    // console.log(this.context);
    await this.getQuestsID();
    let count = this.state.questsID.length;
    if (count > 0) {
      await this.getQuests(count);
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

  postQuest = async () => {
    await axios({
      url: 'api/quests/',
      method: 'post',
      data: {
        status: 'failed',
        description: 'bardzo wazny quest',
        goal: 'goal goal goal',
        flashset_id: ['5e85bd0c0fc921686c98dd0a', '5e85bd0c0fc921686c98dd0b'],
      },
      headers: setHeaders(),
    }).then(
      (res) => {
        if (res.status === 200) {
          console.log('Dodano quest');
          message.success('Quest created', 3);
        }
      },
      (err) => {
        console.log(err);
      },
    );
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

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onFinish = async () => {
    await console.log(this.state.name);
    await console.log(this.state.description);
    await console.log(this.state.priority);
    await console.log(this.state.date);
    await console.log(this.state.goal);
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
  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    return (
      <>
        <div className="nav-quests">
          <Menu onClick={this.handleMenuClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item className="nav-item-quests" key="all">
              Wszystkie zadania
            </Menu.Item>
            <Menu.Item className="nav-item-quests" key="finished">
              Ukończone
            </Menu.Item>
            <Menu.Item className="nav-item-quests" key="current">
              Trwające
            </Menu.Item>

            <Menu.Item className="nav-item-quests" key="new">
              <PlusOutlined />
              Dodaj nowe zadanie
            </Menu.Item>
          </Menu>
        </div>

        <div>
          {(this.state.current === 'all' && (
            <div className="container-all">
              <div>
                {this.state.isLoaded ? (
                  this.state.quests.map((val, key) => (
                    <div className="quest-all" key={key}>
                      <h2>opis</h2>
                      <div className="quest-description"> {val.description}</div>
                      <div className="quest-attributes">
                        Duration: {val.duration} Priority: {val.priority} Goal: {val.goal}
                      </div>
                      <div className="quest-info-button">
                        <Button value={key} style={{ height: '7vh', borderRadius: '1000px' }} onClick={this.showModal}>
                          INFO
                        </Button>
                      </div>
                      <div className="quest-countdown">
                        {' '}
                        <Countdown title="Pozostały czas:" value={val.finish_date} format="D dni HH:mm:ss" />{' '}
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
            (this.state.current === 'finished' && <div className="container-all">zakonczone</div>) ||
            (this.state.current === 'current' && <div className="container-all">Trwające</div>) ||
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
