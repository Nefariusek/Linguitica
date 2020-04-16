import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class Cards extends Component {
  render() {
    let data = [
      { title: 'Card title1', value: 'Card content1' },
      { title: 'Card title2', value: 'Card content2' },
      { title: 'Card title3', value: 'Card content3' },
      { title: 'Card title4', value: 'Card content4' },
      { title: 'Card title5', value: 'Card content5' },
      { title: 'Card title6', value: 'Card content6' },
      { title: 'Card title7', value: 'Card content7' },
      { title: 'Card title8', value: 'Card content8' },
      { title: 'Card title9', value: 'Card content9' },
      { title: 'Card title10', value: 'Card content10' },
      { title: 'Card title11', value: 'Card content11' },
      { title: 'Card title12', value: 'Card content12' },
      { title: 'Card title13', value: 'Card content13' },
      { title: 'Card title14', value: 'Card content14' },
      { title: 'Card title15', value: 'Card content15' },
      { title: 'Card title1', value: 'Card content1' },
      { title: 'Card title2', value: 'Card content2' },
      { title: 'Card title3', value: 'Card content3' },
      { title: 'Card title4', value: 'Card content4' },
      { title: 'Card title5', value: 'Card content5' },
      { title: 'Card title6', value: 'Card content6' },
      { title: 'Card title7', value: 'Card content7' },
      { title: 'Card title7', value: 'Card content7' },
      { title: 'Card title8', value: 'Card content8' },
      { title: 'Card title9', value: 'Card content9' },
      { title: 'Card title10', value: 'Card content10' },
      { title: 'Card title11', value: 'Card content11' },
      { title: 'Card title12', value: 'Card content12' },
      { title: 'Card title13', value: 'Card content13' },
      { title: 'Card title999', value: 'Card content9' },
    ];
    return (
      <div>
        {data.map((val) => (
          <Card title={val.title} style={{ width: 290, padding: 6 }}>
            <p>{val.value}</p>
            <Button onClick={this.handleOpen} id={val.id}>
              Wybierz
              <PlusOutlined />
            </Button>
          </Card>
        ))}
      </div>
    );
  }
}

export default Cards;
