import React, { Component } from 'react';
import { Button, Modal } from 'antd';
export default class FlashsetCreate extends Component {
  state = {
    open: false,
    body: '',
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    alert('123');
  };

  render() {
    return (
      <>
        <Button onClick={this.handleOpen} className="button-flashsets">
          Usuń zestaw
        </Button>
        <Modal
          className="modal-flashsets"
          title="Usuń wybrany zestaw fiszek!"
          visible={this.state.open}
          onOk={this.handleOk}
          //confirmLoading={confirmLoading}
          onCancel={this.handleClose}
        >
          tutaj lista zestawów danego uzytkownika
          <ul>
            <li>zestaw1</li>
            <li>zestaw2</li>
            <li>zestaw3</li>
            <li>zestaw4</li>
          </ul>
        </Modal>
      </>
    );
  }
}
