import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
export default class FlashsetCreate extends Component {
  state = {
    open: false,
    body: '',

    title: '',
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
  render() {
    return (
      <>
        <Button onClick={this.handleOpen} className="button-flashsets">
          Utwórz nowy
        </Button>
        <Modal
          title="Stwórz nowy zestaw fiszek!"
          visible={this.state.open}
          onOk={this.handleOk}
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
