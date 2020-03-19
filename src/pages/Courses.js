import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Spin, notification } from 'antd';

// importamos las api
import { getCoursesApi } from '../api/course';

// Importamos componentes
import PresentationCourses from '../components/Web/Courses/PresentationCourses';
import CoursesList from '../components/Web/Courses/CoursesList';
import { Helmet } from 'react-helmet';

export default function Courses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        getCoursesApi()
            .then(response => {
                if (response.code !== 200) {
                    notification['warning']({
                        message: response.message
                    });
                } else {
                    setCourses(response.courses);
                }
            })
            .catch(err => {
                notification['error']({
                    message: 'Error en el servidor, vuelva a intertarlo.'
                });
            });
    }, []);


    return (
        <Fragment>
            <Helmet>
                <title>Cursos | Victor Hugo Aguilar Aguilar</title>
                <meta name="description" content="Home | Cursos sobre programación" data-react-helmet="true" />
            </Helmet>
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <PresentationCourses />
                    {!courses ? (
                        <Spin
                            tipe="Cargando cursos..."
                            style={{ textAlign: "center", width: "100%", padding: '20px' }}
                        />
                    ) : (
                            <CoursesList courses={courses} />
                        )}
                </Col>
                <Col md={4} />
            </Row>
        </Fragment>
    );
}