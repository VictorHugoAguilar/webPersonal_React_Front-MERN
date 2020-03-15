import React from 'react';
import { Row, Col, Card, Avatar } from 'antd';

// importamos imagenes de perfiles
import perfil1Image from '../../../assets/img/jpg/perfil1.jpg';
import perfil2Image from '../../../assets/img/jpg/perfil2.jpg';
import perfil3Image from '../../../assets/img/jpg/perfil3.jpg';



import './ReviewsCourses.scss';

export default function ReviewsCourses() {

    return (
        <Row className="reviews-courses">
            <Row>
                <Col lg={4} />
                <Col lg={16} className="reviews-courses__title">
                    <h2>Forma parte de los +35K estudiantes que estan aprendiendo en udemy</h2>
                </Col>
                <Col lg={4} />
            </Row>
            <Row>
                <Col lg={4} />
                <Col lg={16} className="reviews-courses__title">
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                                name="Paula Valeria Rodriguez"
                                subtitle="Alumna de Udemy"
                                avatar={perfil1Image}
                                review="Muy buen curso, explicado al detalle, solo que para algunos que ya conocemos de ciertas cosas puede ser un poco tedioso tanta explicación, yo recomiendo adelantar algunas partes, pero eso solo para los que tienen un poco de conocimiento de cursos previos, fuera de eso muy buen curso"
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Jonh Doe"
                                subtitle="Student in Udemy"
                                avatar={perfil2Image}
                                review="Very good course. First-time contact with Python. I have learned a while ago HTML but not practised too much, so I was a bit familiar with programming. What I would recommend is to insert a bit more exercises with explanations. "
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Jose Miguel Alvarez"
                                subtitle="Alumno de Udemy"
                                avatar={perfil3Image}
                                review="Soy licenciado en matemáticas, especializado en el análisis de datos para empresas de videojuegos con R y Python, en Game Design para videojuegos de social casino, en el desarrollo de aplicaciones móviles para iOS y para Android y desarrollador de videojuegos utilizando los motores Unreal Engine y Unity tanto para PC como para móvil desde el año 2011."
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>
        </Row>
    );

}


function CardReview(props){

    const { name, subtitle, avatar, review } = props;
    const { Meta  } = Card;

    return (
        <Card className="reviews-courses__card">
            <p>{review}</p>
            <Meta 
                avatar={ <Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
        );

}