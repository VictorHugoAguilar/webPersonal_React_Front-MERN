import React, { useState, useEffect } from 'react';
import { List, Button, Icon, Modal as ModalAntd, notification, message } from 'antd';
import DragSortableList from 'react-drag-sortable';
import Modal from '../../../Modal';

// Importamos los componentes
import AddEditCourseForm from '../AddEditCourseForm';

// importamos las api de conexion con el server
import { getCourseDataUdemyApi, deleteCourseApi } from '../../../../api/course';
import { getAccessTokenApi } from '../../../../api/auth';

import './CoursesList.scss';

const { confirm } = ModalAntd;

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listCourseArray = [];
        courses.forEach(course => {
            listCourseArray.push({
                content: <Course course={course} deleteCourse={deleteCourse} />
            });
        });
        setListCourses(listCourseArray);
    }, [courses]);

    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
    }

    const addCourseModel = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando nuevo curso');
        setModalContent(
            <AddEditCourseForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
            />
        );
    }

    const deleteCourse = course => {
        const accessToken = getAccessTokenApi();
        confirm({
            title: 'Eliminando el curso',
            content: `¿Éstas seguro de eliminar el curso ${course.idCourse}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteCourseApi(accessToken, course._id)
                    .then(response => {
                        const typeNotification = response.code = 200 ? 'success' : 'warning';
                        notification[typeNotification]({
                            message: response.message
                        });
                    })
                    .catch(err => {
                        notification['error']({
                            message: err.message
                        });
                    });
            }
        });
    }

    return (
        <div className="courses-list">
            <div className="courses-list__header">
                <Button type="primary" onClick={ addCourseModel }>
                    <Icon type="plus" />
                    Nuevo curso
                </Button>
            </div>
            <div className="courses-list__items">
                {
                    listCourses.length === 0 && (
                        <h2 style={{ textAlign: "center", margin: 0 }} >
                            No tiene cursos creados aún
                    </h2>)
                }
                <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
            </div>
            <Modal 
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                { modalContent}
            </Modal>
        </div>
    );
}


function Course(props) {
    const { course, deleteCourse } = props;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse).then(response => {
            if (response.code !== 200) {
                notification['warning']({
                    message: response.data.detail
                });
            }
            setCourseData(response.data);
        }, [course]);
    });

    if (!courseData) {
        return null
    }

    return (
        <List.Item
            actions={[
                <Button type="primary" onClick={() => console.log('Editar curso')}>
                    <Icon type="edit" />
                </Button>,
                <Button type="danger" onClick={() => deleteCourse(course)}>
                    <Icon type="delete" />
                </Button>,
            ]}
        >
            <img src={courseData.image_480x270}
                alt={courseData.title}
                style={{ width: "100px", marginRight: "20px" }}
            />
            <List.Item.Meta
                title={` ${courseData.title} | ID: ${course.idCourse}  `}
                description={courseData.headline}
            />
        </List.Item>
    );
}
