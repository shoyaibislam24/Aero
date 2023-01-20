import React, { useContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Spinner from '../../Components/Spinner/Spinner';
import useTitle from '../../hooks/useTitle';
import useRole from '../../hooks/useRole';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole(user?.email);
  // console.log('role-from Products', role);

  useTitle('My Products');

  const { data: products, refetch, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await axios.get(`${process.env.REACT_APP_API_URL}products/${user?.uid}?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => {
        const data = res?.data?.data;
        return data
      })
      .catch(err => console.log(err))
  })

  console.log('seller products', products);


  const handelAdvertise = (id, name) => {
    const advertise = {
      advertise: true
    }
    if (role === 'Seller') {
      axios.put(`${process.env.REACT_APP_API_URL}advertise/${id}?email=${user?.email}`,
        advertise, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
        }
      })
        .then(res => {
          console.log(res?.data);
          if (res?.data?.data?.acknowledged) {
            toast.success(`${name} Successfully Advertised`)
            refetch();
          }
        })
        .catch(err => console.log(err))
    }
  }


  const handleDelete = (id) => {
    console.log(id);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-sm btn-success',
        cancelButton: 'btn btn-sm btn-error mr-3'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (role === 'Seller') {
          axios.delete(`${process.env.REACT_APP_API_URL}products/${id}?email=${user?.email}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
            }
          })
            .then(res => {
              console.log(res.data);
              if (res?.data?.data?.acknowledged) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Seller has been deleted.',
                  'success'
                )
                refetch();
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Seller is safe :)',
          'error'
        )
      }
    })

  }

  return (
    <>
      {
        isLoading ? (
          <Spinner />
        )
          :
          (
            <div className="overflow-x-auto font-[Poppins]">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>S/L</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products?.map((product, idx) => <tr
                      key={product._id}
                    >
                      <th>{idx + 1}</th>
                      <td>{product?.brand} {product?.name}</td>
                      <td>${product?.resellPrice}</td>
                      <td>{'Available'}</td>
                      <td>
                        {
                          product?.sold ? (
                            <>
                              <span
                                className=' bg-warning px-8 py-[2px] text-sm rounded-md font-semibold'
                              >Sold</span>
                            </>
                          )
                            : (
                              <>
                                {product?.advertise ? (
                                  <span className='text-white bg-secondary px-2 py-[2px] text-sm rounded-md font-semibold'>Advertised</span>
                                ) : (
                                  <button
                                    onClick={() => handelAdvertise(product._id, product?.name)}
                                    className='btn btn-xs btn-success text-sm font-medium'
                                  >  Advertise</button>
                                )
                                }
                              </>
                            )
                        }

                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(product?._id)}
                          className='btn btn-xs btn-error text-sm font-medium'
                        >Delete</button>
                      </td>
                    </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          )
      }
    </>
  );
};

export default MyProducts;