import React from 'react';
import { Pagination as PaginationAntd } from 'antd';
import './Pagination.scss';

export default function Pagination(props) {

    const { posts, location, history } = props;

    const onChangePage = newPage => {
        history.push(`${location.pathname}?page=${newPage}`);
    }

    return (
            <PaginationAntd 
                defaultCurrent={ parseInt(posts.page)}
                total={parseInt(posts.total)}
                pageSize={parseInt(posts.limit)}
                 onChange={ newPage => onChangePage(newPage) }
                className="pagination"
            />
    );
}