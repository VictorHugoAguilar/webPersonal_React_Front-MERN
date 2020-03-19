import React, { useState, useEffect } from 'react'
import { Spin, List, notification } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '../../../Pagination';
import "moment/locale/es";

// Importamos los servicios API
import { getPostsApi } from '../../../../api/post';

import './PostsListWeb.scss';

export default function PostsListWeb(props) {
    const { location, history } = props;
    const [posts, setPosts] = useState({});
    const { page = 1 } = queryString.parse(location.search);

    useEffect(() => {
        getPostsApi(10, page)
            .then(response => {
                console.log(response)
                if (response.code !== 200) {
                    notification['warning']({
                        message: response.message
                    });
                } else {
                    setPosts(response.posts);
                }
            }).catch(err => notification['error']({ message: 'Error al cargar la lista de cursos' }));
    }, [page]);

    if (!posts) {
        return (
            <Spin
                tip="Cargando..."
                style={{ width: "100%", padding: "200px 0" }}
            />)
    }

    return (
        <div className="posts-list-web">
            <h1>Blog</h1>
            <List
                dataSource={posts.docs}
                renderItem={post => <Post post={post} />}
            />
            <Pagination
                posts={posts}
                location={location}
                history={history}
            />
        </div>
    )
}//  post => { console.log(post) } 

function Post(props) {
    const { post } = props;

    console.log(post);

    const day = moment(post.date).format("DD");
    const month = moment(post.date).format("MMMM");

    return (
        <List.Item className="post">
            <div className="post__date">
                <span>{day}</span>
                <span>{month}</span>
            </div>
            <div className="post__title">
                <Link to={`blog/${post.url}`} >
                    <List.Item.Meta title={post.title} />
                </Link>
            </div>
        </List.Item>
    );
}
