import React, { useState } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';

// Importamos las apis
import { signInApi } from '../../../api/user';

// Importamos las constantes
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants'

import './LoginForm.scss';

export default function LoginForm() {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm = (e: { target: { name: any; value: any; }; }) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const loginForm = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Como nos devuelve una promesa si lo hacemos asyncrono espera el resultado
        const result = await signInApi(inputs);
        if(!result.ok){
            notification['error']({
                message: result.message
            })
        }else{
            const { accessToken, refreshToken } = result;

            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification['success']({
                message: result.message
            })
            
            window.location.href = "/admin";
        }
    }

    return (
        <Form className="login-form" onChange={changeForm} onSubmit={loginForm} >
            <Form.Item>
                <Input
                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    className="login-form__input" />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input" />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>


        </Form>
    );
}