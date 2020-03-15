import React, { useState } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';

// Importamos util
import { emailValidate } from '../../../utils/formValidation'

// Importamos la Api
import { suscribeNewsletterApi } from '../../../api/newsletter';

import './Newsletter.scss';

export default function Newsletter() {

    const [email, setEmail] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!emailValidate(email)) {
            notification['error']({
                message: 'El correo electrónico no es válido'
            });
        } else {
            suscribeNewsletterApi(email)
                .then(response => {
                    if (response.code !== 200) {
                        notification['warning']({
                            message: response.message
                        })
                    } else {
                        notification['success']({
                            message: response.message
                        });
                        setEmail('');
                    }
                })
                .catch(err => {
                    notification['error']({
                        message: err.message
                    });
                });
        }

    }

    return (
        <div className="newsletter" >
            <h3>Newsletter</h3>
            <Form onSubmit={onSubmit}>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,0.25)" }} />}
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        ¡Me suscribo!
            </Button>
                </Form.Item>
            </Form>
        </div>
    );
}