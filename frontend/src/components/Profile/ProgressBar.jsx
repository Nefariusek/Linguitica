import React, { Component } from 'react';
import { Progress } from 'antd';

class ProgressBar extends Component {
  calculateProgress = () => {
    let percent = (this.props.current / this.props.maximum) * 100;
    return percent;
  };

  render() {
    return (
      <div>
        <Progress percent={this.calculateProgress()} />
      </div>
    );
  }
}

export default ProgressBar;
