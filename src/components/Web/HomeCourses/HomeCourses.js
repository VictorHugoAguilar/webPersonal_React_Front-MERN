import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';

// Importamos las imágenes
import reactImage from '../../../assets/img/jpg/react.jpg';
import angularImage from '../../../assets/img/jpg/angular.jpg';
import nodeImage from '../../../assets/img/jpg/node.jpg';
import javaImage from '../../../assets/img/jpg/java.jpg';
import javascriptImage from '../../../assets/img/jpg/javascript.jpg';
import cssGridImage from '../../../assets/img/jpg/css-grid.jpg';

import './HomeCourses.scss';

export default function HomeCourses() {
    return (
        <Row className="home-courses">
            <Col lg={24} className="home-courses__title">
                <h2>Aprende y mejora tus habilidades</h2>
            </Col>
            <Col lg={4}></Col>
            <Col lg={16}>
                <Row className="row-courses">
                    <Col md={6}> 
                        <CardCourse 
                            image={reactImage}
                            title="React Js"
                            subtitle="Descripción React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo web a desarrolladores ..."
                            link="https://www.udemy.com/courses/search/?src=ukw&q=react"
                        /> 
                    </Col>
                    <Col md={6}> 
                        <CardCourse 
                            image={angularImage}
                            title="Angular"
                            subtitle="Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantene..."
                            link="https://www.udemy.com/courses/search/?src=ukw&q=angular"
                        /> 
                    </Col>
                    <Col md={6}> 
                        <CardCourse 
                            image={nodeImage}
                            title="Node.Js"
                            subtitle="Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación ECMAS..."
                            link="https://www.udemy.com/courses/search/?src=ukw&q=node"
                        /> 
                    </Col>
                    <Col md={6}> 
                        <CardCourse 
                            image={javaImage}
                            title="Java"
                            subtitle="La plataforma Java es el nombre de un entorno o plataforma de computación originaria de Sun Microsystems, capaz de ejecutar aplicaciones desarrolladas..."
                            link="https://www.udemy.com/courses/search/?src=ukw&q=java"
                        /> 
                    </Col>
                    </Row>
                    <Row className="row-courses">
                    <Col md={6}> 
                        <CardCourse 
                            image={javascriptImage}
                            title="Javascript ES6"
                            subtitle="JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos, ​ basado en prototipos, ..."
                            link="https://www.udemy.com/courses/search/?src=ukw&q=javascript"
                        /> 
                    </Col>
                    <Col md={6}> 
                        <CardCourse 
                            image={cssGridImage}
                            title="CSS-Grid"
                            subtitle="CSS, en español «Hojas de estilo en cascada», es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escri... ​"
                            link="https://www.udemy.com/courses/search/?src=ukw&q=cssGrid"
                        /> 
                    </Col>
                    <Col md={6} /> 
                    <Col md={6} />
                </Row>
            </Col>
            <Col lg={4}></Col>
            <Col lg={24} className="home-courses__more">
                <Link to="/courses">
                    <Button>Ver más ...</Button>
                </Link>
            </Col>
        </Row>
    );
}

function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Card
                    className="home-courses__card"
                    cover={<img src={image} alt={title} />}
                    actions={ [<Button>Ingresar</Button>]}
                >
                    <Meta title={title} description={subtitle} />
                </Card>
            </a>
    );
}