import React, { useContext } from 'react';
import axios from 'axios';
import { FcCalendar } from "react-icons/fc";
import { GrLocation, GrToast } from "react-icons/gr";
import { MdOutlinePriceChange, MdOutlinePriceCheck } from "react-icons/md";
import { FaCheckCircle, FaRegClock, FaRegUserCircle, FaCarCrash } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const CategoryServicesCard = ({ service, setIsOpen, setOrder }) => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const { _id, brand, img, location, name, originalPrice, postDate, resellPrice, sellerName, verified, usesTime, condition, description, isBooked, sold, sellerEmail } = service;
  // console.log(service);


  const handelSetOrder = (service) => {
    setOrder(service);
    setIsOpen(true);
  }

  const handelReport = (id) => {
    console.log(id);

    const report = {
      userEmail: user?.email,
      userName: user?.displayName,
      serviceId: _id,
      serviceBrand: brand,
      serviceName: name,
      sellerName: sellerName,
      sellerEmail: sellerEmail,
    }

    axios.post(`${process.env.REACT_APP_API_URL}reports/${id}?email=${user?.email}`, report, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => {
        // console.log(res?.data?.data?.acknowledged);
        if (res?.data?.data?.acknowledged) {
          toast.success(`Report to admin for ${brand} ${name}`)
        } else {
          // console.log(res?.data?.message);
          toast.error(res?.data?.message)
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <>
      <div data-aos="fade-up" className={`${sold && 'hidden'} w-full overflow-hidden bg-white rounded-lg shadow-lg font-[Poppins]`}>
        <img className="object-cover object-center w-full h-56" src={img} alt={name} />
        <div className="px-6 py-4">

          <div className='flex items-center justify-between'>
            <div className=''>
              <div className="badge badge-outline badge-primary font-medium text-gray-900">{brand}
              </div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white"> {name} </h1>
            </div>
            <div
              onClick={() => handelReport(_id)}
              className="badge badge-error hover:bg-rose-700 text-white font-medium cursor-pointer transition-all ease-linear duration-300">Report
            </div>
          </div>
          <p className="py-2 text-[15px]">
            {description?.length > 120 ? description?.slice(0, 120) + '...' : description}
          </p>


          <div className="flex items-center mt-2">
            <FaCarCrash className='w-6 h-6' />
            <h1 className="px-2 text-sm">Condition:
              <span className='font-medium ml-1'>{condition}</span></h1>
          </div>
          <div className="flex items-center mt-2">
            <MdOutlinePriceChange className='w-6 h-6' />
            <h1 className="px-2 text-sm">Original Price:
              <span className='font-medium ml-1'>${originalPrice}</span></h1>
          </div>

          <div className="flex items-center mt-2">
            <MdOutlinePriceCheck className='w-7 h-7' />
            <h1 className="px-2 text-sm"> Sale Price:
              <span className='font-medium ml-1'>${resellPrice}</span>
            </h1>
          </div>
          <div className="flex items-center mt-2">
            <FcCalendar className='w-5 h-5' />
            <h1 className="px-2 text-sm">
              Years Of Use:  <span className='font-semibold'>
                {(usesTime.split('-')[0])}
              </span>
            </h1>
          </div>
          <div className="flex items-center mt-2">
            <FaRegClock className='w-5 h-5' />
            <h1 className="px-2 text-sm">
              Posted: {postDate}
            </h1>
          </div>
          <div className="flex items-center mt-2">
            <GrLocation className='w-6 h-6' />
            <h1 className="px-2 text-sm">{location}</h1>
          </div>

          <div className="flex items-center mt-2">
            <FaRegUserCircle className='w-5 h-5' />
            <div className='flex items-center'>
              <h1 className="px-2 text-sm">{sellerName}</h1>
              {
                verified && (
                  <>
                    <FaCheckCircle title='Verified' className='text-green-600 w-4 h-4' />  <span className='ml-1 text-sm text-green-600 '>Verified</span>
                  </>
                )
              }
            </div>
          </div>
          <div className='mt-3'>
            <button
              onClick={() => handelSetOrder(service)}
              disabled={isBooked}
              className='btn-primary text-white h-10 w-full rounded-md transition-all ease-in-out duration-300'
            >
              {
                isBooked ? 'Booked' : ' Book Now'
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryServicesCard;