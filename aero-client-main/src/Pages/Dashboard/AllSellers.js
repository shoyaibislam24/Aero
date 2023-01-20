import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';
import TableRow from '../../Components/TableRow/TableRow';
import { useAdmin } from '../../hooks/useAdmin';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';
import useTitle from '../../hooks/useTitle';

const AllSellers = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
  console.log("isAdmin From all seller- ", isAdmin);


  useTitle('All Sellers')

  const { data: allSellers, refetch, isLoading } = useQuery({
    queryKey: ['allSellers'],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}all-sellers`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => {
        // console.log(res?.data?.data);
        const data = res?.data?.data;
        return data;
      })
      .catch(err => {
        console.log(err.name, err.message);
      })
  })



  const handelVerifySeller = (id, email) => {
    console.log(id, email);

    fetch(`${process.env.REACT_APP_API_URL}sellers/admin/${id}?email=${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        if (data.data.modifiedCount > 0) {
          toast.success('Successfully Seller Verified.')
          refetch();
        }
      })
      .catch(err => {
        console.log(err.name, err.message);
        toast.error(err?.response?.data?.message)
      })

  }




  const handleDeleteSeller = id => {
    // console.log(id);
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
    <>
      {
        isLoading ? (
          <Spinner />
        )
          :
          (
            <div><h1 className='text-3xl text-center mb-3 font-semibold'>All Sellers</h1>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>S/L</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allSellers?.length ? (
                        <>
                          {
                            allSellers?.map((seller, idx) => <TableRow
                              key={seller._id}
                              seller={seller}
                              idx={idx}
                              handleDeleteSeller={handleDeleteSeller}
                              handelVerifySeller={handelVerifySeller}
                            />)
                          }
                        </>
                      )
                        :
                        (
                          <>
                            <td className='text-xl font-semibold text-error'> No Sellers Found
                            </td>
                          </>
                        )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )
      }
    </>
  );
};

export default AllSellers;