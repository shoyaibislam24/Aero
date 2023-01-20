import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import logo from '../../../assets/logo.png'
import './Navbar.css'
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const location = useLocation();

  const menuItems = <>
    <li className='py-1 px-4 lg:px-0'>
      <NavLink to="/home" className={({ isActive }) =>
        isActive ? 'font-medium text-secondary' : 'font-medium'
      }>Home</NavLink>
    </li>
    <li className='lg:mx-1 py-1 px-4 lg:px-0'><NavLink to="/categories" className={({ isActive }) =>
      isActive ? 'font-medium text-secondary' : 'font-medium'
    }>Categories</NavLink></li>
    <li className='lg:mx-1 py-1 px-4 lg:px-0'><NavLink to="/blogs" className={({ isActive }) =>
      isActive ? 'font-medium text-secondary' : 'font-medium'
    }>Blogs</NavLink></li>
    <li className='lg:mx-1 py-1 px-4 lg:px-0'>
      <NavLink to="/dashboard" className={({ isActive }) =>
        isActive ? 'font-medium text-secondary' : 'font-medium'
      }>
        Dashboard
      </NavLink>
    </li>
    {user?.uid ?
      <>

        <li className='py-3 px-4 lg:px-0 nav-li'>
          <button
            className='font-semibold text-white lg:py-[7px] w-full lg:w-28 rounded-md bg-secondary transition-all hover:bg-primary ease-in-out duration-300 text-center inline-block'
            onClick={logOut}
          >Sign out</button>
        </li>
      </>
      :
      <li className=' py-1 px-0 nav-li'>
        <Link to="/login" className='font-semibold '>
          <button className='text-white py-[6px] btn-secondary w-full lg:w-20 rounded-md transition-all ease-in-out duration-300'>
            Log in
          </button>
        </Link>
      </li>
    }
  </>

  return (
    <div className="navbar sticky top-0 z-40 bg-slate-50/60 backdrop-blur-2xl transition-colors duration-500 flex justify-between font-[Poppins]">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 nav">
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="">
          <img src={logo} className='w-16' alt="Aero" title='Home' />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 nav">
          {menuItems}
        </ul>
      </div>
      <label htmlFor="dashboard-drawer" tabIndex={2}

        //  className="btn btn-ghost lg:hidden"
        className={`${location.pathname.includes('dashboard') ? "btn btn-ghost lg:hidden" : "hidden"}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
    </div>
  );
};

export default Navbar;