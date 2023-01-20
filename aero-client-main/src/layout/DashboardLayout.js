import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../src/assets/logo.png'
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import Spinner from '../Components/Spinner/Spinner';
import useRole from '../hooks/useRole';
import useTitle from '../hooks/useTitle';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [role, isRoleLoading] = useRole(user?.email)

  console.log(role);

  useTitle('Dashboard')

  if (isRoleLoading) {
    return <Spinner />
  }

  return (
    <>
      <Navbar />
      {
        role && <>
          <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-10 lg:px-20 min-h-screen mt-10">
              <Outlet />
            </div>

            <div className="drawer-side font-[Poppins] font-medium">
              <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

              <div className='menu w-80 bg-base-100'>
                <div className='mt-5'>
                  <img src={logo} className='w-28 mx-auto' alt="" />
                  <div className="flex flex-col items-center mt-4">
                    <img className="object-cover w-24 h-24 mx-2 rounded-full" src={user?.photoURL ? user?.photoURL : 'https://www.shareicon.net/data/512x512/2016/08/18/814068_face_512x512.png'} alt={user?.displayName} />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{user?.displayName ? user?.displayName : "No User"}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">{user?.email ? user?.email : 'john@example.com'}</p>
                  </div>
                  <div className='mt-8'>
                    <ul className="p-4 text-base-content">

                      {role === 'Admin' && (
                        <>
                          <li>
                            <Link to='/dashboard/all-sellers' className='text-center inline-block'>All Sellers</Link>
                          </li>
                          <li>
                            <Link to='/dashboard/all-buyers' className='text-center inline-block'>All Buyers</Link>
                          </li>
                          <li>
                            <Link to='/dashboard/all-reports' className='text-center inline-block'>All Reports</Link>
                          </li>
                        </>
                      )
                      }

                      {
                        role === 'Seller' && (
                          <>
                            <li>
                              <Link to='/dashboard/add-product' className='text-center inline-block'>Add Products</Link>
                            </li>
                            <li>
                              <Link to='/dashboard/my-products' className='text-center inline-block'>
                                My Products
                              </Link>
                            </li>
                          </>
                        )
                      }


                      {
                        role === 'User' && (
                          <li>
                            <Link to='/dashboard/my-orders' className='text-center inline-block'>
                              My Orders
                            </Link>
                          </li>
                        )
                      }

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default DashboardLayout;