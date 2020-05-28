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
  View,
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
    chwiloweZestawy: [
      { title: 'zestaw1' },
      { title: 'zestaw2' },
      { title: 'zestaw3' },
      { title: 'zestaw4' },
      { title: 'zestaw5' },
      { title: 'zestaw6' },
    ],
    chwiloweFiszki: [
      { polish: 'polska', german: 'niemcy', category: 'kat' },
      { polish: 'polska2', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska3', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska4', german: 'niemcy', category: 'kat' },
      { polish: 'polska5', german: 'niemcy2', category: 'kat3' },
      { polish: 'polska6', german: 'niemcy2', category: 'kat3' },
    ],
    selectedRowKeys: [],
    selectedCounter: 0,
    selectedFlashcards: [],
    temp: [],
    selected: [],
  };

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
            <Title>Twoje zestawy (:{this.state.currentTab + 1})</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Tabs
            onChangeTab={this.changeTab}
            renderTabBar={() => <ScrollableTab style={{ backgroundColor: '#1890ff' }} />}
          >
            {this.state.chwiloweZestawy.map((val, key) => (
              <Tab
                heading={
                  <TabHeading style={{ backgroundColor: '#1890ff' }}>
                    <Text>{val.title}</Text>
                  </TabHeading>
                }
              >
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
              </Tab>
            ))}
          </Tabs>
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
