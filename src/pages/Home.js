import React from 'react';

// Importamos componentes
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import HowMyCourseWork from '../components/Web/HowMyCourseWork';
import ReviewsCourses from '../components/Web/ReviewsCourses';


export default function Home() {
    return (
        <div>
            <MainBanner />
            <HomeCourses />
            <HowMyCourseWork />
            <ReviewsCourses />
        </div>
    );
}