import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import setHeaders from '../../utils/setHeaders';
class Cards extends Component {
  state = {
    flashcards: [],
    temp: [],
    category: this.props.category,
    level: this.props.level,
    selected: [],
    names: [],
    selectedRowKeys: [],
    selectedFlashcards: [],
    data: [],
    loaded: false,
  };

  getFlashcards = async () => {
    const response = await fetch('/api/flashcards', setHeaders());
    const body = await response.json();
    let filteredBody = body;
    if (this.state.level !== 'wszystkie') {
      let expectedLevel = this.state.level;
      filteredBody = body.filter((flashcard) => {
        return flashcard.level === expectedLevel;
      });
    }

    this.setState({ flashcards: filteredBody });
    console.log(this.state.flashcards);

    for (let i = 0; i < this.state.flashcards.length; i++) {
      await this.state.data.push({
        key: i,
        polish: this.state.flashcards[i].polish,
        german: this.state.flashcards[i].german,
        category: this.state.flashcards[i].category,
        level: this.state.flashcards[i].level,
      });
    }
    this.setState({ loaded: true });
    console.log('data', this.state.data);
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
      await this.setState({ level: this.props.level }, () => {
        this.getFlashcards();
      });
      console.log('szukany poziom:', this.state.level);
    }
  };
  onSelectChange = async (selectedRowKeys) => {
    await this.setState({ selectedFlashcards: [] });
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    await this.setState({ selectedRowKeys });

    for (let i = 0; i < selectedRowKeys.length; i++) {
      this.state.selectedFlashcards.push(this.state.flashcards[selectedRowKeys[i]]);
    }
    console.log('wybrane fiszki: ', this.state.selectedFlashcards);
  };
  render() {
    const columns = [
      {
        title: 'Polski',
        dataIndex: 'polish',
      },
      {
        title: 'Niemiecki',
        dataIndex: 'german',
      },
      {
        title: 'Kategoria',
        dataIndex: 'category',
      },
      {
        title: 'Poziom',
        dataIndex: 'level',
      },
    ];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div className="flashcards-container">
          <div style={{ marginBottom: 16 }}>
            <Link
              to={{
                pathname: '/learning',
                flashcards: this.state.selectedFlashcards,
              }}
            >
              <Button
                style={{ width: '10vw' }}
                type="primary"
                onClick={this.handleStart}
                disabled={!hasSelected}
                loading={loading}
              >
                Nauka
              </Button>
            </Link>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `Wybrano ${selectedRowKeys.length}` : ''}</span>
          </div>

          {this.state.loaded ? (
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}></Table>
          ) : (
            <h1></h1>
          )}
        </div>
      </div>
    );
  }
}

export default Cards;

/*<List
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
        /> */
