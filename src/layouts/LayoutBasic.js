import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import './LayoutBasic.scss';

export default function LayoutBasic(props) {

    const { routes } = props;
    const { Header, Footer, Content } = Layout;

    return (
        <Layout>
            <h2>Menu Sider Basic Layout</h2>
            <Header>
                Header
            </Header>
            <Content>
                <LoadRutes routes={routes} />
            </Content>
            <Footer> Victor Hugo Aguilar ©</Footer>
        </Layout>
    );
};

function LoadRutes(props) {
    // console.log(props);
    const { routes } = props;
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