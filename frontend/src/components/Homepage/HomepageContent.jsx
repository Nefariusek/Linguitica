import React from 'react';
import { Button } from 'antd';
import { FileDoneOutlined, CalendarOutlined, ReadOutlined, BellOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProfileContent from './ProfileContent';

import Store from '../../Store';
import './HomepageContent.css';

class HomepageContent extends React.Component {
  static contextType = Store;

  render() {
    if (!this.context.hasPlant) {
      return (
        <div className="no-plant">
          Na początek stwórz swoją wymarzoną roślinkę.
          <br></br>
          <Button href="/plantCreation">Tworzenie rośliny</Button>
        </div>
      );
    } else {
      return (
        <div className="Wrapper">
          <div className="HomeProfile">
            <ProfileContent />
          </div>
          <div className="HomeButtons">
            <Link to="/flashsets">
              <Button block>
                <ReadOutlined className="buttonIcon" />
                <div className="buttonText">ZESTAWY</div>
              </Button>
            </Link>
            <Link to="/profile">
              <Button block>
                <CalendarOutlined className="buttonIcon" />
                <div className="buttonText">HARMONOGRAM</div>
              </Button>
            </Link>
            <Link to="/quests">
              <Button block>
                <BellOutlined className="buttonIcon" />
                <div className="buttonText">ZADANIA</div>
              </Button>
            </Link>
            <Link to="/flashcards">
              <Button block>
                <FileDoneOutlined className="buttonIcon" />
                <div className="buttonText">FISZKI</div>
              </Button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default HomepageContent;
