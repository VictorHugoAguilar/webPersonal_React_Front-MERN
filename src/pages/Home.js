import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

// Importamos componentes
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import HowMyCourseWork from '../components/Web/HowMyCourseWork';
import ReviewsCourses from '../components/Web/ReviewsCourses';


export default function Home() {
    return (
        <Fragment>
            <Helmet>
                <title>Web Personal - Home | Victor Hugo Aguilar Aguilar</title>
                <meta name="description" content="Home | Web sobre programación" data-react-helmet="true" />
            </Helmet>

            <MainBanner />
            <HomeCourses />
            <HowMyCourseWork />
            <ReviewsCourses />
        </Fragment>
    );
}