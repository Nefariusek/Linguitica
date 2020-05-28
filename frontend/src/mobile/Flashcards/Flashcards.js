import React, { Component, useEffect } from 'react';
import { Alert, StyleSheet, TouchableHighlight, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import setHeaders from '../../utils/setHeaders';
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
  Toast,
} from 'native-base';

export default class Flashcards extends Component {
  state = {
    flashcards: [],
    selected: [],
    selectedPicker: 'wszystkie',
    selectedPicker2: 'wszystkie',
    selectedFlashcards: [],
    temp: [],
    chwiloweFiszki: [
      { polish: 'polska', german: 'niemcy', category: 'kat' },
      { polish: 'polska2', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska3', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska4', german: 'niemcy', category: 'kat' },
      { polish: 'polska5', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska6', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska7', german: 'niemcy', category: 'kat' },
      { polish: 'polska8', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska9', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska10', german: 'niemcy', category: 'kat' },
      { polish: 'polska11', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska12', german: 'niemcy2', category: 'kat3' },
    ],
    selectedRowKeys: [],
    selectedCounter: 0,
  };
  getFlashcards = async () => {
    const response = await fetch('/api/quests', setHeaders());
    const body = await response.json();

    this.setState({ flashcards: body });
  };
  componentDidMount() {
    // this.getFlashcards();
    for (let i = 0; i < this.state.chwiloweFiszki.length; i++) {
      const { selected } = this.state;
      selected[i] = false;
    }
  }

  onSelectChange = async (selectedRowKeys) => {
    this.setState({ selectedFlashcards: [] });
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    const { selected } = this.state;
    selected[selectedRowKeys] = !selected[selectedRowKeys];
    this.setState({ selected });
    // console.log('wybrane fiszki: ', this.state.selected);
    let counter = 0;

    for (let i = 0; i < (await this.state.selected.length); i++) {
      if (this.state.selected[i] === true) {
        counter++;
        await this.state.selectedFlashcards.push(this.state.chwiloweFiszki[i]);
      }
    }

    this.setState({ selectedCounter: counter });
    console.log('selected flashcards: ', this.state.selectedFlashcards);
  };

  onValueChange = async (value) => {
    await this.setState({
      selectedPicker: value,
    });
  };
  onValueChange2 = async (value) => {
    await this.setState({
      selectedPicker2: value,
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
                selectedValue={this.state.selectedPicker}
                onValueChange={this.onValueChange}
              >
                <Picker.Item label="Wszystkie" value="wszystkieKategorie" />
                <Picker.Item label="Pojazdy" value="pojazdy" />
                <Picker.Item label="Elektronika" value="elektronika" />
                <Picker.Item label="Ludzie" value="ludzie" />
                <Picker.Item label="Dom" value="dom" />
                <Picker.Item label="Internet" value="internet" />
                <Picker.Item label="Ogólne" value="ogolne" />
                <Picker.Item label="Emocje" value="emocje" />
                <Picker.Item label="Inne" value="inne" />
              </Picker>
            </Container>
            <Container style={styles.containerPicker}>
              <Text style={styles.textPicker}>Poziom:</Text>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Poziom"
                style={styles.picker}
                selectedValue={this.state.selectedPicker2}
                onValueChange={this.onValueChange2}
              >
                <Picker.Item label="Wszystkie" value="wszystkiePoziomy" />
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
            {this.state.chwiloweFiszki.map((val, key) => (
              <ListItem
                key={key}
                onPress={() => this.onSelectChange(key)}
                //  onLongPress={this.onLongPress(key)}
                style={[this.state.selected[key] ? styles.selected : styles.normal]}
              >
                <Body>
                  <Text style={{ fontSize: 22 }}>{val.polish}</Text>
                  <Text note numberOfLines={3} style={{ fontSize: 16 }}>
                    {val.german} {val.category}
                  </Text>
                </Body>
                <Right>
                  <Button transparent onPress={() => Alert.alert(val.polish, val.german)}>
                    <Icon style={{ color: '#1890ff' }} name="information-circle" />
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>

        {this.state.selectedCounter > 0 ? (
          <Footer>
            <FooterTab>
              <Button full style={{ backgroundColor: '#1890ff' }}>
                <Text style={{ fontSize: 16, color: 'white' }}>NAUKA</Text>
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
    backgroundColor: '#B8FBFF',
    marginLeft: 0,
  },
  normal: { marginLeft: 0 },
  picker: { width: '50%', fontSize: 20 },
  containerPicker: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 40,
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

/*
      <List>
            {chwiloweFiszki.map((val, key) => (
            
                <ListItem key={key} onPress={() => (this.selected = !this.selected)}>
                  <Body>
                    <Text style={{ fontSize: 22 }}>{val.polish}</Text>
                    <Text note numberOfLines={3} style={{ fontSize: 16 }}>
                      {val.german} {val.category}
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => Alert.alert(val.polish, val.german)}>
                      <Icon name="add" />
                    </Button>
                  </Right>
                </ListItem>
             
            ))}
          </List> */

/*
        <List
            dataArray={this.state.chwiloweFiszki}
            renderRow={(item, id) => (
              <ListItem style={styles.button} key={item.polish} onPress={() => this.selectFriend(id)}>
                <Body>
                  <Text style={{ fontSize: 22 }}>{item.polish}</Text>
                  <Text note numberOfLines={3} style={{ fontSize: 16 }}>
                    {item.german} {item.category}
                  </Text>
                </Body>
                <Right>
                  <Button transparent onPress={() => Alert.alert(item.polish, item.german)}>
                    <Icon name="add" />
                  </Button>
                </Right>
              </ListItem>
            )}
          ></List> */
