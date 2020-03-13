import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

// importamos los compoenentes
import MenuTop from '../components/Web/MenuTop'

import './LayoutBasic.scss';

export default function LayoutBasic(props) {

    const { routes } = props;
    const { Footer } = Layout;

    return (
        <Row>
            <Col lg={4} />
            <Col lg={16} >
            <MenuTop />
            <LoadRutes routes={routes} />
            <Footer> Victor Hugo Aguilar Aguilar  © </Footer>
            </Col>
            <Col lg={4} />
        </Row>
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