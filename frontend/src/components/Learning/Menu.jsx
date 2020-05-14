import React from 'react';
import { Menu } from 'antd';

class MenuLearning extends React.Component {
  state = {
    current: 'mail',
  };
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu className="learningMenu" onSelect={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mode" disabled>
          Tryb nauki
        </Menu.Item>
        <Menu.Item key="cards">Fiszki</Menu.Item>
        <Menu.Item key="write">Pisanie</Menu.Item>
        <Menu.Item key="quiz"> Quiz</Menu.Item>
      </Menu>
    );
  }
}

export default MenuLearning;
