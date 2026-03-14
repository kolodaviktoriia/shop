import React from 'react';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import ButtonLink from '../ButtonLink/ButtonLink.js';

import * as styles from './Message.module.scss';

const Message = ({
  children,
  title,
  subtitle,
  buttonLabel,
  to = '/',
  isLink = true,
  isPadding = true
}) => {
  return (
    <WidthWrapper isPadding={isPadding}>
      <div className={styles.message}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
          <ButtonLink to={to} isLink={isLink}>
            {buttonLabel ?? 'Continue Shopping'}
          </ButtonLink>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Message;
