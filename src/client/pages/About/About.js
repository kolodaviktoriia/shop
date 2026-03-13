import React from 'react';
import Message from '../../components/Message/Message.js';
import PageWrapper from '../../components/PageWrapper/PageWrapper.js';

const About = () => {
  return (
    <PageWrapper>
      <Message
        title="About Us"
        subtitle={`Blush & Bloom is a cosmetics shop inspired by nature and soft beauty. Our goal is to create gentle products that help you feel confident and radiant every day.`}
      />
    </PageWrapper>
  );
};

export default About;
