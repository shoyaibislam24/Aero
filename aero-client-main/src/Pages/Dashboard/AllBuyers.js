import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useAdmin } from '../../hooks/useAdmin';
import Spinner from '../../Components/Spinner/Spinner';

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
  const { data: allBuyers, refetch, isLoading } = useQuery({
    queryKey: ['allBuyers', user?.email],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}all-buyers/admin?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => {
        console.log('Allbuyers-', res?.data?.data);
        const data = res?.data?.data
        return data
      })
      .catch(err => {
        console.log(err)
      })
  })

  useTitle('All Buyers');

  if (isLoading) {
    return <Spinner />
  }

  const handleDeleteBuyer = (id) => {
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

        if (isAdmin) {
          axios.delete(`${process.env.REACT_APP_API_URL}users/admin/${id}?email=${user?.email}`, {
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
    <div className='font-[Poppins]'>
      <h1 className='text-3xl text-center mb-3 font-semibold'>All Buyers</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/L</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allBuyers?.length ? (
                <>
                  {
                    allBuyers?.map((buyer, idx) => (
                      <tr key={buyer?._id} >
                        <th>{idx + 1}</th>
                        <td>{buyer?.name}</td>
                        <td>{buyer?.email}</td>
                        <td>
                          <span className='border-2 border-secondary rounded-full px-2 text-sm font-semibold'>
                            {
                              buyer?.role
                            }
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteBuyer(buyer?._id)}
                            className='btn btn-xs btn-error text-sm font-medium'
                          >Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </>
              )
                :
                (
                  <>
                    <td className='text-xl font-semibold text-error'> No Buyers Found
                    </td>
                  </>
                )
            }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AllBuyers;