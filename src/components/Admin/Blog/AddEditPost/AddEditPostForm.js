import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Icon, Input, Button, DatePicker, notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';

// Importamos los servicios API
import { getAccessTokenApi } from '../../../../api/auth';
import { addPostApi, updatePostApi } from '../../../../api/post';

import './AddEditPostForm.scss';

export default function AddEditPostForm(props) {
    const { setIsVisibleModal, setReloadPosts, post } = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
        if (post) {
            setPostData(post);
        } else {
            setPostData({});
        }
    }, [post]);

    const processPost = e => {
        e.preventDefault();

        const { title, url, description, date } = postData;

        if (!title || !url || !description || !date) {
            notification['error']({
                message: "Todo los campos son obligatorios"
            });
        }

        if (!post) {
            addPost();
        } else {
            updatePost();
        }
    }

    const addPost = () => {
        const accessToken = getAccessTokenApi();

        addPostApi(accessToken, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? 'success' : 'warning';
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(err => {
                console.error(err)
                notification['error']({ message: 'Error en el servidor.' })
            });
    }

    const updatePost = () => {
        const accessToken = getAccessTokenApi();

        updatePostApi(accessToken, post._id, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? 'success' : 'warning';
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(err => {
                console.error(err)
                notification['error']({ message: 'Error en el servidor.' })
            });
    }



    return (
        <div className="add-edit-post-form">
            <AddEditForm
                postData={postData}
                setPostData={setPostData}
                post={post}
                processPost={processPost}
            />
        </div>
    );
}

function AddEditForm(props) {
    const { setPostData, postData, post, processPost } = props;

    const handleEditorChange = (content, editor) => {
    }

    return (
        <Form className="add-edit-post-form" layout="inline" onSubmit={processPost} >
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<Icon type="font-size" />}
                        placeholder="Título"
                        value={postData.title}
                        onChange={e => setPostData({ ...postData, title: e.target.value })}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        prefix={<Icon type="link" />}
                        placeholder="Url"
                        value={postData.url}
                        onChange={e => setPostData({ ...postData, url: transformTextToUrl(e.target.value) })}
                    />
                </Col>
                <Col span={8}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY HH:mm:ss"
                        placeholder="Fecha de publicación"
                        showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                        value={postData.date && moment(postData.date)}
                        onChange={(e, value) =>
                            setPostData({
                                ...postData,
                                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
                            })}
                    />
                </Col>
            </Row>
            { /*  Editor */}
            <Editor
                value={postData.description ? postData.description : ""}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
                onBlur={e => setPostData({ ...postData, description: e.target.getContent() })}
            />
            <Button type="primary" htmlType="submit" className="btn-submit">
                {post ? "Actualizar Post" : "Añadir Post"}
            </Button>
        </Form>
    );
}

function transformTextToUrl(text) {
    const url = text.replace(" ", "-");
    return url.toLowerCase();
}