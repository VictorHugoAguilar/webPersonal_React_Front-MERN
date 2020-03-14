import React from 'react';
import { Result, Button } from 'antd';


import '../scss/index.scss'

export default function NotFound() {

  const redirect = () => {
    window.location.href = "/";
  }

    return (
        <Result
        className="text-white"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={ () => redirect()  } type="primary">Volver al inicio</Button>}
      />
    );
}



