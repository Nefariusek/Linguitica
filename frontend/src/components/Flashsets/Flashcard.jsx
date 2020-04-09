import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
class Flashcard extends Component {
  render() {
    return (
      <Card
        size="small"
        title="Fiszka"
        style={{ width: 300 }}
        //actions={[<EditOutlined key="edit" />]}
      >
        <p>Monitor</p>
        <p>der Bildschrim, -e</p>
        <Button
          onClick={() => {
            console.log('clicked');
          }}
        >
          Edytuj
          <EditOutlined key="edit" />
        </Button>
      </Card>
    );
  }
}

export default Flashcard;
