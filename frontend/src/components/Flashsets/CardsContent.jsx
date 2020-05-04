import React, { Component } from 'react';
import { List, Modal, Input, Button } from 'antd';
import { EditOutlined, PlusCircleOutlined, PlusCircleFilled, DeleteOutlined } from '@ant-design/icons';
import setHeaders from '../../utils/setHeaders';
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
  };

  getFlashcards = async () => {
    const response = await fetch(`/api/flashsets/${this.state.flashsetID}`, setHeaders());
    const body = await response.json();
    this.setState({ flashsets: body });
    // console.log(this.state.flashsets);
  };

  componentDidMount() {
    //this.setState({ flashsetID: this.props.id });
    for (let i = 0; i < 100; i++) {
      const { temp } = this.state;
      temp[i] = false;
    }
    console.log(this.state.flashsetID);
    this.getFlashcards();
  }

  componentDidUpdate = async () => {};

  handleOpen = (e) => {
    this.setState({ open: true });
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
  };

  handleOk = async () => {
    //console.log(this.state.curID);

    const { flashcards } = this.state.flashsets;

    if (this.state.pol !== '') flashcards[this.state.curID].polish = this.state.pol;
    if (this.state.niem !== '') flashcards[this.state.curID].german = this.state.niem;
    if (this.state.kat !== '') flashcards[this.state.curID].category = this.state.kat;
    console.log(flashcards);

    await this.setState({ flashcards });

    await this.handleClose();

    this.setState({ pol: '', niem: '', kat: '' });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handlePlus = async (e) => {
    console.log(e.target.value);

    const { temp } = this.state;
    temp[e.target.value] = !temp[e.target.value];
    await this.setState({ temp });

    let count = 0;
    for (let i = 0; i < this.state.temp.length; i++) {
      if (this.state.temp[i] === true) count++;
    }

    this.props.callbackFromParent(count);
  };
  render() {
    return (
      <>
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
        />
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
