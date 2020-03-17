import React from 'react';

import AcademyLogo from '../../../../assets/img/png/Academia.png';

import './PresentationCourses.scss';


export default function PresentationCourses() {

    return (
        <div className="presentation-courses">
            <img src={AcademyLogo} alt="Cursos en udemy" />
            <p>
                En Udemy vas a encontrar una gran variedad de cursos online de
                desarrollo en español, ingles. Únete a udemy y empieza tu camino como
                Desarrollador Web o Desarrollador de CMS. Sinceramente, en estos cursos es
                el tipo de contenido que a mi me hubiera gustado encontrar cuando empezé en
                el mundo del desarrollo web profesional.
            </p>
            <p>
                ¡¡¡ Échales un vistazo y aprovecha las ofertas !!!
            </p>
        </div>
    );
}