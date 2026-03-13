import React from 'react';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import ButtonLink from '../ButtonLink/ButtonLink.js';

import * as styles from './Message.module.scss';

const Message = ({ title, subtitle, buttonLabel, to = '/', isLink = true }) => {
  return (
    <WidthWrapper>
      <div className={styles.message}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <ButtonLink to={to} isLink={isLink}>
            {buttonLabel}
          </ButtonLink>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Message;
