import React, { Component } from 'react';
import { Card, Button, Pagination, Row, Modal, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const axios = require('axios');
class FlashcardContent extends Component {
  state = {
    minValue: 0,
    maxValue: 10,
    open: false,
    curID: 0,
    curTitle: '',
    curValue: '',
    results: [],
    data: [
      { id: 0, title: 'Fiszka 1', polish: 'monitor', german: 'der Bildschrim', category: 'elektronika' },
      { id: 1, title: 'Fiszka 2', polish: 'samochód', german: 'das Auto', category: 'pojazdy' },
      { id: 2, title: 'Fiszka 3', polish: 'syn', german: 'der Sohn', category: 'ludzie' },
      { id: 3, title: 'Fiszka 4', polish: 'miotła', german: 'der Besen', category: 'dom' },
      {
        id: 4,
        title: 'Fiszka 5',
        polish: 'żołnierz',
        german: 'der Kragen',
        category: 'ludzie',
      },
      { id: 5, title: 'Fiszka 6', polish: 'rower', german: 'das Fahrrad', category: 'pojazdy' },
      {
        id: 6,
        title: 'Fiszka 7',
        polish: 'powiadomienie',
        german: 'der Bescheid',
        category: 'internet',
      },
      { id: 7, title: 'Fiszka 8', polish: 'jeść', german: 'essen', category: 'ogólne' },
      { id: 8, title: 'Fiszka 9', polish: 'awantura', german: 'der Krach', category: 'emocje' },
      { id: 9, title: 'Fiszka 10', polish: 'osoba', german: 'die Person', category: 'ludzie' },
      {
        id: 10,
        title: 'Fiszka 11',
        polish: 'termometr',
        german: 'das Thermometer',
        category: 'medycyna',
      },
      { id: 11, title: 'Fiszka 12', polish: 'cztery', german: 'vier', category: 'lidzby' },
      { id: 12, title: 'Fiszka 13', polish: 'piątek', german: 'Freitag', category: 'czas' },
    ],
  };

  handleOpen = (e) => {
    this.setState({ open: true });
    this.setState({ curID: e.target.id });
    console.log(e.target.id);
    console.log(e.target.curTitle);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOK = () => {};

  handleChange = (value) => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 10,
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 10,
      });
    }
  };

  render() {
    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <div>
          {this.state.data &&
            this.state.data.length > 0 &&
            this.state.data.slice(this.state.minValue, this.state.maxValue).map((val) => (
              <Card
                size="small"
                title={val.title}
                style={{ width: 230 }}
                key={val.id}
                //actions={[<EditOutlined key="edit" />]}
              >
                <h4>{val.polish}</h4>
                <h4>{val.german}</h4>
                <h6>{val.category}</h6>

                <Button onClick={this.handleOpen} id={val.id}>
                  <EditOutlined key="edit" />
                </Button>
              </Card>
            ))}
        </div>
        <div className="pagination">
          <span style={{ padding: 5 }}></span>
          <Pagination defaultCurrent={1} defaultPageSize={10} onChange={this.handleChange} total={20} />
        </div>
        <Modal
          title="Edytuj"
          visible={this.state.open}
          onOk={this.handleOk}
          //confirmLoading={confirmLoading}
          onCancel={this.handleClose}
        >
          <h2>Edycja fiszki numer {this.state.curID}</h2>
          <h4>Polskie tłumaczenie:</h4>
          <Input
            style={{ marginTop: 10, marginBottom: 20 }}
            placeholder={this.state.data[this.state.curID].polish}
          ></Input>
          <h4>Niemieckie tłumaczenie:</h4>
          <Input style={{ marginBottom: 20 }} placeholder={this.state.data[this.state.curID].german}></Input>
          <h4>Kategoria:</h4>
          <Input style={{ marginBottom: 20 }} placeholder={this.state.data[this.state.curID].category}></Input>
        </Modal>
      </Row>
    );
  }
}

export default FlashcardContent;
