import React from 'react';
import './App.scss'
import { Layout } from 'antd';
import 'antd/dist/antd.css';
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout className="main-page-layout">
        <Sider className="main-page-sider">Sider</Sider>
        <Layout className="main-page-layout-right">
            <Header className="main-page-header">Header</Header>
            <Content className="main-page-content">Content</Content>
            <Footer className="main-page-footer">Footer</Footer>
        </Layout>
    </Layout>
  );
}

export default App;
