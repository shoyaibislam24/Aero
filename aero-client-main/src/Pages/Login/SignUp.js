import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useToken } from '../../hooks/useToken';
import useTitle from '../../hooks/useTitle';

const SignUp = () => {
  const { createUser, verify, updateUserProfile, signInWithGoogle, setLoading } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const [files, setFiles] = useState([]);
  const [token] = useToken(createdUserEmail)


  useTitle('Sign Up')

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true })
  }


  const handleRegister = (data) => {
    const formData = new FormData();
    formData.append('image', data?.photo[0])
    axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, formData)
      .then(res => {
        if (res?.data?.data?.image?.url) {
          createUser(data.email, data.password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user);
              savedUserDB(data.name, data.email, data.userType)
              update(data.name, res?.data?.data?.image?.url)
              verifyEmail();
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error);
              toast.error(error.message);
              // ..
            })
            .finally(() => {
              setLoading(false)
            })


        }
      })
      .catch(err => {
        console.error(err)
      })



    // createUser(data.email, data.password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log(user);
    //     savedUserDB(data.name, data.email, data.userType)
    //     update(data.name)
    //     verifyEmail();
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error);
    //     toast.error(error.message);
    //     // ..
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }


  const update = (name, photo) => {
    updateUserProfile(name, photo)
      .then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
  }

  const verifyEmail = () => {
    verify()
      .then(() => {
        // Email verification sent!
        toast.success(`Check email for verification..!`);
      });
  }


  const handleGoogleSignin = () => {
    signInWithGoogle(googleProvider).then(result => {
      const user = result.user;
      console.log(user)
      const role = 'Seller';
      savedUserDB(user?.displayName, user?.email, role)
      toast.success('Login successful')
    })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      })
  }


  const savedUserDB = (name, email, role) => {
    const user = {
      name,
      email,
      role,
    }

    axios.post(`${process.env.REACT_APP_API_URL}users`, user)
      .then(res => {
        setCreatedUserEmail(email);
      }).catch(err => {
        console.log(err);
      })
  }



  return (
    <section className='min-h-screen flex justify-center items-center'>
      <div className=' w-[385px] bg-white drop-shadow-md rounded-[10px] pt-[35px] pb-[29px] px-[29px]'>
        <h1 className='text-xl font-medium text-accent text-center mb-[25px]'>Sign Up</h1>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full">
            <label>Name</label>
            <input {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              type='text'
              className="w-full inline-block py-3 border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.name?.type === 'required' && <p className='text-red-600 text-sm'>Name is required</p>}
          </div>
          <div className="form-control w-full my-2">
            <label className=''>Email</label>
            <input {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
              type='email'
              aria-invalid={errors.email ? "true" : "false"}
              className="w-full inline-block py-3 border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full">
            <label> Password</label>
            <input {...register("password", {
              required: "Password required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
              },
              pattern: {
                value: /(?=.*[A-Z]).(?=.*[!@%#$&*])(?=.*[0-9].*[0-9]).{8}$/,
                message: "Password must have at least one uppercase, one special character and two digits"
              }
            })}
              type='password'
              className="w-full inline-block py-3 border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors?.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}
          </div>

          <div className="form-control w-full mt-2">
            <div>
              <label htmlFor="userType">
                Select Account Type!
              </label>
              <select
                defaultValue="User"
                className="select select-bordered border-[1px] border-accent pl-3 rounded-[10px] w-full"
                {...register("userType")}
              >
                <option>User</option>
                <option>Seller</option>
              </select>
            </div>
          </div>


          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="photo"
                className="block text-sm text-gray-800  ">
                Photo
              </label>
            </div>

            <input
              type="file"
              name="photo"
              placeholder="Input your Photo"
              required
              className="block px-4 py-1.5 mt-2 border-[1px] border-accent pl-3 rounded-[10px] w-full"
              {...register('photo', {
                required: 'Photo is Required',
              })}
            />
            {errors.photo && (
              <p className="text-red-500">
                {errors.photo.message}
              </p>
            )}
          </div>

          <input className='w-full btn text-white btn-secondary mt-8' type="submit" value='Sign up' />
        </form>

        <div className=''>
          <div className='flex justify-center gap-2 items-center mt-[11px] text-[14px]'>
            <p>Already have an account?</p>
            <Link to='/login'
              className='text-primary hover:text-secondary'
            >
              Log in
            </Link>
          </div>
          <div className="divider">OR</div>
          <div className='mt-[25px]'>
            <button
              onClick={handleGoogleSignin}
              className='btn btn-secondary text-base btn-outline w-full'>
              CONTINUE WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;