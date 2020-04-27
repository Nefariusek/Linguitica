import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';

export default class CardsCreate extends Component {
  state = {
    open: false,
    temp: false,
    polish: '',
    german: '',
    category: '',
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ polish: '' });
    this.setState({ german: '' });
    this.setState({ category: '' });
  };

  handleSubmit = () => {
    console.log('submit');
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  handleOk = () => {};

  componentDidMount = () => {
    this.setState({ temp: !this.props.temp });
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
              <option value="inne">Inne</option>
            </select>
          </form>
        </Modal>
      </>
    );
  }
}
