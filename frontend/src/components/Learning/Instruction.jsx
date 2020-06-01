import { Popover, Button } from 'antd';
import React from 'react';
import { KeyOutlined } from '@ant-design/icons';
class Instruction extends React.Component {
  state = {
    clicked: false,
    hovered: false,
  };

  hide = () => {
    this.setState({
      clicked: false,
      hovered: false,
    });
  };

  handleHoverChange = (visible) => {
    this.setState({
      hovered: visible,
      clicked: false,
    });
  };

  handleClickChange = (visible) => {
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };

  render() {
    const hoverContent = <div>Skróty klawiszowe</div>;
    const clickContent = (
      <div>
        <h3>
          1 -> Fiszki
          <br></br> 2 -> Tryb pisania <br></br> 3 -> Quiz <br></br>
          Ctrl -> Prawidłowa odpowiedź / podpowiedź <br></br>
          Enter -> Zatwierdź / dalej
        </h3>
      </div>
    );
    return (
      <Popover
        style={{ width: 500 }}
        content={hoverContent}
        //title="Hover title"
        trigger="hover"
        visible={this.state.hovered}
        onVisibleChange={this.handleHoverChange}
      >
        <Popover
          content={
            <div>
              {clickContent} <a onClick={this.hide}>Wyjdź</a>
            </div>
          }
          title="Skróty klawiszowe"
          trigger="click"
          visible={this.state.clicked}
          onVisibleChange={this.handleClickChange}
        >
          <Button style={{ marginLeft: '39%', marginTop: '2.5%', border: 'solid 1px #12abdb' }}>
            <KeyOutlined />
          </Button>
        </Popover>
      </Popover>
    );
  }
}
export default Instruction;
