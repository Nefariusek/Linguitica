import React, { Component } from 'react';
import Flashcard from './Flashcard';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
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
          <Button
            onClick={() => {
              console.log('utworz nowy');
            }}
            className="button-flashsets"
          >
            Utwórz nowy
          </Button>
          <Button
            onClick={() => {
              console.log('usun zestaw');
            }}
            className="button-flashsets"
          >
            Usuń zestaw
          </Button>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0, fontSize: 22, textAlign: 'center' }}
          >
            Zestaw /1/:
          </Header>
          <Content style={{ margin: '24px 16px 0' }} className="content-flashcards">
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
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Linguitica ©2020</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default FlashsetsContent;
