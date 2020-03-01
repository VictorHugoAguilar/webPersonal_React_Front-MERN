import React, { useState } from 'react';
import { Form, Icon, Input, Button, notification  } from 'antd';

import './LoginForm.scss';

export default function LoginForm (){

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm = ()=> {

    }

    const login = () => {
        console.log('login..')
    }

    return (
        <Form  className="login-form">
            <Form.Item>
                <Input 
                prefix={ <Icon type='user' style={{ color: 'rgba(0,0,0,.25)'}} /> }
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                className="login-form__input" />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={ <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)'}} /> }
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