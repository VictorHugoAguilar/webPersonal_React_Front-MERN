import React from 'react';
import Victorlogo from '../../../assets/img/png/logo.png';
import { Button, Icon } from 'antd';

import { logout }  from '../../../api/auth'

import "./MenuTop.scss";

export default function MenuTop(props) {
    const { menuCollapsed, setMenuCollapsed } = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={Victorlogo} alt="Victor Hugo Aguilar Aguilar"></img>
                <Button type='link' onClick={() => setMenuCollapsed( !menuCollapsed ) }  >
                    <Icon className="menu-top__left__icon" type={ menuCollapsed ? 'menu-unfold' : 'menu-fold' } />
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type='link' onClick={logoutUser }>
                    <Icon className="menu-top__right__icon" type='poweroff' />
                </Button>
            </div>

        </div>
    );
}