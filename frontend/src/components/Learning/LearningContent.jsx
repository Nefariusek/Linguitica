import React, { Component } from 'react';
import { Menu } from 'antd';
import CardLearning from './cardMode/CardLearning';
import WriteLearning from './writeMode/WriteLearning';
import QuizLearning from './quizMode/QuizLearning';

class LearningContent extends Component {
  state = {
    selectedLearningMode: ' ',
  };

  render() {
    return (
      <div className="mainLearning">
        <div className="menuChoice">
          <div>
            <Menu
              className="learningMenu"
              onClick={(e) => this.setState({ selectedLearnMode: e.key })}
              selectedKeys={[this.state.e]}
              mode="horizontal"
            >
              <Menu.Item key="mode" disabled>
                Tryb nauki
              </Menu.Item>
              <Menu.Item key="cardMode">Fiszki</Menu.Item>

              <Menu.Item key="writeMode">Pisanie</Menu.Item>
              <Menu.Item key="quizMode">Quiz</Menu.Item>
            </Menu>
          </div>

          <div className="selectedMode">{this.renderSelectedLearnMode(this.state.selectedLearnMode)}</div>
        </div>
      </div>
    );
  }
  renderSelectedLearnMode(selectedLearnMode) {
    if (!selectedLearnMode) return <CardLearning />;

    if (selectedLearnMode === 'cardMode') return <CardLearning />;
    if (selectedLearnMode === 'writeMode') return <WriteLearning />;
    if (selectedLearnMode === 'quizMode') return <QuizLearning />;
  }
}

export default LearningContent;
