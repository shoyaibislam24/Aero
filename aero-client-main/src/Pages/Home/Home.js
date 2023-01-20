import React from 'react';
import useTitle from '../../hooks/useTitle';
import Advertise from './Advertise/Advertise';
import Banner from './Banner';
import Categories from './Categories/Categories';
import FeatureMust from './FeatureMust/FeatureMust';
import Hero from './Hero/Hero';
import Statics from './Statics/Statics';

const Home = () => {

  useTitle('Home')
  return (
    <div className='mx-5'>
      <Banner />
      <Hero />
      <Advertise />
      <Categories />
      <FeatureMust />
      <Statics />
    </div>
  );
};

export default Home;