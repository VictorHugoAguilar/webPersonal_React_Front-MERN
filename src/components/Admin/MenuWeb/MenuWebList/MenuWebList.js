import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Icon, Modal as ModalAntd } from 'antd';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable'

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
            console.log(item)
            listItemArray.push({
                content: <MenuItem item={item} />
            })
        })
        setListItems(listItemArray);
    }, [menu]);

    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" className="menu-web-list__header__button">Menu menú</Button>
            </div>

            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical" />
            </div>
        </div>
    );

}

function MenuItem(props) {
    const { item } = props;

    return (
        <List.Item
            actions={
                [
                    <Switch defaultChecked={item.active} />,
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
