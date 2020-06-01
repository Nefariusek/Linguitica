import React, { Component } from 'react';

import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import CardLearning from './CardLearning';
import QuizLearning from './QuizLearning';
import WriteLearning from './WriteLearning';

export default class Menu extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Icon name="bookmarks" />
                <Text>Fiszki</Text>
              </TabHeading>
            }
          >
            <CardLearning />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="create" />
                <Text>Pisanie</Text>
              </TabHeading>
            }
          >
            <WriteLearning />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="paper" />
                <Text>Quiz</Text>
              </TabHeading>
            }
          >
            <QuizLearning />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
