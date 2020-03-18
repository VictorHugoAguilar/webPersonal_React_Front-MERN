import React from 'react';
import { List, Button, Icon, Modal, notification } from 'antd';

import { Link } from 'react-router-dom';

// Importamos Servicios Api
import { getAccessTokenApi } from "../../../../api/auth"
import { deletePostApi } from "../../../../api/post"

import './PostsList.scss';

const { confirm } = Modal;

export default function PostsList(props) {
    const { posts, setReloadPosts } = props;

    const deletePost = post => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: 'Eliminar Post',
            content: `¿Estas seguro de eliminar el post ${post.title} ?`,
            okText: "Eliminar",
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deletePostApi(post._id, accessToken)
                    .then(response => {
                        const typeNotification = response.code !== 200 ? 'warning' : 'success';
                        notification[typeNotification]({ message: response.message });
                        setReloadPosts(true);
                    })
                    .catch(err => {
                        notification['error']({ message: 'No se ha podido eliminar el post' });
                    });
            }
        });
    }

    return (
        <div className="posts-list">
            <List
                dataSource={posts.docs}
                renderItem={post => <Post post={post} deletePost={deletePost} setReloadPosts={setReloadPosts} />}
            />
        </div>
    );
}

function Post(props) {
    const { post, setReloadPosts, deletePost } = props;

    return (
        <List.Item
            actions={[
                <Link
                    to={`/blog/${post.url}`} target='_blank'
                >
                    <Button type="primary">
                        <Icon type="eye" />
                    </Button>
                </Link>,
                <Button type="primary">
                    <Icon type="edit" />
                </Button>,
                <Button type="danger" onClick={() => deletePost(post)}  >
                    <Icon type="delete" />
                </Button>
            ]}
        >
            <List.Item.Meta title={post.title} />
        </List.Item>
    );
}