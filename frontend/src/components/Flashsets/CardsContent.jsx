import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Input, Button, Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';
class CardsContent extends Component {
  state = {
    minValue: 0,
    maxValue: 10,
    open: false,
    curID: 0,
    temp: [],
    curPolish: '',
    curGerman: '',
    curCategory: '',
    results: [],
    flashsetID: this.props.id,
    flashcards: [],
    flashsets: {},
    pol: '',
    niem: '',
    kat: '',
    selectedRowKeys: [],
    selectedFlashcards: [],
    loaded: false,
    data: [],
  };

  static contextType = Store;

  getFlashcards = async () => {
    const response = await fetch(`/api/flashsets/${this.state.flashsetID}`, setHeaders());
    const body = await response.json();
    await this.setState({ flashsets: body });

    for (let i = 0; i < this.state.flashsets.flashcards.length; i++) {
      await this.state.data.push({
        key: i,
        polish: this.state.flashsets.flashcards[i].polish,
        german: this.state.flashsets.flashcards[i].german,
        category: this.state.flashsets.flashcards[i].category,
      });
    }
    console.log('data', this.state.data);
    this.context.changeStore('setToLearn', this.state.data);
    await this.setState({ loaded: true });
  };

  componentDidMount() {
    //this.setState({ flashsetID: this.props.id });
    for (let i = 0; i < 100; i++) {
      const { temp } = this.state;
      temp[i] = false;
    }
    this.setState({ loaded: false });
    console.log(this.state.flashsetID);
    this.getFlashcards();
  }

  componentDidUpdate = async () => {};

  handleOpen = async (e) => {
    this.setState({ open: true });
    console.log(e.target.value);

    this.setState({
      curID: e.target.value,
      curPolish: this.state.flashsets.flashcards[e.target.value].polish,
      curGerman: this.state.flashsets.flashcards[e.target.value].german,
      curCategory: this.state.flashsets.flashcards[e.target.value].category,
    });
  };
  handleClose = () => {
    this.setState({ open: false, pol: '', niem: '', kat: '' });
  };

  handleDelete = async (e) => {
    const { flashcards } = this.state.flashsets;
    flashcards.splice([e.target.value], 1);
    console.log(flashcards);
    await this.setState({ flashcards });

    this.setState({ loaded: false, data: [] });

    await this.saveChanges();
    this.getFlashcards();
  };

  saveChanges = async () => {
    await axios({
      url: `/api/flashsets/${this.state.flashsetID}`,
      method: 'put',
      data: {
        flashcards: this.state.flashsets.flashcards,
      },
      headers: setHeaders(),
    }).then((res) => this.setState({ loaded: false }));
  };

  handleOk = async () => {
    const { flashcards } = this.state.flashsets;

    if (this.state.pol !== '') flashcards[this.state.curID].polish = this.state.pol;
    if (this.state.niem !== '') flashcards[this.state.curID].german = this.state.niem;
    if (this.state.kat !== '') flashcards[this.state.curID].category = this.state.kat;

    await this.setState({ flashcards });
    await this.handleClose();
    this.setState({ pol: '', niem: '', kat: '', loaded: false, data: [] });

    await this.saveChanges();
    this.getFlashcards();
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onSelectChange = async (selectedRowKeys) => {
    await this.setState({ selectedFlashcards: [] });
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });

    for (let i = 0; i < selectedRowKeys.length; i++) {
      this.state.selectedFlashcards.push(this.state.flashsets.flashcards[selectedRowKeys[i]]);
    }
    this.context.changeStore('setToLearn', this.state.selectedFlashcards);
  };
  render() {
    const columns = [
      {
        title: 'Polski',
        dataIndex: 'polish',
      },
      {
        title: 'Niemiecki',
        dataIndex: 'german',
      },
      {
        title: 'Kategoria',
        dataIndex: 'category',
      },
      {
        title: 'Opcje',
        dataIndex: 'action',
        fixed: 'false',
        render: (key, record) => (
          <Space size="middle">
            <Button className="card-icon" onClick={this.handleOpen} value={record.key}>
              <EditOutlined key="edit" />
            </Button>
            <Button className="card-icon" onClick={this.handleDelete} value={record.key}>
              <DeleteOutlined key="delete" />
            </Button>
          </Space>
        ),
      },
    ];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <>
        <div style={{ marginTop: 0 }}>
          <div style={{ marginBottom: 16, paddingTop: 0 }}>
            <Link
              to={{
                pathname: '/learning',
                flashcards: this.state.selectedFlashcards,
              }}
            >
              <Button type="primary" onClick={this.handleStart} disabled={!hasSelected} loading={loading}>
                Nauka
              </Button>
            </Link>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `Wybrano ${selectedRowKeys.length}` : ''}</span>
          </div>
          {this.state.loaded ? (
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}></Table>
          ) : (
            <h1></h1>
          )}
        </div>

        <Modal
          title="Edycja fiszki"
          visible={this.state.open}
          onOk={this.handleOk}
          //confirmLoading={confirmLoading}
          onCancel={this.handleClose}
        >
          <h4>Polskie tłumaczenie:</h4>
          <Input
            name="pol"
            onChange={this.handleChange}
            style={{ marginTop: 10, marginBottom: 20 }}
            placeholder={this.state.curPolish}
            value={this.state.pol}
          ></Input>
          <h4>Niemieckie tłumaczenie:</h4>
          <Input
            name="niem"
            onChange={this.handleChange}
            style={{ marginBottom: 20 }}
            placeholder={this.state.curGerman}
            value={this.state.niem}
          ></Input>
          <h4>Kategoria:</h4>
          <Input
            name="kat"
            onChange={this.handleChange}
            style={{ marginBottom: 20 }}
            placeholder={this.state.curCategory}
            value={this.state.kat}
          ></Input>
        </Modal>
      </>
    );
  }
}

export default CardsContent;
//<h2>Edycja fiszki ID: {this.state.curID}</h2>

/*
  <List
          itemLayout="horizontal"
          dataSource={this.state.flashsets.flashcards}
          renderItem={(item, index) => (
            <List.Item key={item.id}>
              <div className="card">
                <div className="card-polish">{item.polish}</div>
                <div className="card-german">{item.german}</div>
                <div className="card-category">
                  KATEGORIA: <br />
                  {item.category}
                </div>
                <Button className="card-icon" id={item._id} onClick={this.handleOpen} value={index}>
                  <EditOutlined key="edit" />
                </Button>

                <Button className="card-icon" onClick={this.handlePlus} value={index} id={item._id}>
                  {this.state.temp[index] ? (
                    <PlusCircleFilled key="add" style={{ color: 'red' }} />
                  ) : (
                    <PlusCircleOutlined key="add" />
                  )}
                </Button>
                <Button className="card-icon" onClick={this.handleDelete} value={index}>
                  <DeleteOutlined key="delete" />
                </Button>
              </div>
            </List.Item>
          )}
        /> */
