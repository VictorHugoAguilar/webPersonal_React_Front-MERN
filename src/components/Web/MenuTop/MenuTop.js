import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { getMenuApi } from '../../../api/menu';

import logoVictor from '../../../assets/img/png/logo.png'

// Componentes
import SocialLinks from '../SocialLinks';

import './MenuTop.scss';

export default function MenuTop() {

    const [menuData, setMenuData] = useState([]);
    console.log(menuData);
    useEffect(() => {
        getMenuApi()
            .then(response => {
                let arrayMenu = [];
                response.menu.forEach(item => {
                    if (item.active) {
                        arrayMenu.push(item);
                    }
                });
                setMenuData(arrayMenu);

            })
            .catch(
                error => {
                    console.error(error);
                }
            );
    }, []);

    return (
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo" >
                <Link to={'/'}>
                    <img src={logoVictor} alt="Victor Hugo Aguilar Aguilar" />
                </Link>
            </Menu.Item>

            {menuData.map(item => {
                const external = item.url.indexOf('http') > -1 ? true : false;

                if (external) {
                    return (
                    <Menu.Item key={item._id} className="menu-top-web_item">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.title}
                        </a>
                    </Menu.Item>
                    );
                }

                return (
                    <Menu.Item key={item._id} className="menu-top-web__item">
                        <Link to={item.url}> {item.title} </Link>
                    </Menu.Item>
                );

            })}

            <SocialLinks />
            
        </Menu>
    );

}