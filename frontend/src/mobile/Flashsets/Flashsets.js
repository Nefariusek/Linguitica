import React, { Component, useEffect } from 'react';
import { Alert, StyleSheet, TouchableHighlight, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Store from '../../Store';
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
  Spinner,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading,
  Fab,
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
    // console.log(this.state.currentTab);
    console.log(this.state.currentTab);
  };
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
                          <Text style={{ fontSize: 22 }}>{val.polish}</Text>
                          <Text note numberOfLines={3} style={{ fontSize: 16 }}>
                            {val.german} {val.category}
                          </Text>
                        </Body>
                        <Right>
                          <Button
                            transparent
                            onPress={() => Alert.alert(this.state.flashsets[keyy].flashcards[key].polish)}
                          >
                            <Icon style={{ color: '#1890ff' }} name="information-circle" />
                          </Button>
                        </Right>
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
