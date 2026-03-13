import React from 'react';
import Message from '../../components/Message/Message.js';

import * as styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Message
        title="🌸 Oops! Blossom Missed!"
        subtitle={`The page you’re looking for got lost in our garden of blush and blooms.\n
                        Don’t worry, your beauty journey continues from here!`}
        buttonLabel="Continue Shopping"
      />
    </div>
  );
};

export default NotFound;
