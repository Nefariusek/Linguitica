import React, { Component } from 'react';
import { Menu } from 'antd';
import CardLearning from './CardLearning';
import WriteLearning from './WriteLearning';
import QuizLearning from './QuizLearning';

/* ----- strzałak gora- pisanko
strzałka w prawo - quiz,
strzałka w lewo - fiszki 
chyba nie najinstynktowniej i jak nie działa to najsamprzód zmienic focus tabulatorem ------- */

class LearningContent extends Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
  }
  state = {
    selectedLearnMode: ' ',
    keyClicked: ' ',
  };

  handleKey(event) {
    if (event.keyCode === 37) {
      console.log('tak');
      this.setState({
        selectedLearnMode: 'cardMode',
      });
      console.log(this.state.SelectedLearnMode);
    } else if (event.keyCode === 38) {
      console.log('17');
      this.setState({
        selectedLearnMode: 'writeMode',
      });
    } else if (event.keyCode === 39) {
      console.log('50');
      this.setState({
        selectedLearnMode: 'quizMode',
      });
    }
  }
  render() {
    return (
      <div className="mainLearning">
        <div className="menuChoice" tabIndex={-1} onKeyDown={this.handleKey}>
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
    else return <CardLearning />;
  }
}

export default LearningContent;
