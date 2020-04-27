import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
export default class FlashsetCreate extends Component {
  state = {
    open: false,
    title: '',
    questID: '5e85bd0c0fc921686c98dd13',
    flashset_id: '5ea46aeb5e9d6d0c4cf5bed0',
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ title: '' });
  };
  handleSubmit = () => {
    alert('123');
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  handleOK = () => {
    // this.addFlashset();
    this.addFlashsetID();
    this.handleClose();
  };

  //dodanie nowego zestawu
  addFlashset = async () => {
    await axios({
      url: '/api/flashsets',
      method: 'post',
      data: {
        flashcards: [
          {
            title: this.state.title,
          },
        ],
      },
      headers: setHeaders(),
    }).catch((error) => console.error(error));
  };

  addFlashsetID = async () => {
    await axios({
      url: `/api/quests/${this.state.questID}`,
      method: 'put',
      data: {
        flashset_id: [this.state.flashset_id],
      },
      headers: setHeaders(),
    }).catch((error) => console.error(error));
  };

  render() {
    return (
      <>
        <Button onClick={this.handleOpen} className="button-flashsets">
          Utwórz nowy
        </Button>
        <Modal
          title="Stwórz nowy zestaw fiszek!"
          visible={this.state.open}
          onOk={this.handleOK}
          //confirmLoading={confirmLoading}
          onCancel={this.handleClose}
        >
          <form onSubmit={this.handleSubmit}>
            <Input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Wpisz nazwę nowego zestawu fiszek"
            />
          </form>
        </Modal>
      </>
    );
  }
}
