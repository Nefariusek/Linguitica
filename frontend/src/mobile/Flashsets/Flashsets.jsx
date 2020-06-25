import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
  Spinner,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading,
} from 'native-base';

export default class Flashcards extends Component {
  state = {
    active: false,
    currentTab: 0,
    selectedRowKeys: [],
    selectedCounter: 0,
    selectedFlashcards: [],
    temp: [],
    selected: [],
    isLoaded: false,
    flashsetsID: [],
    flashsets: [],
    length: 0,
  };
  static contextType = Store;
  changeTab = async (props) => {
    await this.setState({ currentTab: props.i });
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
        await this.state.selectedFlashcards.push(this.state.chwiloweFiszki[i]);
      }
    }

    this.setState({ selectedCounter: counter });
    console.log('selected flashcards: ', this.state.selectedFlashcards);
  };
  getFlashsetsID = async () => {
    const response = await fetch('http://linguitica.herokuapp.com/api/plants/5ed3db66415db20017e14e86', setHeaders()); //id testowe
    const body = await response.json();

    await this.setState({ flashsetsID: body.flashsets, length: body.flashsets.length });

    if ((await this.state.length) > 0) {
      this.setState({ flashsets: [] });
      for (let i = 0; i < this.state.length; i++) {
        await this.getFlashsets(this.state.flashsetsID[i]);
      }
      await this.setState({ isLoaded: true });
    }
  };
  getFlashsets = async (id) => {
    const response = await fetch(`http://linguitica.herokuapp.com/api/flashsets/${id}`, setHeaders());
    const body = await response.json();

    this.state.flashsets.push(body);
  };
  componentDidMount = async () => {
    await this.getFlashsetsID();

    for (let i = 0; i < (await this.state.flashsets.flashcards.length); i++) {
      const { selected } = this.state;
      selected[i] = false;
    }
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#1890ff' }} hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body>
            <Title>Twoje zestawy</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          {this.state.isLoaded ? (
            <Tabs
              onChangeTab={this.changeTab}
              renderTabBar={() => <ScrollableTab style={{ backgroundColor: '#1890ff' }} />}
            >
              {this.state.flashsets.map((val, keyy) => (
                <Tab
                  heading={
                    <TabHeading style={{ backgroundColor: '#1890ff' }}>
                      <Text>{val.title}</Text>
                    </TabHeading>
                  }
                >
                  <List>
                    {this.state.flashsets[keyy].flashcards.map((val, key) => (
                      <ListItem
                        key={key}
                        onPress={() => this.onSelectChange(key)}
                        //  onLongPress={this.onLongPress(key)}
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
                          style={{ backgroundColor: 'lightgrey', height: '70%' }}
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
                            (val.category === 'technologia' && (
                              <Icon style={{ color: 'black' }} name="phone-portrait" />
                            )) ||
                            (val.category === 'zawody' && <Icon style={{ color: 'black' }} name="briefcase" />) ||
                            (val.category === 'podróże' && <Icon style={{ color: 'black' }} name="jet" />) ||
                            (val.category === 'elektronika' && (
                              <Icon style={{ color: 'black' }} name="phone-portrait" />
                            )) ||
                            (val.category === 'ludzie' && <Icon style={{ color: 'black' }} name="people" />) ||
                            (val.category === 'internet' && (
                              <Icon style={{ color: 'black' }} name="phone-portrait" />
                            )) ||
                            (val.category === 'ogolne' && <Icon style={{ color: 'black' }} name="list" />) ||
                            (val.category === 'inne' && <Icon style={{ color: 'black' }} name="list" />) ||
                            (val.category === 'zwierzeta' && <Icon style={{ color: 'black' }} name="paw" />) ||
                            (val.category === 'medycyna' && <Icon style={{ color: 'black' }} name="medkit" />) ||
                            (val.category === 'historia' && <Icon style={{ color: 'black' }} name="archive" />)}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Tab>
              ))}
            </Tabs>
          ) : (
            <Container>
              <Spinner color="blue" />
            </Container>
          )}
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
});
