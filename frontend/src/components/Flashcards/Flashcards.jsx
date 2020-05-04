import React, { Component } from 'react';
import { List, Button } from 'antd';
import { PlusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
import setHeaders from '../../utils/setHeaders';
class Cards extends Component {
  state = {
    flashcards: [],
    temp: [],
    category: this.props.category,
    level: this.props.level,
    selected: [],
    names: [],
  };
  getFlashcards = async () => {
    const response = await fetch('/api/flashcards', setHeaders());
    const body = await response.json();
    this.setState({ flashcards: body });
    console.log(this.state.flashcards);
  };
  handleSelect = async (e) => {
    //ustawienie gwiazdki (pusta lub wypelniona)
    const { temp } = this.state;
    temp[e.target.name] = !temp[e.target.name];
    this.setState({ temp });

    await this.zmiany(e);
    //dodanie wybranych fiszek do listy
  };

  zmiany = async (e) => {
    this.state.temp[e.target.name] === true
      ? this.state.selected.push(e.target.value)
      : this.state.selected.splice(e.target.value, 1);

    console.log('wybrane: ', this.state.selected);

    this.state.temp[e.target.name] === true
      ? this.state.names.push(e.target.attributes.zmienna.nodeValue)
      : this.state.names.splice(e.target.attributes.zmienna.nodeValue, 1);

    //wyslanie listy indexow wybranych fiszek
    this.props.callbackFromParent([this.state.selected, this.state.names]);
  };

  componentDidMount = async () => {
    await this.getFlashcards();
    for (let i = 0; i < this.state.flashcards.length; i++) {
      const { temp } = this.state;
      temp[i] = false;
    }
    console.log('kategoria:', this.state.category);
    console.log('poziom:', this.state.level);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.category !== this.props.category || prevProps.level !== this.props.level) {
      await this.setState({ category: this.props.category });
      console.log('szukana kategoria:', this.state.category);
      await this.setState({ level: this.props.level });
      console.log('szukany poziom:', this.state.level);
    }
  };

  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.flashcards}
          renderItem={(item, index) => (
            <List.Item key={item.id}>
              <div className="flashcard">
                <div className="flashcard-polish">{item.polish}</div>
                <div className="flashcard-german">{item.german}</div>

                <div className="flashcard-category">
                  KATEGORIA: <br />
                  {item.category}
                </div>
                <div className="flashcard-level">
                  {' '}
                  POZIOM: <br />
                  {item.level}
                </div>
                <Button
                  className="flashcard-icon"
                  zmienna={item.polish}
                  value={item._id}
                  onClick={this.handleSelect}
                  name={index}
                >
                  {this.state.temp[index] ? <PlusCircleFilled key="add" /> : <PlusCircleOutlined key="add" />}
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Cards;
