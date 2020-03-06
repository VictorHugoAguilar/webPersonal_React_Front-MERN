import React, { useState } from 'react';
import { Form, Icon, Input, Select, Button, Row, Col, notification } from 'antd';
import { singUpAdminApi, signUpApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import './AddUserForm.scss';

export default function EditUserForm(props) {
    const { setIsVisibleModal, setReloadUser } = props;
    const [userData, setUserData] = useState({});

    const addUser = event => {
        event.preventDefault();
        if (!userData.name || !userData.lastname || !userData.email || !userData.role || !userData.password || !userData.repeatPassword) {
            notification['error']({
                message: 'Todo los campos son obligatorios'
            });
        } else {
            if (userData.password !== userData.repeatPassword) {
                notification['error']({
                    message: 'Las contraseñas no coinciden'
                });
            } else {
                const accessToken = getAccessTokenApi();
                singUpAdminApi(accessToken, userData)
                    .then(response => {
                        notification['success']({
                            message: response
                        });
                        setIsVisibleModal(false);
                        setReloadUser(true);
                        setUserData({});
                    })
                    .catch(error => {
                        notification['error']({
                            message: error
                        });
                    }
                    );
            }
        }
    }

    return (
        <div className="add-user-data">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    );
}


function AddForm(props) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-add" onSubmit={addUser} >
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
                            placeholder="Apellidos"
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="mail" />}
                            placeholder="Email"
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccione un rol"
                            onChange={e => setUserData({ ...userData, role: e })}
                        >
                            <Option value="Admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="reviwer">Revisor</Option>
                            <Option value="user">Usuario</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="Contraseña"
                            type="password"
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12} >
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" />}
                            placeholder="Repetir Contraseña"
                            type="password"
                            value={userData.repeatPassword}
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button className="btn-submit" type="primary" htmlType="submit">
                    Añadir
                </Button>
            </Form.Item>
        </Form>
    );
}
