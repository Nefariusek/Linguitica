import React, { Component } from 'react';
import { List, Modal, Input, Button } from 'antd';
import { EditOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import setHeaders from '../../utils/setHeaders';
class CardsContent extends Component {
  state = {
    minValue: 0,
    maxValue: 10,
    open: false,
    curID: 0,
    temp: false,
    curPolish: '',
    curGerman: '',

    results: [],
    flashsetID: this.props.id,
    flashcards: [],
    flashsets: {},
  };

  getFlashcards = async () => {
    const response = await fetch(`/api/flashsets/${this.state.flashsetID}`, setHeaders());
    const body = await response.json();
    this.setState({ flashsets: body });
    // console.log(this.state.flashsets);
  };

  componentDidMount() {
    //this.setState({ flashsetID: this.props.id });
    console.log(this.state.flashsetID);
    this.getFlashcards();
  }

  componentDidUpdate = async () => {
    //this.setState({ flashsetID: this.props.id });
    //console.log(this.state.flashsetID);
    // this.setState({ flashsetID: this.props.id });
    //await this.getFlashcards();
  };
  handleOpen = (e) => {
    this.setState({ open: true });
    this.setState({
      curID: e.target.id,
      curPolish: e.target.value,
      curGerman: e.target.name,
    });
    console.log(e.target);

    //console.log(this.state.flashsetID);
    //console.log(e.target.value);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOK = () => {};

  handleStar = () => {
    this.setState({ temp: !this.state.temp });
  };
  render() {
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={this.state.flashsets.flashcards}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <div className="card">
                <div className="card-polish">{item.polish}</div>
                <div className="card-german">{item.german}</div>
                <div className="card-category">
                  KATEGORIA: <br />
                  {item.category}
                </div>
                <Button
                  className="card-icon"
                  id={item._id}
                  onClick={this.handleOpen}
                  value={item.polish}
                  name={item.german}
                >
                  <EditOutlined key="edit" />
                </Button>

                <Button className="card-icon" onClick={this.handleStar} id={item.id}>
                  {this.state.temp ? <StarOutlined key="add" /> : <StarFilled key="add" />}
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
          <h2>Edycja fiszki /zmienic czcionke/ ID: {this.state.curID}</h2>
          <h4>Polskie tłumaczenie:</h4>
          <Input style={{ marginTop: 10, marginBottom: 20 }} placeholder={this.state.curPolish}></Input>
          <h4>Niemieckie tłumaczenie:</h4>
          <Input style={{ marginBottom: 20 }} placeholder={this.state.curGerman}></Input>
        </Modal>
      </>
    );
  }
}

export default CardsContent;
