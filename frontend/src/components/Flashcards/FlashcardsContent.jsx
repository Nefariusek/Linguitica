import React, { Component } from 'react';
import Flashcards from './Flashcards';
import { Layout, Drawer, Input, Button } from 'antd';

const { Search } = Input;
const { Header, Content } = Layout;

class FlashcardsContent extends Component {
  state = {
    visible: false,
    level: 'wszystkie',
    polish: '',
    category: 'wszystkie',

    switcher: false,
  };

  componentDidMount() {}

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleChange = async (e) => {
    // console.log(`Kategoria ${e.target.value}`);
    const { value, name } = e.target;
    await this.setState({ [name]: value, switcher: !this.state.switcher });
    //console.log('Kategoria', this.state.category);
    //console.log('Poziom', this.state.level);
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
          Tagi:{' '}
          <Search placeholder="" onSearch={(value) => console.log(value)} style={{ width: 200, marginRight: 20 }} />
          <Button type="primary" onClick={this.showDrawer}>
            Nauka
          </Button>
          <Drawer
            title="Lista wybranych fiszek"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p>Fiszka1...</p>
            <p>Fiszka2...</p>
            <p>Fiszka3...</p>
            <p>Fiszka4...</p>
            <p>Fiszka5...</p>
            <p>Fiszka6...</p>
            <p>Fiszka7...</p>
            <p>Fiszka8...</p>
            <p>Fiszka9...</p>
            <p>Fiszka10...</p>
            <Button>ROZPOCZNIJ NAUKE!</Button>
          </Drawer>
        </Header>{' '}
        <Content style={{ marginLeft: 20, marginRight: 20 }}>
          <Flashcards category={this.state.category} level={this.state.level} />
        </Content>
      </>
    );
  }
}

export default FlashcardsContent;
