import React, { Component } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';

export default class FlashsetCreate extends Component {
  state = {
    open: false,
    title: '',
    plantID: this.props.plantID,
    body: '',
  };

  static contextType = Store;

  handleOpen = () => {
    this.setState({ open: true });
    console.log(this.state.body);
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ title: '' });
    this.props.callbackFromParent(false);
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  handleOK = async () => {
    if (this.state.title !== '') {
      await this.addFlashset();
      await this.addFlashsetID();
      await this.props.callbackFromParent(true);
      this.handleClose();
      message.success('Zestaw utworzony!', 2);
    } else message.error('Proszę wpisać nazwę zestawu!', 2);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.plantID !== this.props.plantID) {
      await this.setState({ plantID: this.props.plantID });
      console.log('otrzymane id:', this.state.plantID);
    }
  };

  addFlashset = async () => {
    await axios({
      url: '/api/flashsets/',
      method: 'post',
      headers: setHeaders(),
      data: {
        title: this.state.title,
      },
    }).then((res) => this.setState({ body: res.data._id }));
  };

  addFlashsetID = async () => {
    await axios({
      url: `/api/plants/${this.context.userProfile.plant_id}/flashsets`,
      method: 'put',
      headers: setHeaders(),
      data: {
        flashsets: {
          _id: this.state.body,
        },
      },
    }).then(
      (res) => {},
      (error) => {
        console.log(error);
      },
    );
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
