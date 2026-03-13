import React from 'react';
import Message from '../../components/Message/Message.js';

import * as styles from './ErrorHandler.module.scss';

const ErrorHandler = () => {
    return (
        <div className={styles.errorHandler}>
            <Message
                title='💄 Oops! Beauty Glitch'
                subtitle='Something went wrong in our beauty garden.'
                buttonLabel='Back to Blush & Blossom'
                isLink={false}
            />
        </div >
    )
}

export default ErrorHandler;