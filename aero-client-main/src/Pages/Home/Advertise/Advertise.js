import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../../../Components/Spinner/Spinner";

import './Advertise.css'
import { Autoplay, Pagination, Navigation } from "swiper";


const Advertise = () => {

  const { data: services, isLoading } = useQuery({
    queryKey: ['advertise'],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}advertise`)
      .then(res => {
        // console.log(res?.data?.data);
        const data = res?.data?.data;
        return data
      })
      .catch(err => console.log(err))
  })


  if (isLoading) {
    return <Spinner />
  }

  console.log('Advertise services-', services);

  return (
    <>
      {
        services?.length && (
          <>
            <section className='font-[Poppins] mt-28'>
              <h1 className='text-4xl text-gray-900 font-bold text-center'>Advertise <span className="text-secondary">Cars</span></h1>
              <div className="mt-6">
                <>
                  <Swiper
                    //  spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper">
                    {
                      services?.map(service => (<SwiperSlide
                        key={service?._id}
                      >
                        <img
                          src={service?.img}
                          alt={service?.name}
                          className='brightness-[.7]'
                        />
                        <div className="absolute w-full mx-auto  bottom-10 lg:bottom-14 text-center">
                          <h3 className=" text-2xl md:text-3xl lg:text-5xl text-white font-bold">
                            {service?.brand} {service?.name}
                          </h3>
                        </div>
                      </SwiperSlide>))
                    }

                  </Swiper>
                </>
              </div>
            </section>
          </>
        )
      }
    </>
  );
};

export default Advertise;