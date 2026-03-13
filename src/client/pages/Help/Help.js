import React from 'react';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message/Message.js';
import PageWrapper from '../../components/PageWrapper/PageWrapper.js';


import * as styles from './Help.module.scss';

const help = {
  contact: {
    title: "Contact Us",
    intro:
      "We're here to help! Whether you have a question about your order or our products, our team is happy to assist you.",
    sections: [
      {
        title: "Customer Support",
        text: "Our support team responds to most messages within 24 hours during business days."
      },
      {
        title: "Email",
        text: "support@blushandbloom.com"
      },
      {
        title: "Phone",
        text: "+1 (000) 123-4567"
      }
    ]
  },

  shipping: {
    title: "Shipping & Delivery",
    intro: "We carefully pack and ship every order to ensure safe delivery.",
    sections: [
      {
        title: "Processing Time",
        text: "Orders are processed within 1–2 business days."
      },
      {
        title: "Delivery Time",
        text: "Shipping usually takes 3–7 business days."
      }
    ]
  },

  returns: {
    title: "Returns & Refunds",
    intro: "Your satisfaction is important to us.",
    sections: [
      {
        title: "Return Window",
        text: "Items can be returned within 30 days if unused."
      },
      {
        title: "Refunds",
        text: "Refunds are issued after we receive and inspect the returned item."
      }
    ]
  },

  faq: {
    title: "Frequently Asked Questions",
    intro: "Here are answers to the most common questions.",
    sections: [
      {
        title: "How long does shipping take?",
        text: "Most orders arrive within 3–7 business days."
      },
      {
        title: "Can I change my order?",
        text: "If your order hasn’t shipped yet, contact support to modify it."
      },
      {
        title: "What payment methods do you accept?",
        text: "We accept PayPal and major credit/debit cards."
      },
      {
        title: "Are your products cruelty-free?",
        text: "Yes, our products are not tested on animals."
      }
    ]
  }
};
const Help = () => {
  const { id } = useParams();
  return (
    <PageWrapper>
      <Message
        title={help[id]?.title}
        subtitle={help[id]?.intro}
      >
        <div className={styles.sections}>
          {help[id].sections.map(section => (
            <div key={section.title} className={styles.section}>
              <h3 className={styles.title}>{section.title}</h3>
              <p className={styles.subTitle}>{section.text}</p>
            </div>
          ))}</div>

      </Message>
    </PageWrapper>
  );
};

export default Help;
