import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import CheckOutForm from './CheckOutForm';
import useTitle from '../../../hooks/useTitle';

const Payment = () => {

  const { id } = useParams();
  // console.log(id);

  const stripe = loadStripe(process.env.REACT_APP_PB_KEY);
  // console.log(stripeKey);

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}bookings/${id}`)
      .then(res => {
        const data = res?.data?.data;
        return data
      })
      .catch(err => console.log(err))
  })

  // console.log(booking);

  useTitle(`Payment ${booking?.brand} ${booking?.name}`)

  if (isLoading) {
    return <Spinner />
  }



  return (
    <section className='container flex justify-center px-6 md:px-6 lg:px-10 font-[Poppins] mt-10'>
      <div>
        <h1 className='text-2xl text-center font-bold pt-11'>Payment for {booking?.brand} {booking?.name}</h1>
        <p className='text-xl text-center font-semibold'>Total Price: ${booking?.price}</p>
        <div className='w-96 mt-5 mb-10 '>
          <Elements stripe={stripe}>
            <CheckOutForm booking={booking} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;