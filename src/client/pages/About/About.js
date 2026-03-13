import React from 'react';
import Message from '../../components/Message/Message.js';

import * as styles from './About.module.scss';

const About = () => {
  return (
    <div className={styles.notFound}>
      <Message
        title="About Us"
        subtitle={`Blush & Bloom is a cosmetics shop inspired by nature and soft beauty. Our goal is to create gentle products that help you feel confident and radiant every day.`}
      />
    </div>
  );
};

export default About;
