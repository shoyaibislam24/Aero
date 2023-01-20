import React from 'react';

const FeatureMustData = ({ service }) => {
  const { title, description, icon } = service;
  return (
    <div className="card w-full md:w-60 lg:max-w-lg bg-base-100 shadow">
      <h3 className='text-center bg-gray-200 p-1 rounded-t-2xl font-medium text-gray-900'>{title}</h3>
      <figure className="px-10 pt-8">
        <img src={icon} className='h-12 w-full' alt="" />
      </figure>
      <div className="card-body items-center text-center">
        <p className='font-semibold text-gray-900'>{description}</p>
      </div>
    </div>
  );
};

export default FeatureMustData;