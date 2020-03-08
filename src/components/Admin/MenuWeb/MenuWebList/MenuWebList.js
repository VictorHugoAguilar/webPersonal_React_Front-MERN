import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Icon, Modal as ModalAntd, notification } from 'antd';
import DragSortableList from 'react-drag-sortable'

import Modal from '../../../Modal';
import AddMenuWebForm from '../../../../components/Admin/MenuWeb/AddMenuWebForm';

// Importar api para conectar con el back
import { updateMenuApi, activateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';


import './MenuWebList.scss';
const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menu, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemArray = [];

        Array.prototype.forEach.call(menu, item => {
            listItemArray.push({
                content: <MenuItem item={item} activateMenu={activateMenu} />
            })
        })
        setListItems(listItemArray);
    }, [menu]);


    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi();

        activateMenuApi(accessToken, menu._id, status)
            .then(response => {
                notification['success']({
                    message: response.message
                });
            })
            .catch(err => {
                notification['error']({
                    message: err.message
                });
            });
    };


    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const { order } = item.rank;
            updateMenuApi(accessToken, _id, { order })
                .then(result => console.log(result.message))
                .catch(err => console.error(err.message))
        });
    };

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando nuevo menú');
        setModalContent(
            <div>
                <AddMenuWebForm 
                    setIsVisibleModal={setIsVisibleModal}
                    setReloadMenuWeb={setReloadMenuWeb}
                />
            </div>
        );
    };

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button
                    type="primary"
                    className="menu-web-list__header__button"
                    onClick={addMenuWebModal}
                >
                    <Icon type="plus" />
                    Añadir menú
                </Button>
            </div>

            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical" />
            </div>

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function MenuItem(props) {
    const { item, activateMenu } = props;

    return (
        <List.Item
            actions={
                [
                    <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
                    <Button type="primary">
                        <Icon type="edit"></Icon>
                    </Button>,
                    <Button type="danger">
                        <Icon type="delete"></Icon>
                    </Button>
                ]
            }
        >
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    );
}
