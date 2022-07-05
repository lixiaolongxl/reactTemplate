// @ts-nocheck

import React from 'react';
import { Layout} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import Menus from './Menus'
import MyBreadcrumb from './MyBreadcrumb'

const { Header, Sider, Content } = Layout;

class LayoutDemo extends React.Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
        <Layout className="components-layout-demo-custom-trigger">
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
                <Menus/>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                    })}
                    <MyBreadcrumb/>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                >
                    {this.props.children}
                </Content>
            </Layout>
        </Layout>
        );
    }
}
export default LayoutDemo;