import React from 'react';
import Hero from '../../components/Hero/Hero.js';
import Categories from '../../components/Categories/Categories.js';
import Collections from '../../components/Collections/Collections.js';

const Landing = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Collections />
    </div>
  );
};

export default Landing;
