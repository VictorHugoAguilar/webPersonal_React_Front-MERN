import React, { useState, useEffect, Fragment } from 'react';
import { Spin, notification } from 'antd';
import { Helmet } from 'react-helmet';
import moment from 'moment';

// Importamos los servicios Api
import { getPostApi } from '../../../../api/post';
import 'moment/locale/es';

import './PostInfo.scss';

export default function PostInfo(props) {
    const { url } = props;
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        getPostApi(url)
            .then(response => {
                if (response.code !== 200) {
                    notification['error']({ message: response.message });
                } else {
                    setPostInfo(response.post);
                }
            })
            .catch(err => {
                notification['error']({ message: 'Error en el servidor.' })
            });
    }, [url]);

    if (!postInfo) {
        return (
            <Spin tip="Cargando..." style={{ width: '100%', padding: '300px 0' }} />
        );
    }

    return (
        <Fragment>
            <Helmet>
                <title>Blog | Victor Hugo Aguilar Aguilar</title>
                <meta name="description" content="Blog | Web sobre programación" data-react-helmet="true" />
            </Helmet>
            <div className="post-info">
                <h1 className="post-info__title">{postInfo.title}</h1>
                <div className="post-info__creation-date">
                    {moment(postInfo.date).locale('es').format('LL')}
                </div>
                <div
                    className="post-info__description"
                    dangerouslySetInnerHTML={{ __html: postInfo.description }}
                />
            </div>
        </Fragment>
    );

}