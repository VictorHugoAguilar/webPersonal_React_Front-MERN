import React, { useState, useEffect } from 'react';
import { notification } from 'antd';

// Importamos los componentes
import CourseList from '../../components/Admin/Courses/CoursesList';

// importamos las api de conexion al server
import { getCoursesApi } from '../../api/course';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [reloadCourses, setReloadCourses] = useState(false);

    // useEffect
    useEffect(() => {
        getCoursesApi()
            .then(response => {
                setCourses(response.courses);
            })
            .catch(err =>
                notification['error']({ message: err.message })
            );
    }, [reloadCourses]);

    return (
        <div className="courses">
            <h1>Administrar cursos</h1>
            <CourseList courses={courses} setReloadCourses={setReloadCourses} />
        </div>
    );
}