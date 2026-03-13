import React from 'react';
import Message from '../../components/Message/Message.js';
import PageWrapper from '../../components/PageWrapper/PageWrapper.js';
import { useParams } from 'react-router-dom';

const company = {
  about: {
    title: "About Us",
    description:
      "Blush & Bloom is a cosmetics shop inspired by nature and soft beauty. Our goal is to create gentle products that help you feel confident and radiant every day."
  },

  ingredients: {
    title: "Our Ingredients",
    description:
      "We carefully select skin-loving ingredients inspired by nature. Our formulas are designed to be gentle, effective, and suitable for everyday beauty routines."
  },

  sustainability: {
    title: "Sustainability",
    description:
      "We believe beauty should respect nature. We focus on responsible sourcing, recyclable packaging, and reducing waste whenever possible."
  },

  privacy: {
    title: "Privacy Policy",
    description:
      "Your privacy is important to us. We collect only the information necessary to process orders and improve your experience on our website."
  },

  terms: {
    title: "Terms of Service",
    description:
      "By using our website, you agree to our terms regarding orders, payments, returns, and acceptable use of the service."
  }
}
const Company = () => {
  const { id } = useParams();
  return (
    <PageWrapper>
      <Message
        title={company[id]?.title}
        subtitle={company[id]?.description}
      />
    </PageWrapper>
  );
};

export default Company;
