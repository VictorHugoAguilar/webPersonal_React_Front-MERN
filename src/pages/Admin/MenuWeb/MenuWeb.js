import React, { useState, useEffect } from 'react';
import { notification } from 'antd';

// Importamos nuestras funciones API
import { getMenuApi } from '../../../api/menu';

// Importamos componentes
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList';


export default function MenuWeb() {
    const [menu, setMenu] = useState({});
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    useEffect(() => {
        getMenuApi()
            .then(response => {
                setMenu(response.menu);
            })
            .catch(error => {
                notification['error']({
                    message: error
                });
            });
        setReloadMenuWeb(false);
    }, [reloadMenuWeb]);

    return (
        <div className="menu-web">
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
        </div>
    );

}