import React, { Component } from 'react';
import { Button, Modal, Input, Checkbox, message } from 'antd';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';

export default class CardsCreate extends Component {
  state = {
    open: false,
    temp: false,
    polish: '',
    german: '',
    category: 'pojazdy',
    flashsetID: this.props.flashsetID,
    body: '',
    checked: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = async () => {
    this.setState({ open: false });
    this.setState({ polish: '' });
    this.setState({ german: '' });
    this.setState({ category: '' });
    this.setState({ checked: false });
    this.props.callbackFromParent(true);
  };

  handleChange = async (e) => {
    const { value, name } = e.target;
    await this.setState({ [name]: value });
  };
  handleOk = async () => {
    if (this.state.polish !== '' && this.state.german !== '') {
      await this.addFlashcard();
      message.success('Udało się utworzyć fiszkę!', 2);
      if (this.state.checked === false) {
        this.handleClose();
        this.props.callbackFromParent(true);
      } else {
        this.setState({ open: true });
        this.setState({ polish: '' });
        this.setState({ german: '' });
        this.setState({ category: '' });
      }
    } else message.error('Proszę wypełnić wszystkie pola.', 2);
  };

  componentDidMount = () => {
    this.setState({ temp: !this.props.temp });
  };
  addFlashcard = async () => {
    await axios({
      url: `/api/flashsets/${this.state.flashsetID}/flashcards`,
      method: 'put',
      data: {
        flashcards: {
          polish: this.state.polish,
          german: this.state.german,
          category: this.state.category,
        },
      },
      headers: setHeaders(),
    }).then((res) => this.setState({ body: res.data }));
  };
  handleCheckbox = async (e) => {
    console.log(e.target);
    await this.setState({ checked: !this.state.checked });
    console.log(this.state.checked);
  };
  render() {
    return (
      <>
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
        >
          DODAJ NOWĄ FISZKĘ
        </Button>

        <Modal
          title="Dodaj nową fiszkę"
          visible={this.state.open}
          onOk={this.handleOk}
          okText="DODAJ"
          cancelText="ANULUJ"
          //confirmLoading={this.confirmLoading}
          onCancel={this.handleClose}
        >
          <form onSubmit={this.handleSubmit}>
            <Input
              style={{ marginTop: 10, marginBottom: 10 }}
              name="polish"
              value={this.state.polish}
              onChange={this.handleChange}
              placeholder="Wpisz polskie tłumaczenie"
            />
            <Input
              style={{ marginTop: 10, marginBottom: 10 }}
              name="german"
              value={this.state.german}
              onChange={this.handleChange}
              placeholder="Wpisz niemieckie tłumaczenie"
            />

            <select
              defaultValue="pojazdy"
              style={{ width: '100%', marginTop: 10, marginBottom: 10 }}
              name="category"
              onChange={this.handleChange}
              value={this.state.value}
            >
              <option value="pojazdy">Pojazdy</option>
              <option value="elektronika">Elektronika</option>
              <option value="ludzie">Ludzie</option>
              <option value="dom">Dom</option>
              <option value="internet">Internet</option>
              <option value="ogolne">Ogólne</option>
              <option value="emocje">Emocje</option>
              <option value="zwierzeta">Zwierzęta</option>
              <option value="inne">Inne</option>
            </select>
            <Checkbox onChange={this.handleCheckbox} value={this.state.checked}>
              Dodaj kolejną fiszkę!
            </Checkbox>
          </form>
        </Modal>
      </>
    );
  }
}
