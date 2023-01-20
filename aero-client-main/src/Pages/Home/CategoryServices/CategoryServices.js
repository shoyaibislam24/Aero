import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../Components/Spinner/Spinner';
import CategoryServicesCard from './CategoryServicesCard';
import BookingModal from '../../../Components/BookingModal/BookingModal';
import { useLocation } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const CategoryServices = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const { state } = useLocation()
  // console.log(state);

  useTitle(`${state}`)

  // console.log(order);

  const { data: services, refetch, isLoading } = useQuery({
    queryKey: ['services', user?.email],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}services/${id}?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => {
        // console.log(res?.data?.data);
        const data = res?.data?.data;
        return data
      })
      .catch(err => console.log(err))
  })


  function closeModal() {
    setIsOpen(false)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='my-10'>
      <div>

        <h1 className='text-5xl font-bold text-center'>{state}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 gap-10 my-10'>
          {
            services?.map(service => <CategoryServicesCard
              key={service._id}
              service={service}
              setIsOpen={setIsOpen}
              setOrder={setOrder}
            />)
          }
        </div>
      </div>
      <BookingModal
        closeModal={closeModal}
        isOpen={isOpen}
        order={order}
        refetch={refetch}
      />
    </section>
  );
};

export default CategoryServices;