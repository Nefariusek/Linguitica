import React, { Component } from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
export default class FlashsetDelete extends Component {
  state = {
    open: false,
    body: '',
    temp: false,
    //flashsetsID: this.props.id,
    flashsets: this.props.id,
    value: '',
    confirm: false,
    flashsetID: '',
  };
  handleOpen = () => {
    this.setState({ open: true, temp: true, confirm: false });
    console.log(this.state.flashsets);
    // this.setState({ temp: true });
    // this.setState({ confirm: false });
  };

  handleClose = () => {
    this.setState({ open: false, temp: false });
    //this.setState({ temp: false });
  };
  handleOk = () => {
    this.deleteFlashsetsID();
    console.log(this.state.flashsetID);
    console.log(this.state.body);
  };

  deleteFlashsetsID = async () => {
    await axios({
      url: `/api/flashsets/${this.state.flashsetID}`,
      method: 'delete',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ body: response.data });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  componentDidUpdate = () => {};

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.setState({ flashsetID: e.target.options[e.target.selectedIndex].id });
    this.setState({ confirm: true });
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
          //onOk={this.handleOk}
          //confirmLoading={confirmLoading}
          onCancel={this.handleClose}
          footer={[
            <Button key="back" onClick={this.handleClose}>
              ANULUJ
            </Button>,

            this.state.confirm ? (
              <Popconfirm
                title="Czy na pewno chcesz usunąć wybrany zestaw?"
                onConfirm={this.handleOk}
                onCancel={this.handleClose}
                okText="Tak"
                cancelText="Nie"
                key="pop"
              >
                <Button key="submit" type="danger">
                  USUŃ
                </Button>
              </Popconfirm>
            ) : (
              <div key="whatever"></div>
            ),
          ]}
        >
          <span style={{ textAlign: 'center' }}>Twoje zestawy:</span>
          <br />
          <select style={{ width: '100%' }} onChange={this.handleChange}>
            {this.state.temp ? (
              this.state.flashsets.map((val, keyy) => (
                <option key={keyy} className="menuitem-flashsets" value={val.title} id={val._id}>
                  {val.title}
                </option>
              ))
            ) : (
              <option key="placeholder"></option>
            )}
          </select>
        </Modal>
      </>
    );
  }
}
