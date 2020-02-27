import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';

import './MenuSider.scss';

export default function MenuSider(props) {
    // console.log(props)
    const { Sider } = Layout;
    const { menuCollapsed } = props;

    return (
        <Sider className="menu-sider" collapsed={menuCollapsed} >
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="1">
                    <Link to={"/admin"}>
                        <Icon type="home" />
                        <span className="nav-text">Home</span>
                    </Link>

                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/admin/menu-web"}>
                        <Icon type="menu" />
                        <span className="nav-text">Menu Web</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

