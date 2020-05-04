import React, { Component } from 'react';
import Flashcards from './Flashcards';
import { Layout, Drawer, Button } from 'antd';
const { Header, Content } = Layout;

class FlashcardsContent extends Component {
  state = {
    visible: false,
    level: 'wszystkie',
    polish: '',
    category: 'wszystkie',
    listDataFromChild: [],
    formatList: [],
    flashcards: [],
  };

  //callback zeby pobrac liste wybranych fiszek od komponentu dziecka
  myCallback = async (dataFromChild) => {
    await this.setState({ listDataFromChild: dataFromChild[0] });
    await this.setState({ formatList: dataFromChild[1] });
    console.log('od dziecka', this.state.listDataFromChild);
  };

  componentDidMount() {}

  showDrawer = () => {
    this.setState({
      visible: true,
    });

    console.log('sformatowana lista', this.state.formatList);
  };

  handleChange = async (e) => {
    const { value, name } = e.target;
    await this.setState({ [name]: value });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <>
        <Header
          style={{ textAlign: 'center', color: 'white', fontSize: 18, paddingLeft: 10, borderTop: 'solid 1px white' }}
        >
          Kategorie:{' '}
          <select
            //defaultValue="wszystkie"
            name="category"
            value={this.state.category}
            style={{ width: 200, marginRight: 20, color: 'black' }}
            onChange={this.handleChange}
          >
            <option value="wszystkieKategorie">Wszystkie</option>
            <option value="pojazdy">Pojazdy</option>
            <option value="elektronika">Elektronika</option>
            <option value="ludzie">Ludzie</option>
            <option value="dom">Dom</option>
            <option value="internet">Internet</option>
            <option value="ogolne">Ogólne</option>
            <option value="emocje">Emocje</option>
            <option value="inne">Inne</option>
          </select>
          Poziom:{' '}
          <select
            defaultValue="wszystkie"
            style={{ width: 200, marginRight: 20, color: 'black' }}
            onChange={this.handleChange}
            name="level"
          >
            <option value="wszystkiePoziomy">Wszystkie</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
          <Button type="primary" className="button-flashcards-learn" onClick={this.showDrawer}>
            Nauka
          </Button>
          <Drawer
            title="Lista wybranych fiszek"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            {this.state.formatList.map((value, key) => (
              <Button className="button-flashcards" key={key}>
                {value}
              </Button>
            ))}

            {this.state.formatList.length > 0 ? (
              <Button className="button-flashcards-start">ROZPOCZNIJ NAUKE!</Button>
            ) : (
              <Button disabled className="button-flashcards-start">
                ROZPOCZNIJ NAUKE!
              </Button>
            )}
          </Drawer>
        </Header>{' '}
        <Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Flashcards callbackFromParent={this.myCallback} category={this.state.category} level={this.state.level} />
        </Content>
      </>
    );
  }
}

export default FlashcardsContent;
