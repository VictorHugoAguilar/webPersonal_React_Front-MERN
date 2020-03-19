import React from 'react';
import { Row, Col } from 'antd';
import { useParams, withRouter } from 'react-router-dom';

// importamos los componentes
import PostsListWeb from '../components/Web/Blog/PostsListWeb';

function Blog(props) {
    const { location, history } = props;
    const { url } = useParams();

    return (
        <Row>
            <Col md={4} />
            
            <Col md={16}>
                {url ?
                    (<h2>Es un post</h2>)
                    :
                    (<PostsListWeb
                        location={location}
                        history={history}
                    />)}
            </Col>

            <Col md={4} />
            
        </Row>
    );
}

export default withRouter(Blog);