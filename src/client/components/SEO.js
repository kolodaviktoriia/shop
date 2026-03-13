import React from 'react';
import { Helmet } from 'react-helmet-async';
import { defaultSEO } from '../constants/defaultSeo.js';

const brandName = 'BLUSH & BLOSSOM';

export const productSchema = ({
  title,
  description,
  image,
  price,
  currency = 'EUR',
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: title,
  description,
  image,
  offers: {
    '@type': 'Offer',
    priceCurrency: currency,
    price,
    availability: 'https://schema.org/InStock',
  },
  brand: {
    '@type': 'Brand',
    name: brandName,
  },
});

export const defaultSchema = ({ title, description, image }) => ({
  '@context': 'https://schema.org',
  '@type': 'Website',
  name: title || defaultSEO.title,
  description: description || defaultSEO.description,
  image: image || defaultSEO.image,
  brand: {
    '@type': 'Brand',
    name: brandName,
  },
});

const SEO = ({ title, description, image, schema, keywords }) => {
  return (
    <Helmet>
      <title>{title ? `${title} | ${brandName}` : brandName}</title>
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {keywords && (
        <meta name="keywords" content={`${defaultSEO.keywords}, ${keywords}`} />
      )}
      <meta property="og:title" content={title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schema || defaultSchema({ title, description, image })
          ),
        }}
        key="item-jsonld"
      />
    </Helmet>
  );
};

export default SEO;
