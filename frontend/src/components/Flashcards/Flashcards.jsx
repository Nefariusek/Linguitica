import React, { Component } from 'react';
import { List, Button } from 'antd';

import { StarOutlined, StarFilled } from '@ant-design/icons';
import setHeaders from '../../utils/setHeaders';
class Cards extends Component {
  state = {
    flashcards: [],
    temp: false,
    category: this.props.category,
    level: this.props.level,
  };
  getFlashsets = async () => {
    const response = await fetch('/api/flashcards', setHeaders());
    const body = await response.json();
    this.setState({ flashcards: body });
    console.log(this.state.flashcards);
  };
  handleStar = () => {
    this.setState({ temp: !this.state.temp });
  };
  componentDidMount = async () => {
    await this.getFlashsets();
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
          renderItem={(item) => (
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
                <Button className="card-icon" onClick={this.handleStar} id={item.id}>
                  {this.state.temp ? <StarOutlined key="add" /> : <StarFilled key="add" />}
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
