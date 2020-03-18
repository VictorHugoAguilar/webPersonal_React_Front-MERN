import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Rate, notification, message } from 'antd';

// Importamos los servicios de la api
import { getCourseDataUdemyApi } from '../../../../api/course';

import './CoursesList.scss';

export default function CoursesList(props) {
    const { courses } = props;

    return (
        <div className="courses-list">
            <Row>
                {
                    courses.map(course => (
                        <Col key={course._id} md={8} className="courses-list__course">
                            <Course course={course} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}


function Course(props) {
    const { course } = props;
    const [courseInfo, setCourseInfo] = useState({});
    const [urlCourse, setUrlCourse] = useState("");
    const { Meta } = Card;

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
            .then(response => {
                if (response?.code !== 200) {
                    notification['warning']({
                        message: response.message
                    })
                } else {
                    setCourseInfo(response.data);
                    mounturl(response.data.url);
                }
            })
            .catch(err => {
                notification['error']({
                    message: 'Error en el servidor.'
                })
            });
    }, [course]);

    const mounturl = url => {
        if (!course.link) {
            const baseurl = `https://www.udemy.com${url}`;
            const finalUrl = baseurl +
                (course.coupon ? `?couponCode=${course.coupon}` : '');
            setUrlCourse(finalUrl);
        } else {
            setUrlCourse(course.link);
        }
    }

    return (
        <a href={urlCourse} target="_blank" rel="noopener noreferre">
            <Card
                cover={<img src={courseInfo.image_480x270} alt={course.title} />}
            >
                <Meta title={courseInfo.title} description={courseInfo.headline} />
                <Button >Entrar en el curso</Button>

                <div className="courses-list__course-footer">
                    <span className="courses-list__course-price">{course.price ? `${course.price} €` : courseInfo.price}</span>
                    <div>
                        <Rate disabled defaultValue={5} />
                    </div>
                </div>

            </Card>
        </a>
    );
}