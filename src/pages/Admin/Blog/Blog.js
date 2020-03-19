import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon, notification } from 'antd';
import queryString from 'query-string';


// Importamos los servicios api
import { getPostsApi } from '../../../api/post';

// Importamos Componentes
import PostsList from '../../../components/Admin/Blog/PostsList';
import Pagination from '../../../components/Pagination';
import AddEditPostForm from '../../../components/Admin/Blog/AddEditPost';

import Modal from '../../../components/Modal';

import './Blog.scss';

function Blog(props) {
    const { location, history } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [posts, setPosts] = useState({});
    const [reloadPosts, setReloadPosts] = useState(false);

    const { page = 1, limit = 10 } = queryString.parse(location.search);

    useEffect(() => {
        getPostsApi(limit, page)
            .then(response => {
                if (response.code !== 200) {
                    notification['warning']({
                        message: response.message
                    })
                } else {
                    setPosts(response.posts);
                }
            })
            .catch(err => {
                notification['error']({
                    message: 'No se ha podido cargar datos de los Post'
                })
            });
        setReloadPosts(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, reloadPosts]);

    const addPost = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo post");
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal} 
                setReloadPosts={setReloadPosts}
                post={null} 
            />
        );
    }

    const editPost = post => {
        setIsVisibleModal(true);
        setModalTitle("Editar post");
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal} 
                setReloadPosts={setReloadPosts}
                post={post} 
            />
        );
    }

    if (!posts) {
        return null;
    }

    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary" onClick={addPost}>
                    <Icon type="plus" />
                    Nuevo Post
                </Button>
            </div>
            <hr />
            <PostsList 
                    posts={posts}
                    setReloadPosts={setReloadPosts}
                    editPost={editPost}
            />
            <Pagination 
                    posts={posts}
                    history={history}
                    location={location}
             />
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width="75%"
            >
                {modalContent}
            </Modal>
        </div>
    );
}

export default withRouter(Blog);