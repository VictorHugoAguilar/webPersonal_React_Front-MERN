import React from 'react';
import { Row, Col, Card, Icon } from 'antd';

import './HowMyCourseWork.scss';

export default function HowMyCourseWork() {

    return (
        <Row className="how-my-course-work">
            <Col lg={24} className="how-my-course-work__title">
                <h2>¿Cómo funcionan mis cursos?</h2>
                <h3>
                    Cada curso cuenta con contenido bajo la web de Udemy, activa las 24 horas al día los 365 días del año.
                </h3>
            </Col>
            <Col lg={4} />
            <Col lg={16} >
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon="clock-circle"
                            title="Cursos y Clases"
                            description="Cursos de entre 10 y 30 horas, cada clase de unos 10 minutos"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="key"
                            title="Acceso 24/7"
                            description="Acceso a los curso en cualquier momento, desde cualquier lugar"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="message"
                            title="Aprendizaje colaborativo"
                            description="Aprende con los demás dejando tus dudas a profesores y compañeros"
                        />
                    </Col>
                </Row>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon="user"
                            title="Mejora tu perfil"
                            description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="dollar"
                            title="Precios Bajos"
                            description="Obtén el curso que necesitas desde 9.99, y ten acceso para siempres"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="check-circle"
                            title="Certificado de finalización"
                            description="Certificados de finalización descargables al finalizarlos"
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
        </Row>
    );

}

function CardInfo(props) {
    const { icon, title, description} = props;
    const { Meta } = Card;

    return (
        <Card 
            className="how-my-course-work__card">
                <Icon type={icon} />
                <Meta title={title} description={description} />
            </Card>
    )
}