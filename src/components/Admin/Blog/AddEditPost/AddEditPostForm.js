import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Icon, Input, Button, DatePicker, notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';

// Importamos los servicios API
import { getAccessTokenApi } from '../../../../api/auth';
import { } from '../../../../api/post';

import './AddEditPostForm.scss';

export default function AddEditPostForm(props) {
    const { setIsVisbleModal, setReloadPosts, post } = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
        if (post) {
            setPostData(post);
        } else {
            setPostData({});
        }
    }, [post]);

    return (
        <div className="add-edit-post-form">
            <AddEditForm
                postData={postData}
                setPostData={setPostData}
                post={post}
            />
        </div>
    );
}

function AddEditForm(props) {
    const { setPostData, postData, post } = props;

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    }

    return (
        <Form className="add-edit-post-form" layout="inline">
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<Icon type="font-size" />}
                        placeholder="Título"
                    // value={}
                    // onChange={}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        prefix={<Icon type="link" />}
                        placeholder="Url"
                    // value={}
                    // onChange={}
                    />
                </Col>
                <Col span={8}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY HH:mm:ss"
                        placeholder="Fecha de publicación"
                        showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                    // value={}
                    // onChange={}
                    />
                </Col>
            </Row>
            { /*  Editor */}
            <Editor
                initialValue=""
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
            />
            <Button type="primary" htmlType="submit" className="btn-submit">
                { post ? "Actualizar Post" : "Añadir Post" }
            </Button>
        </Form>
    );
}