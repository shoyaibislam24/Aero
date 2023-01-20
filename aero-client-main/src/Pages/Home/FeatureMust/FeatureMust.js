import React from 'react';
import FeatureMustData from './FeatureMustData'
import car from '../../../assets/car.svg'
import mileage from '../../../assets/mileage.svg'
import brand from '../../../assets/brand.svg'
import exterior from '../../../assets/exterior.svg'
import boost from '../../../assets/boost.svg'
import price from '../../../assets/price.svg'

const FeatureMust = () => {

  const services = [
    {
      _id: 1,
      title: 'Age',
      description: 'Car’s value will drop as it ages',
      icon: car
    },
    {
      _id: 2,
      title: 'Mileage',
      description: 'Fewer Miles means more money',
      icon: mileage
    },
    {
      _id: 3,
      title: 'Brand',
      description: 'Lexus, Porsche, Audi, and Benz',
      icon: brand
    },
    {
      _id: 4,
      title: 'Exterior and Interior',
      description: 'Deep clean your interior',
      icon: exterior
    },
    {
      _id: 5,
      title: 'History and Registration',
      description: 'Better prices',
      icon: price
    }
  ]

  return (
    <>
      <div className="text-center mt-32 mb-10 font-[Poppins]">
        <h1 className="font-semibold text-2xl md:text-3xl">Factors Affecting Your Car's Value When Selling</h1>
        <p className="text-neutral px-8 m-5 lg:w-3/4 mx-auto ">With the right information, you can sell your used car for its true value. Below are factors that affect your car’s resale value.
          If you’re looking for the best way to sell a car ? We are still considered to be basically the gold standard when it comes to auto sales online. The reason for this is because their listings are so widely syndicated that their inventory is humongous.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center font-[Poppins]">
        {
          services.map(service => <FeatureMustData key={service._id} service={service} />)
        }
      </div>
    </>
  );
};

export default FeatureMust;