import React, { Component } from 'react';
import FlashcardsContent from '../Flashcards/FlashcardsContent';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FlashsetCreate from './FlashsetCreate';
import FlashsetDelete from './FlashsetDelete';
import FlashcardsCreate from '../Flashcards/FlashcardsCreate';
const { Header, Content, Sider } = Layout;
class FlashsetsContent extends Component {
  render() {
    return (
      <Layout className="flashsets-layout">
        <Sider
          className="sider-flashsets"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo-flashsets">Twoje zestawy:</div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} className="menu-flashsets">
            <Menu.Item
              key="1"
              className="menuitem-flashsets"
              onClick={() => {
                console.log('zestaw1');
              }}
            >
              <UserOutlined />
              <span className="nav-text">zestaw 1</span>
            </Menu.Item>
            <Menu.Item key="2" className="menuitem-flashsets">
              <UserOutlined />
              <span className="nav-text">zestaw 2</span>
            </Menu.Item>
            <Menu.Item key="3" className="menuitem-flashsets">
              <UserOutlined />
              <span className="nav-text">zestaw 3</span>
            </Menu.Item>
          </Menu>
          <FlashsetCreate />
          <FlashsetDelete />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            Zestaw /1/:
            <FlashcardsCreate />
          </Header>

          <Content style={{ margin: '24px 16px 0' }} className="content-flashcards">
            <div className="site-layout-background" style={{ padding: 24 }}>
              <FlashcardsContent />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default FlashsetsContent;

/*<Content style={{ margin: '24px 16px 0' }} className="content-flashcards">
            <div className="site-layout-background" style={{ padding: 24 }}>
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Flashcard />
              <Pagination defaultCurrent={1} pageSize={5} total={20} />
            </div>
          </Content>*/
