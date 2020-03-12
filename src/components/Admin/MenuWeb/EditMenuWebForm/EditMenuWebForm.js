import React, { useState, useEffect } from 'react';
import { notification, Form, Icon, Input, Button } from 'antd'

import './EditMenuWebForm.scss';

// importamos los servicios
import { getAccessTokenApi } from '../../../../api/auth';
import { updateMenuApi } from '../../../../api/menu';


export default function EditMenuWebForm(props) {

    const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
    const [menuWebData, setMenuWebData] = useState(menu);

    useEffect(() => {
        setMenuWebData(menu)
    }, [menu]);

    const editMenu = (e) => {
        e.preventDefault();

        if (!menuWebData.title || !menuWebData.url) {
            notification['error'](
                {
                    message: 'Los datos son obligatorios'
                }
            );
        } else {
            const accessToken = getAccessTokenApi();
            updateMenuApi(accessToken, menuWebData._id, menuWebData)
                .then(result => {
                    notification['success']({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                })
                .catch(err => {
                    notification['error']({
                        message: err.message
                    })
                }
                );
        }
    }

    return (
        <div className="edit-menu-web-form">
            <EditForm
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu={editMenu}
            />
        </div>
    )
}

function EditForm(props) {
    const { menuWebData, setMenuWebData, editMenu, menu } = props;

    return (
        <Form className="form-edit" onSubmit={editMenu}>
            <Form.Item >
                <Input
                    prefix={<Icon type="font-size" />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item >
                <Input
                    prefix={<Icon type="link" />}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Menu
                   </Button>
            </Form.Item>
        </Form>
    );

}