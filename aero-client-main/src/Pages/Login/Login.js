import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleAuthProvider } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ResetModal from './Modal/ResetModal';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useToken } from '../../hooks/useToken';
import useTitle from '../../hooks/useTitle';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false)
  const googleProvider = new GoogleAuthProvider();
  const { signInWithGoogle, signInWithEmail, setLoading } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState('');

  const [token] = useToken(loginUserEmail)

  useTitle('Log in')

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true })
  }

  const handleLogin = data => {
    signInWithEmail(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        setLoginUserEmail(data.email)
        reset();
        toast.success('Login successful');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        toast.error(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const singInWithGoogle = () => {
    signInWithGoogle(googleProvider)
      .then((result) => {
        // The signed-in user info.
        const role = 'User';
        const user = result.user;
        savedUserDB(user?.displayName, user?.email, role);
        toast.success('Login successful')
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        toast.error(errorMessage)
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
    console.log(user);
    axios.post(`${process.env.REACT_APP_API_URL}users`, user)
      .then(res => {
        console.log(res.data);
        setLoginUserEmail(email);
      }).catch(err => {
        console.log(err);
      })
  }



  return (
    <section className='flex justify-center items-center md:min-h-screen px-5 md:px-0'>
      <div className='flex items-center justify-center'>
        <div className='bg-white w-[385px] drop-shadow-md rounded-[10px] pt-[35px] pb-[29px] px-[29px]'>
          <h1 className='text-xl font-medium text-center text-accent  mb-[25px]'>Login</h1>

          <form onSubmit={handleSubmit(handleLogin)}
          >
            <div className="form-control w-full mb-[10px]">
              <label className='mb-[3px] text-accent'>Email</label>
              <input
                type="email"
                className='h-11 w-full border-[2px] pl-3 rounded-[10px]'
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })}
              />
              <p className='text-xs text-red-600'>
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="form-control w-full mb-[2px]">
              <label className=' text-accent mb-[3px] '>Password</label>
              <input
                name="password"
                type="password"
                className='h-11 w-full border-[2px] pl-3 rounded-[10px]'
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters"
                  }
                })}
              />
              {errors?.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}
              <button
                onClick={() => setIsOpen(true)}
                className='text-xs mt-[2px] text-accent text-start hover:text-secondary'>
                Forgot Password ?
              </button>
            </div>
            <div className='mt-[18px]'>
              <input
                type="submit"
                value='Log in'
                className='h-11 text-white btn-secondary w-full border-[2px] pl-3 rounded-[10px] cursor-pointer'
              />
            </div>
          </form>

          <div className=''>
            <div className='flex justify-center gap-2 items-center mt-[11px] text-[14px]'>
              <p>New to Doctors Portal?</p>
              <Link to='/sign-up'
                className='text-primary hover:text-secondary'
              >
                Create new account
              </Link>
            </div>
            <div className="divider">OR</div>
            <div className='mt-[25px]'>
              <button
                onClick={singInWithGoogle}
                className='btn btn-secondary text-base hover:text-white btn-outline w-full'>
                CONTINUE WITH GOOGLE
              </button>
            </div>
          </div>
        </div>
      </div>
      <>
        <ResetModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </section>
  );
};

export default Login;