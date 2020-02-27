import React from 'react';
import Victorlogo from '../../../assets/img/png/logo.png';
import { Button, Layout, Icon } from 'antd';

import "./MenuTop.scss";

export default function MenuTop() {
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={Victorlogo} alt="Victor Hugo Aguilar Aguilar"></img>
                <Button type='link'  onClick={ () => console.log('Click') }  >
                    <Icon className="menu-top__left__icon" type='menu-fold' /> 
                    </Button>
            </div>
            <div className="menu-top__right">
                <Button type='link' onClick={ () => console.log('desde poweroff') }>
                    <Icon className="menu-top__right__icon" type='poweroff'/>
                </Button>
            </div>

        </div>
    );
}