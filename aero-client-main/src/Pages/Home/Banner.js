import React from 'react';
import { Link } from 'react-router-dom';
import wave from '../../assets/wave.svg'
import banner from '../../assets/banner.jpg'

const Banner = () => {
  return (
    <>
      <div
        className="rounded-lg"
        style={{
          backgroundImage: `url(${wave})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32 font-[Poppins]">
          <div className="flex items-center text-center lg:text-left">
            <div className="space-y-10">
              <div>
                <div className="text-sm uppercase font-bold tracking-wider mb-1 text-secondary">
                  Get Started
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                  Grow your business <span className="text-secondary">now</span>!
                </h2>
                <h3 className="text-base md:text-xl md:leading-normal font-medium text-gray-600">
                  Inspiring results from day one without the pain. Get your own
                  custom dashboard and start building amazing services.
                </h3>
              </div>
              <div>
                <Link
                  to="/"
                  className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-6 py-2 leading-6 rounded bg-secondary hover:bg-primary text-base-100 transition-all ease-in-out"
                >
                  <span className='text-lg'>Get Started</span>
                </Link>
              </div>
            </div>
          </div>
          <div className=" flex justify-center lg:flex-none">
            <img
              src={banner}
              className="object-fill h-80 lg:h-96 w-full rounded-lg shadow-2xl lg:hover:scale-105 transition-all duration-500"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;