import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
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
    //this.props.callbackFromParent(false);
  };
  handleSubmit = () => {
    // this.addFlashset();
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  handleOK = async () => {
    await this.addFlashset();
    await this.addFlashsetID();
    //this.addFlashsetID();

    //window.location.reload(false);
    //this.props.callbackFromParent(true);

    this.handleClose();
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.plantID !== this.props.plantID) {
      await this.setState({ plantID: this.props.plantID });
      console.log('otrzymane id:', this.state.plantID);
    }
  };

  //dodanie nowego zestawu
  addFlashset = async () => {
    await axios({
      url: '/api/flashsets/',
      method: 'post',
      headers: setHeaders(),
      data: {
        title: this.state.title,
        flashcards: [
          {
            flashcards: [],
          },
        ],
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
