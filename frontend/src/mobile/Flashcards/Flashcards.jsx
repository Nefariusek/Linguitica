import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Store from '../../Store';
import setHeaders from '../../utils/setHeadersMobile';
import {
  Container,
  Footer,
  FooterTab,
  Left,
  Icon,
  Title,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Right,
  Button,
  Form,
  Picker,
  Spinner,
} from 'native-base';

export default class Flashcards extends Component {
  state = {
    flashcards: [],
    selected: [],
    categoryPicker: 'wszystkie',
    levelPicker: 'wszystkie',
    selectedFlashcards: [],
    temp: [],
    selectedRowKeys: [],
    selectedCounter: 0,
    isLoaded: false,
  };
  static contextType = Store;

  getFlashcards = async () => {
    const response = await fetch('http://linguitica.herokuapp.com/api/flashcards', setHeaders());
    const body = await response.json();
    let filteredBodyLevel = body;
    let filteredBodyCategory = body;
    let filteredBody = [];

    if (this.state.levelPicker !== 'wszystkie') {
      let expectedLevel = this.state.levelPicker;
      filteredBodyLevel = body.filter((flashcard) => {
        return flashcard.level === expectedLevel;
      });
    }
    if (this.state.categoryPicker !== 'wszystkie') {
      let expectedCategory = this.state.categoryPicker;
      filteredBodyCategory = body.filter((flashcard) => {
        return flashcard.category === expectedCategory;
      });
    }
    if (this.state.levelPicker !== 'wszystkie' || this.state.categoryPicker !== 'wszystkie') {
      for (let i = 0; i < filteredBodyLevel.length; i++) {
        for (let j = 0; j < filteredBodyCategory.length; j++) {
          if (filteredBodyLevel[i] === filteredBodyCategory[j]) {
            filteredBody.push(filteredBodyLevel[i]);
          }
        }
      }
      this.setState({ flashcards: filteredBody, isLoaded: true });
    } else {
      this.setState({ flashcards: body, isLoaded: true });
    }
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.categoryPicker !== this.state.categoryPicker || prevState.levelPicker !== this.state.levelPicker) {
      await this.setState({ categoryPicker: this.state.categoryPicker });

      await this.setState({ levelPicker: this.state.levelPicker }, () => {
        this.getFlashcards();
      });
    }
  };
  componentDidMount = async () => {
    await this.getFlashcards();

    for (let i = 0; i < (await this.state.flashcards.length); i++) {
      const { selected } = this.state;
      selected[i] = false;
    }
  };

  onSelectChange = async (selectedRowKeys) => {
    this.setState({ selectedFlashcards: [] });
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    const { selected } = this.state;
    selected[selectedRowKeys] = !selected[selectedRowKeys];
    this.setState({ selected });

    let counter = 0;

    for (let i = 0; i < (await this.state.selected.length); i++) {
      if (this.state.selected[i] === true) {
        counter++;
        await this.state.selectedFlashcards.push(this.state.flashcards[i]);
      }
    }

    this.setState({ selectedCounter: counter });
    console.log('selected flashcards: ', this.state.selectedFlashcards);
  };

  onCategoryChange = async (value) => {
    await this.setState({
      categoryPicker: value,
      isLoaded: false,
    });
  };
  onLevelChange = async (value) => {
    await this.setState({
      levelPicker: value,
      isLoaded: false,
    });
  };
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#1890ff' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body>
            <Title>Fiszki</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Container style={styles.containerPicker}>
              <Text style={styles.textPicker}>Kategoria:</Text>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Kategoria"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                style={styles.picker}
                selectedValue={this.state.categoryPicker}
                onValueChange={this.onCategoryChange}
              >
                <Picker.Item label="Wszystkie" value="wszystkie" />
                <Picker.Item label="Pojazdy" value="pojazdy" />
                <Picker.Item label="Dom" value="dom" />
                <Picker.Item label="Ogólne" value="ogólne" />
                <Picker.Item label="Emocje" value="emocje" />
                <Picker.Item label="Rodzina" value="rodzina" />
                <Picker.Item label="Liczby" value="liczby" />
                <Picker.Item label="Czas" value="czas" />
                <Picker.Item label="Praca" value="praca" />
                <Picker.Item label="Technika" value="technika" />
                <Picker.Item label="Technologia" value="technologia" />
                <Picker.Item label="Zawody" value="zawody" />
                <Picker.Item label="Podróże" value="podróże" />
                <Picker.Item label="Medycyna" value="medycyna" />
                <Picker.Item label="Historia" value="historia" />
              </Picker>
            </Container>
            <Container style={styles.containerPicker}>
              <Text style={styles.textPicker}>Poziom:</Text>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Poziom"
                style={styles.picker}
                selectedValue={this.state.levelPicker}
                onValueChange={this.onLevelChange}
              >
                <Picker.Item label="Wszystkie" value="wszystkie" />
                <Picker.Item label="A1" value="A1" />
                <Picker.Item label="A2" value="A2" />
                <Picker.Item label="B1" value="B1" />
                <Picker.Item label="B2" value="B2" />
                <Picker.Item label="C1" value="C1" />
                <Picker.Item label="C2" value="C2" />
              </Picker>
            </Container>
          </Form>
          <List>
            {this.state.isLoaded ? (
              this.state.flashcards.map((val, key) => (
                <ListItem
                  key={key}
                  onPress={() => this.onSelectChange(key)}
                  style={[this.state.selected[key] ? styles.selected : styles.normal]}
                >
                  <Body>
                    <Text
                      style={{
                        fontSize: 22,
                        width: '75%',
                        backgroundColor: 'lightgrey',
                        textAlign: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}
                    >
                      {val.polish}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        width: '75%',
                        backgroundColor: '#1890ff',
                        textAlign: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff',
                        color: 'white',
                      }}
                    >
                      {val.german}
                    </Text>
                  </Body>
                  <Button
                    onPress={() => this.onSelectChange(key)}
                    large
                    style={{ backgroundColor: 'lightgrey', height: '70%', marginRight: '5%' }}
                  >
                    <Text style={{ fontSize: 16, color: 'black' }}>{val.level}</Text>
                  </Button>
                  <Button
                    onPress={() => this.onSelectChange(key)}
                    large
                    style={{ backgroundColor: 'lightgrey', height: '70%', width: '13%' }}
                  >
                    {(val.category === 'pojazdy' && <Icon style={{ color: 'black' }} name="car" />) ||
                      (val.category === 'praca' && <Icon style={{ color: 'black' }} name="hammer" />) ||
                      (val.category === 'dom' && <Icon style={{ color: 'black' }} name="home" />) ||
                      (val.category === 'ogólne' && <Icon style={{ color: 'black' }} name="list" />) ||
                      (val.category === 'emocje' && <Icon style={{ color: 'black' }} name="happy" />) ||
                      (val.category === 'rodzina' && <Icon style={{ color: 'black' }} name="people" />) ||
                      (val.category === 'liczby' && <Icon style={{ color: 'black' }} name="stats" />) ||
                      (val.category === 'czas' && <Icon style={{ color: 'black' }} name="time" />) ||
                      (val.category === 'technika' && <Icon style={{ color: 'black' }} name="build" />) ||
                      (val.category === 'technologia' && <Icon style={{ color: 'black' }} name="phone-portrait" />) ||
                      (val.category === 'zawody' && <Icon style={{ color: 'black' }} name="briefcase" />) ||
                      (val.category === 'podróże' && <Icon style={{ color: 'black' }} name="jet" />) ||
                      (val.category === 'medycyna' && <Icon style={{ color: 'black' }} name="medkit" />) ||
                      (val.category === 'historia' && <Icon style={{ color: 'black' }} name="archive" />)}
                  </Button>
                </ListItem>
              ))
            ) : (
              <Container>
                <Spinner color="blue" />
              </Container>
            )}
          </List>
        </Content>

        {this.state.selectedCounter > 0 ? (
          <Footer>
            <FooterTab>
              <Button full style={{ backgroundColor: '#1890ff' }}>
                <Text style={{ fontSize: 16, color: 'white' }}>NAUKA ({this.state.selectedCounter})</Text>
              </Button>
            </FooterTab>
          </Footer>
        ) : (
          <Text></Text>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  selected: {
    backgroundColor: '#B5E3D3',
    marginLeft: 0,
  },
  normal: { marginLeft: 0 },
  picker: { width: '50%', fontSize: 20 },
  containerPicker: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 45,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textPicker: {
    marginTop: 10,
    width: '50%',
    fontSize: 20,
    textAlign: 'center',
  },
});
