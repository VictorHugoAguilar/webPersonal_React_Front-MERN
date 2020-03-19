import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';

// importamos los compoenentes
import MenuTop from '../components/Web/MenuTop';
import Footer  from '../components/Web/Footer';

import './LayoutBasic.scss';

export default function LayoutBasic(props) {
    const { routes } = props;

    return (
        <Fragment>
            <Row>
                <Col lg={4} />
                <Col lg={16} >
                    <MenuTop />

                </Col>
                <Col lg={4} />
            </Row>
            <LoadRutes routes={routes} />
            <Footer />
        </Fragment>
    );
};

function LoadRutes(props) {
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