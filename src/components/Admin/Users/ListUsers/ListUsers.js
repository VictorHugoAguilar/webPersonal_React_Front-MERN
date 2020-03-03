import React, { useState, useEffect } from 'react';

import { Switch, List, Avatar, Button, Icon, notification } from 'antd';

import noAvatar from '../../../../assets/img/png/noPicture.png';
import Modal from '../../../Modal';

import EditUserForm from '../EditUserForm';

import { getAvatarApi, activateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import './ListUsers.scss';

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUser } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={() => setViewUsersActives(!viewUsersActives)}
                />

                <span>
                    {viewUsersActives ? ' Usuarios Activos' : ' Usuarios Inactivos'}
                </span>
            </div>

            {viewUsersActives ?
                <UsersActive
                    usersActive={usersActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUser={setReloadUser}
                />
                :
                <UsersInactive
                    usersInactive={usersInactive}
                    setReloadUser={setReloadUser}
                />
            }
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            > {modalContent}
            </Modal>

        </div>
    );
}

function UsersActive(props) {
    const { usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUser
    } = props;

    const editUser = (user) => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`);
        setModalContent(
            <EditUserForm
                user={user}
                setIsVisibleModal={setIsVisibleModal}
                setReloadUser={setReloadUser}
            />
        );
    }

    return (
        <List
            className='user-active'
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive
                user={user}
                editUser={editUser}
                setReloadUser={setReloadUser}
            />}
        />
    )
}

function UserActive(props) {
    const { user, editUser, setReloadUser } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user]);

    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, false)
            .then(response => {
                notification['success']({
                    message: response.message
                });
                setReloadUser(true);
            })
            .catch(error => {
                notification['error']({
                    message: error.message
                });
            });
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={() => editUser(user)}
                >
                    <Icon type="edit" ></Icon>
                </Button>,
                <Button
                    type="danger"
                    onClick={desactivateUser}
                >
                    <Icon type="stop"></Icon>
                </Button>,
                <Button
                    type="danger"
                    onClick={() => console.log("borrar usuario")}
                >
                    <Icon type="delete" />
                </Button>

            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar} />}
                title={` ${user.name ? user.name : '...'} 
                                    ${user.lastname ? user.lastname : '...'}
                        `}
                description={user.email}
            />
        </List.Item>
    );
}

function UsersInactive(props) {
    const { usersInactive, setReloadUser } = props;
    return (
        <List
            className='user-active'
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user =>
                <UserInactive user={user} setReloadUser={setReloadUser} />
            }
        />
    )
}

function UserInactive(props) {
    const { user, setReloadUser } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    const activateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, true)
            .then(response => {
                notification['success']({
                    message: response.message
                });
                setReloadUser(true);
            })
            .catch(error => {
                notification['error']({
                    message: error.message
                });
            });
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={activateUser}
                >
                    <Icon type="check" ></Icon>
                </Button>,
                <Button
                    type="danger"
                    onClick={() => console.log("borrar usuario")}
                >
                    <Icon type="delete" />
                </Button>

            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar} />}
                title={` ${user.name ? user.name : '...'} 
                        ${user.lastname ? user.lastname : '...'}
            `}
                description={user.email}
            />
        </List.Item>
    )
}