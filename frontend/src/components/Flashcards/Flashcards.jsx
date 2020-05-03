import React, { Component } from 'react';
import { List, Button } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import setHeaders from '../../utils/setHeaders';
class Cards extends Component {
  state = {
    flashcards: [],
    temp: [],
    category: this.props.category,
    level: this.props.level,
    selected: [],
  };
  getFlashcards = async () => {
    const response = await fetch('/api/flashcards', setHeaders());
    const body = await response.json();
    this.setState({ flashcards: body });
    console.log(this.state.flashcards);
  };
  handleSelect = (e) => {
    //ustawienie gwiazdki (pusta lub wypelniona)
    const { temp } = this.state;
    temp[e.target.name] = !temp[e.target.name];
    this.setState({ temp });

    //dodanie wybranych fiszek do listy
    this.state.temp[e.target.name] === true
      ? this.state.selected.push(e.target.value)
      : this.state.selected.splice(e.target.value, 1);

    console.log('wybrane: ', this.state.selected);

    //wyslanie listy indexow wybranych fiszek
    this.props.callbackFromParent(this.state.selected);
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
                <Button className="flashcard-icon" value={item._id} onClick={this.handleSelect} name={index}>
                  {this.state.temp[index] ? <StarFilled key="add" /> : <StarOutlined key="add" />}
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
