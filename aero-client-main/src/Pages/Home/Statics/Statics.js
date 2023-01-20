import React from 'react';
import CountUp from "react-countup";
import { GiForwardField, GiGamepadCross, GiGasPump } from "react-icons/gi";

const Statics = () => {
  return (
    <section className="text-gray-900 font-[Poppins]">
      <div className="px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-14">
          <h1 className="md:text-3xl text-2xl font-semibold mb-4">
            Control Your Car-Buying Experience
          </h1>
          <p className="lg:w-3/4 px-8 mx-auto text-justify text-neutral">
            Show off your personality as a business with a website that speaks well to your brand. Of course, customer experience is essential when building your web presence. Dodge is another awesome car dealer website that you should check. It has a stunning, asymmetrical design that looks unique and creative. Specifically, the hero header impresses visitors with a cool slider combined with the striking design of CTAs, attractive images and engaging promotions.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <GiGasPump className="text-secondary w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-medium text-3xl text-gray-900">
                <CountUp duration={3} start={0} end={100} />
              </h2>
              <p className="leading-relaxed">Pamps</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-secondary w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                <CountUp duration={4} start={0} end={100000} />
              </h2>
              <p className="leading-relaxed">Users</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <GiGamepadCross className="text-secondary w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-medium text-3xl text-gray-900">
                <CountUp duration={5} start={0} end={9599} />
              </h2>
              <p className="leading-relaxed">Cross</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <GiForwardField className="text-secondary w-12 h-12 mb-3 inline-block" />
              <h2 className="title-font font-medium text-3xl text-gray-900">
                <CountUp duration={6} start={0} end={9758} />
              </h2>
              <p className="leading-relaxed">Field</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statics;