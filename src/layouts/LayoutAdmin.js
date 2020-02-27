import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    // console.log('PROPS', props);
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Footer, Content } = Layout;

    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed} />
            <Layout className="layout-admin">
                <Header className="layout-admin__header" >
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
                </Header>
                <Content className="layout-admin__content" > Rutas
                    <LoadRutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer" > Victor Hugo Aguilar © </Footer>
            </Layout>
        </Layout>
    );
}

function LoadRutes(props) {
    const { routes } = props;
    // console.log(props);
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}