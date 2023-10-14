import React from 'react';
import {useRouteError,isRouteErrorResponse,Navigate} from"react-router-dom";

const Error = ({msg}) => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {

    return (
      <div>
        Error Page
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>
      {msg}
        </p>
      </div>
    );
  }

}

export default Error;

