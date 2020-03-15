import React from 'react';

import SocialLink from '../../SocialLinks';

import logo from '../../../../assets/img/png/logo.png'

import './MyInfo.scss';

export default function MyInfo() {

    return (
        <div className="my-info">
            <img src={logo} alt="Victor Hugo Aguilar Aguilar" />
            <h4>
                Entra en el mundo del desarrollo web, disfruta creando proyectos de todo tipo, deja que tú imaginación fluya y crea verdadereas maravillas
            </h4>
            <div >
                <SocialLink />
            </div>
        </div>
    );

}