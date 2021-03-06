import React from 'react';
import setHeaders from '../../utils/setHeadersMobile';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Spinner,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Toast,
} from 'native-base';

export default class Quests extends React.Component {
  state = { quests: [], isLoaded: false };

  getQuests = async () => {
    const response = await fetch('http://linguitica.herokuapp.com/api/quests', setHeaders());
    const body = await response.json();

    await this.setState({ quests: body });
    await console.log(this.state.quests);
  };
  componentDidMount = async () => {
    await this.getQuests();
    await this.setState({ isLoaded: true });
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
            <Title>Twoje zadania</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {this.state.isLoaded ? (
            this.state.quests.map(
              (val, key) =>
                (val.status === 'in_progress' && (
                  <Card key={key}>
                    <CardItem header bordered style={styles.normal}>
                      <Text style={styles.textHeader}>Cel: {val.goal}</Text>
                    </CardItem>
                    <CardItem bordered style={styles.normal}>
                      <Body>
                        <Text>Opis: {val.description}</Text>
                      </Body>
                    </CardItem>

                    <CardItem bordered style={styles.normal}>
                      <View
                        style={{
                          backgroundColor: '#FFCB47',
                          width: '45%',
                          height: '120%',
                          borderRadius: 30,
                          marginRight: '10%',
                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginTop: '6%',
                            marginLeft: '4%',
                          }}
                        >
                          {' '}
                          PRIORYTET: {val.priority}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '5%', marginLeft: '8%' }} name="done-all" />
                      </View>
                      <View
                        style={{
                          backgroundColor: '#B0CFE8',
                          width: '45%',
                          height: '120%',
                          borderRadius: 30,

                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            marginLeft: 0,
                            fontSize: 16,
                            marginTop: '6%',
                            marginLeft: '4%',
                          }}
                        >
                          {' '}
                          DŁUGOŚĆ: {val.duration}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '5%', marginLeft: '8%' }} name="time" />
                      </View>
                    </CardItem>
                    <CardItem bordered style={styles.normal}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: '100%',
                          height: '120%',
                          borderRadius: 30,

                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginTop: '3%',
                          }}
                        >
                          {' '}
                          DATA ZAKOŃCZENIA: {val.finish_date.slice(0, 10)} {val.finish_date.slice(11, 19)}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '2%', marginLeft: '3%' }} name="alarm" />
                      </View>
                    </CardItem>

                    <CardItem footer bordered style={styles.inProgress}>
                      <Text style={styles.textFooter}>STATUS: W TRAKCIE</Text>
                    </CardItem>
                  </Card>
                )) ||
                (val.status === 'failed' && (
                  <Card key={key}>
                    <CardItem header bordered style={styles.normal}>
                      <Text style={styles.textHeader}>Cel: {val.goal}</Text>
                    </CardItem>
                    <CardItem bordered style={styles.normal}>
                      <Body>
                        <Text>Opis: {val.description}</Text>
                      </Body>
                    </CardItem>
                    <CardItem bordered style={styles.normal}>
                      <View
                        style={{
                          backgroundColor: '#FFCB47',
                          width: '45%',
                          height: '120%',
                          borderRadius: 30,
                          marginRight: '10%',
                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginTop: '6%',
                            marginLeft: '4%',
                          }}
                        >
                          {' '}
                          PRIORYTET: {val.priority}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '5%', marginLeft: '8%' }} name="done-all" />
                      </View>
                      <View
                        style={{
                          backgroundColor: '#B0CFE8',
                          width: '45%',
                          height: '120%',
                          borderRadius: 30,

                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            marginLeft: 0,
                            fontSize: 16,
                            marginTop: '6%',
                            marginLeft: '4%',
                          }}
                        >
                          {' '}
                          DŁUGOŚĆ: {val.duration}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '5%', marginLeft: '8%' }} name="time" />
                      </View>
                    </CardItem>
                    <CardItem footer bordered style={styles.failed}>
                      <Text style={styles.textFooter}>STATUS: NIEPOWODZENIE</Text>
                    </CardItem>
                  </Card>
                )) || (
                  <Card key={key}>
                    <CardItem header bordered style={styles.normal}>
                      <Text style={styles.textHeader}>Cel: {val.goal}</Text>
                    </CardItem>
                    <CardItem bordered style={styles.normal}>
                      <Body>
                        <Text>Opis: {val.description}</Text>
                      </Body>
                    </CardItem>
                    <CardItem bordered style={styles.normal}>
                      <View
                        style={{
                          backgroundColor: '#FFCB47',
                          width: '45%',
                          height: '120%',
                          borderRadius: 30,
                          marginRight: '10%',
                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginTop: '6%',
                            marginLeft: '4%',
                          }}
                        >
                          {' '}
                          PRIORYTET: {val.priority}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '5%', marginLeft: '8%' }} name="done-all" />
                      </View>
                      <View
                        style={{
                          backgroundColor: '#B0CFE8',
                          width: '45%',
                          height: '120%',
                          borderRadius: 30,

                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            marginLeft: 0,
                            fontSize: 16,
                            marginTop: '6%',
                            marginLeft: '4%',
                          }}
                        >
                          {' '}
                          DŁUGOŚĆ: {val.duration}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '5%', marginLeft: '8%' }} name="time" />
                      </View>
                    </CardItem>
                    <CardItem bordered style={styles.normal}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: '100%',
                          height: '120%',
                          borderRadius: 30,

                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginTop: '3%',
                          }}
                        >
                          {' '}
                          DATA ZAKOŃCZENIA: {val.finish_date.slice(0, 10)} {val.finish_date.slice(11, 19)}
                        </Text>
                        <Icon style={{ color: 'black', marginTop: '2%', marginLeft: '3%' }} name="alarm" />
                      </View>
                    </CardItem>
                    <CardItem footer bordered style={styles.completed}>
                      <Text style={styles.textFooter}>STATUS: UKOŃCZONO!</Text>
                    </CardItem>
                  </Card>
                ),
            )
          ) : (
            <Container>
              <Spinner color="blue" />
            </Container>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  completed: {
    backgroundColor: '#0AFFBA',
  },
  inProgress: {
    backgroundColor: '#41C5DC',
  },
  failed: {
    backgroundColor: '#FF3F00',
  },
  normal: {
    backgroundColor: '#E7E2DA',
  },
  textFooter: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
  textHeader: {
    color: 'black',
    fontSize: 20,
  },
});
