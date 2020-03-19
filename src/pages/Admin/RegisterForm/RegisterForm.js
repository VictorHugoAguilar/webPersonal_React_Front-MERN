import React, { useState } from 'react';

import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';

import { emailValidation, minLenghtValidation } from '../../../utils/formValidation'
import { signUpApi } from '../../../api/user';

import './RegisterForm.scss';

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    })

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })

    const inputValidation = e => {
        const { type, name } = e.target;
        if (type === 'email') {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }
        if (type === 'password') {
            setFormValid({
                ...formValid,
                [name]: minLenghtValidation(e.target, 6)
            });
        }
        if (type === 'checkbox') {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            });
        }
    }

    const changeForm = e => {
        if (e.target.name === 'privacyPolicy') {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    }

    const register = (e) => {
        e.preventDefault();
        
        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
            notification["error"]({
                message: 'Todos los campos son obligatorios'
            });
        } else {
            if (passwordVal !== repeatPasswordVal) {
                notification['error']({
                    message: 'Las contraseñas tienen que ser iguales'
                });
            } else {
                // Conectar con la api
                const result = signUpApi(inputs);
                
                result.then( response => {
                    if (response.ok){
                        notification['success']({
                            message: response.message
                        });
                        resetForm();
                    }else{
                        notification['error']({
                            message: response.message
                        });
                    }

                }).catch(
                    error => console.error(error)
                );
            }
        }
    }

    const resetForm = () => {
        const input = document.getElementsByTagName('input');
        for(let i=0; i < input.length; i++){
            input[i].classList.remove('success');
            input[i].classList.remove('error');
        }
        setInputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        })
        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        })
    }

    return (
        <Form className='register-form' onChange={changeForm} onSubmit={register}>
            <Form.Item>
                <Input
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    className="register-form__input"
                    value={inputs.email}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    value={inputs.password}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register-form__input"
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox
                    name="privacyPolicy"
                    checked={inputs.privacyPolicy}
                    onChange={inputValidation}
                >
                    He leído la politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    className="register-form__button"
                >
                    Crea cuenta
                </Button>
            </Form.Item>
        </Form>
    );

}