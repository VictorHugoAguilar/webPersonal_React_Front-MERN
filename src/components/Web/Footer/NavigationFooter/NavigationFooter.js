import React from 'react';
import { Row, Col, Icon } from 'antd';

import { Link } from 'react-router-dom';

import './NavigationFooter.scss';


export default function NavigationFooter() {
    return (
        <Row className="navigation-footer">
            <Col>
                <h3>Navegación</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft />
            </Col>
            <Col md={12}>
                <RenderListRight />
            </Col>
        </Row>
    );
}

function RenderListLeft() {
    return (
        <ul>
            <li>
                <Link to="/contact">
                    <Icon type="book" /> Cursos Online
                </Link>
            </li>
            <li>
                <Link to="/contact">
                    <Icon type="code" /> Desarrollo Web
                </Link>
            </li>
            <li>
                <Link to="/contact">
                    <Icon type="database" /> Base de Datos
                </Link>
            </li>
            <li>
                <Link to="/contact">
                    <Icon type="right" /> Politica de privacidad
                </Link>
            </li>
        </ul>
    );
}

function RenderListRight() {
    return (
        <ul>
            <li>
                <Link to="/contact">
                    <Icon type="hdd" /> Sistemas / Servidores
                </Link>
            </li>
            <li>
                <Link to="/contact">
                    <Icon type="appstore" /> CMS
                </Link>
            </li>
            <li>
                <Link to="/contact">
                    <Icon type="user" /> Porfolio
                </Link>
            </li>
            <li>
                <Link to="/contact">
                    <Icon type="right" /> Politica de cookies
                </Link>
            </li>
        </ul>
    );
}