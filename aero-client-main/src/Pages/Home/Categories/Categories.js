import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import Spinner from '../../../Components/Spinner/Spinner';
import CategoryCard from './CategoryCard';
import useTitle from '../../../hooks/useTitle';


const Categories = () => {

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}categories`)
      .then(res => {
        const data = res?.data?.data
        return data;
      })
      .catch(err => console.error(err))
  })

  useTitle('Cars Category')

  // console.log(categories);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='pt-20'>
      <div className='px-8 md:px-20 my-10'>
        <h1 className='text-5xl font-bold font-[Poppins]'>Our Fleet</h1>
        <h3 className='text-xl font-bold'>Take a look at our Fleet</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-20'>
        {
          categories?.map(category => <CategoryCard
            key={category._id}
            category={category}
          />)
        }
      </div>
    </section>
  );
};

export default Categories;