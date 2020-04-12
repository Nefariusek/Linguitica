import React from 'react';
import { Progress, message, Descriptions, Avatar, Badge, Button } from 'antd';

import { UserOutlined } from '@ant-design/icons';

const info = () => {
  message.info('ZA DWA DNI KONIEC WYZWANIA');
};

class UserInformation extends React.Component {
  render() {
    return (
      <div className="userInformation">
        <div className="avatar">
          <span className="avatar-item">
            <Badge count={1}>
              <Avatar shape="square" icon={<UserOutlined className="userIcon" />} />
            </Badge>
          </span>
        </div>
        <div>
          <Descriptions title="Informacje" layout="horizontal">
            <Descriptions.Item label="UserName">username</Descriptions.Item>
          </Descriptions>
        </div>
        <div className="progressBars">
          <Progress
            width="8vw"
            className="daysCount"
            strokeColor="#95e616"
            type="circle"
            percent={10}
            format={(percent) => `${percent} Days`}
          />
          <Progress width="8vw" strokeColor="#0070ad" type="circle" percent={45} format={() => 'Done'} />
        </div>
        <div className="messageDiv">
          <Button className="message" color="#0070ad" block="true" type="primary" onClick={info}>
            Przypomnienie!
          </Button>
        </div>
      </div>
    );
  }
}

export default UserInformation;
