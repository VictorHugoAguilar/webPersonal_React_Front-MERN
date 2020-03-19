import React, { Fragment } from 'react';
import { Result, Button } from 'antd';
import { Helmet } from 'react-helmet';

import '../scss/index.scss'

export default function NotFound() {

  const redirect = () => {
    window.location.href = "/";
  }

  return (
    <Fragment>
      <Helmet>
        <title>Not Found | Victor Hugo Aguilar Aguilar</title>
        <meta name="description" content="Not Found | Web sobre programación" data-react-helmet="true" />
      </Helmet>
      <Result
        className="text-white"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => redirect()} type="primary">Volver al inicio</Button>}
      />
    </Fragment>
  );
}



