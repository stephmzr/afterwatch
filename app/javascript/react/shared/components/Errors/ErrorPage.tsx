import React from 'react';
import styles from './index.module.sass';

const ErrorPage = ({ code, message }) => (
  <div className={styles.container}>
    {code && (
      <h1>
        {code}
      </h1>
    )}
    <span>
      {message}
    </span>
  </div>
)

export default ErrorPage;