import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import Menu from './Menu';

class LearningContent extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Nauka</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Menu />
        </Content>

        <Footer>
          <FooterTab style={{ position: 'absolute' }}>
            <Button full>
              <Text>Linguitica</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default LearningContent;
