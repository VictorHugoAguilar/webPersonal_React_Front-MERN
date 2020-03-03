import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Form, Icon, Input, Select, Button, Row, Col, notification } from 'antd';
import { useDropzone } from 'react-dropzone';
import noAvatar from '../../../../assets/img/png/noPicture.png';

import { getAvatarApi, uploadAvatarApi, updateUserApi } from '../../../../api/user';

import { getAccessTokenApi } from '../../../../api/auth';

import './EditUserForm.scss';

export default function EditUserForm(props) {
    const { user, setIsVisibleModal, setReloadUser } = props;
    const [userData, setUserData] = useState({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        password: user.password,
        repeatPassword: user.repeatPassword
    });
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            password: '',
            repeatPassword: ''
        });
    }, [user]);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if (avatar) {
            setUserData({
                ...userData,
                avatar: avatar.file
            });
        }
    }, [avatar]);

    const updateUser = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        const userUpdate = userData;

        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {
                notification['error']({
                    message: 'Las contraseñas tienen que ser iguales.'
                });
                return;
            }else{
                delete userUpdate.repeatPassword;
            }
        }

        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification['error']({
                message: 'Los datos nombre, apellido y mail son obligatorios.'
            });
            return;
        }

        if (typeof userUpdate.avatar === 'object') {
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName

                updateUserApi(token, userUpdate, user._id)
                    .then(result => {
                        notification['success']({
                            message: result.message
                        });
                        setIsVisibleModal(false);
                        setReloadUser(true);

                    })
                    .catch(error => {
                        notification['error']({
                            message: error.message
                        });
                    })
            })
        } else {
            updateUserApi(token, userUpdate, user._id)
                .then(result => {
                    notification['success']({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadUser(true);
                })
                .catch(error => {
                    notification['error']({
                        message: error.message
                    });
                })
        }

    }

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ?
                (
                    <Avatar size={150} src={noAvatar} />
                ) :
                (
                    <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />
                )}
        </div>
    );
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-edit" onSubmit={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" />}
                            placeholder="Apellido"
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="mail" />}
                            placeholder="Correo Electrónico"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un rol"
                            onChange={e => setUserData({ ...userData, role: e })}
                            value={userData.role}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="review">Revisor</Option>
                            <Option value="user">Usuario</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="Password"
                            type="password"
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>

                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="Repetir Password"
                            type="password"
                            value={userData.repeatPassword}
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>


        </Form>
    );
}