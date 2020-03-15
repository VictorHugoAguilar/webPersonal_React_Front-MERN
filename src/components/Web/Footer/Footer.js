import React from 'react';

import { Layout, Row, Col } from 'antd'

// Importamos los componentes
import MyInfo from './MyInfo';
import NavigationFooter from './NavigationFooter';

import './Footer.scss';

export default function Footer() {

    const { Footer } = Layout;

    return (
        <Footer className="footer">
            <Row>
                <Col md={4} />
                <Col md={16} >
                    <Row>
                        <Col md={8} >
                            <MyInfo />
                        </Col>
                        <Col md={8} >
                            <NavigationFooter />
                        </Col>
                        <Col md={8} >
                            NewsLetter
                         </Col>
                    </Row>
                </Col>
                <Col md={4} />
            </Row>
            <Row className="footer__copyright">
                <Col md={12}>
                    © 2020 All right reserved
                </Col>
                <Col md={12}>
                    Victor Hugo Aguilar Aguilar | Desarrollador Web
                </Col>
            </Row>
        </Footer>
    );
}
