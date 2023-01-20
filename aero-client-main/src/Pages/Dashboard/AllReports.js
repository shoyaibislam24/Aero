import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useAdmin } from '../../hooks/useAdmin';
import axios from 'axios';
import Swal from 'sweetalert2'
import Spinner from '../../Components/Spinner/Spinner';


const AllReports = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [isAdmin] = useAdmin(user?.email);

  const { data: allReports, refetch, isLoading } = useQuery({
    queryKey: ['allReports', user?.email],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}all-reports/admin?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => {
        // console.log('AllReports-', res?.data?.data);
        const data = res?.data?.data
        return data
      })
      .catch(err => {
        console.log(err)
      })
  })


  const handleDeleteService = (id, serviceId, brand, name) => {
    // console.log(id, serviceId);
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
          axios.delete(`${process.env.REACT_APP_API_URL}reports/admin/${id}?serviceId=${serviceId}&email=${user?.email}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
            }
          })
            .then(res => {
              // console.log(res.data);
              if (res?.data?.data?.acknowledged) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  `${brand} ${name} has been deleted.`,
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


  if (isLoading) {
    return <Spinner />
  }


  return (
    <div className='font-[Poppins]'>
      <h1 className='text-3xl text-center mb-3 font-semibold'>All Reports</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Cars Name</th>
              <th>Reported User</th>
              <th>Seller Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allReports?.length ? (
                <>
                  {
                    allReports?.map((report, idx) => (
                      <tr key={report?._id} >
                        <th>{idx + 1}</th>
                        <td>{report?.serviceBrand} {report?.serviceName}</td>
                        <td>{report?.userName}</td>
                        <td>{report?.sellerName}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteService(report._id, report?.serviceId, report?.serviceBrand, report?.userName)}
                            className='btn btn-xs btn-error text-sm font-medium'
                          >Delete Car</button>
                        </td>
                      </tr>
                    ))
                  }
                </>
              )
                :
                (
                  <>
                    <td className='text-xl font-semibold text-error'> No Reports Found
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

export default AllReports;