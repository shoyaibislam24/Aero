import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useRole from '../../hooks/useRole';

const Welcome = () => {
  const { user } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole(user?.email)

  if (isRoleLoading) {
    return <Spinner />
  }

  return (
    <div className='h-screen text-gray-700 flex flex-col justify-center items-center pb-16'>
      <div className='flex justify-center items-center'>
        <p className='text-6xl font-bold'>Welc</p>
        <div className='w-9 h-9 border-8 border-dashed rounded-full animate-spin mt-1 border-secondary -mb-2'></div>
        <p className='text-6xl font-bold mr-2'>me</p>
        <p className='text-6xl font-bold'>To</p>
      </div>
      <div className='flex justify-center text-gray-500 items-center mt-4'>
        <>
          {
            role === "Admin" && <p className='text-3xl font-medium'>Admin Dashboard</p>
          }
          {
            role === 'Seller' && <p className='text-3xl font-medium'> Sellers Dashboard</p>
          }

          {
            role === 'User' && <p className='text-3xl font-medium'>Buyers Dashboard</p>
          }
        </>

      </div>
    </div>
  );
};

export default Welcome;