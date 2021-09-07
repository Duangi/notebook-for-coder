import React from 'react'
import "../css/second.css"
import { Layout,Button  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function Second() {
    return (
      <>      
      <Button type="primary">Primary Button</Button>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
  
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
  
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Sider>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </>
    ) 
}

export default Second
