import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useRole from '../../hooks/useRole';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import uploadImage from '../../assets/upload-img.svg'
import toast from 'react-hot-toast';
import useTitle from '../../hooks/useTitle';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [, , isVerified] = useRole(user?.email)
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  console.log("Role from add-", isVerified);

  useTitle('Add Product');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });


  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const thumbs = files.map(file => (
    <div className=' border-2 w-full h-full p-2 rounded-md' key={file.name}>
      <div className='flex w-1/4 overflow-hidden min-w-0'>
        <img
          src={file.preview}
          alt=''
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));


  const handleAddProduct = (data) => {
    setProcessing(true)
    const formData = new FormData();
    formData.append('image', files[0]);

    let category = data.category;
    if (category === 'Mass-Market Cars') {
      category = 1
    }
    else if (category === 'Luxury Cars') {
      category = 2
    }
    else {
      category = 3
    }

    data['category'] = category;
    data['sellerName'] = user?.displayName;
    data['postDate'] = format(new Date(), 'PP');
    data['sellerEmail'] = user?.email;
    data['sellerId'] = user?.uid;
    data['verified'] = isVerified;


    console.log(data);

    axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, formData)
      .then(res => {
        // console.log(res.data);
        if (res?.data?.data?.image?.url) {

          data['img'] = res?.data?.data?.image?.url;
          axios.post(`${process.env.REACT_APP_API_URL}add-services?email=${user?.email}`, data, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
            }
          })
            .then(res => {
              console.log(res.data.data);
              if (res?.data?.data?.acknowledged) {
                setFiles([])
                setProcessing(false)
                toast.success(`${data.brand, data.name} is added successfully!`);
                reset();
                navigate('/dashboard/my-products');
              }
            })
            .catch(err => {
              console.log(err);
              toast.error("Can't added !!")
            });
        }
      })
      .catch(err => {
        console.error(err)
      })

  }

  return (
    <div className='mb-20 font-[Poppins] placeholder:text-md'>
      <h1 className='text-3xl text-center'>Add Product</h1>

      <div className=' md:w-3/4 mx-auto'>
        <form onSubmit={handleSubmit(handleAddProduct)}>

          <div className="form-control mt-[4px] w-full">
            <label>Brand</label>
            <input {...register("brand", { required: true })}
              aria-invalid={errors.brand ? "true" : "false"}
              type='text'
              className="w-full inline-block py-[6px] border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.brand?.type === 'required' && <p className='text-red-600 text-sm'>Brand is required</p>}
          </div>

          <div className="form-control mt-[4px] w-full">
            <label>Name</label>
            <input {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              type='text'
              className="w-full inline-block py-[6px] border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.name?.type === 'required' && <p className='text-red-600 text-sm'>Name is required</p>}
          </div>

          <div className="form-control mt-[4px] w-full">
            <label>Original Price</label>
            <input {...register("originalPrice", { required: true })}
              aria-invalid={errors.originalPrice ? "true" : "false"}
              type='number'
              className="w-full inline-block py-[6px] border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.originalPrice?.type === 'required' && <p className='text-red-600 text-sm'>Original Price is required</p>}
          </div>

          <div className="form-control mt-[4px] w-full">
            <label>Resell Price</label>
            <input {...register("resellPrice", { required: true })}
              aria-invalid={errors.resellPrice ? "true" : "false"}
              type='number'
              className="w-full inline-block py-[6px] border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.resellPrice?.type === 'required' && <p className='text-red-600 text-sm'>Resell Price is required</p>}
          </div>

          <div className="form-control mt-[4px] w-full">
            <label>Uses time of this Car</label>
            <input {...register("usesTime", { required: true })}
              aria-invalid={errors.usesTime ? "true" : "false"}
              type='date'
              className="w-full inline-block py-[6px] border-[1px] border-accent px-3 rounded-[10px]" />
            {errors.usesTime?.type === 'required' && <p className='text-red-600 text-sm'>Uses time is required</p>}
          </div>

          <div className="form-control mt-[4px] w-full mt-2">
            <div>
              <label htmlFor="condition">
                Condition
              </label>
              <select
                defaultValue="Excellent"
                className="select select-bordered border-[1px] border-accent px-3 rounded-[10px] w-full"
                {...register("condition")}
              >
                <option >Excellent</option>
                <option className='my-[2px]'>Good</option>
                <option>Fair</option>
              </select>
            </div>
          </div>

          <div className="form-control mt-[4px] w-full mt-2">
            <div>
              <label htmlFor="category">
                Car Category
              </label>
              <select
                defaultValue="Excellent"
                className="select select-bordered border-[1px] border-accent pl-3 rounded-[10px] w-full"
                {...register("category")}
              >
                <option>Mass-Market Cars</option>
                <option className='my-[2px]'>Luxury Cars</option>
                <option>Sports Cars</option>
              </select>
            </div>
          </div>

          <div className="form-control mt-[4px] w-full">
            <label>Phone Number</label>
            <input {...register("phone", { required: true })}
              aria-invalid={errors.phone ? "true" : "false"}
              type='number'
              className="w-full inline-block py-[6px] border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.phone?.type === 'required' && <p className='text-red-600 text-sm'>Phone number is required</p>}
          </div>

          <div className="form-control mt-[4px] w-full">
            <label>Location</label>
            <input {...register("location", { required: true })}
              aria-invalid={errors.location ? "true" : "false"}
              type='text'
              className="w-full inline-block py-[6px] border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.location?.type === 'required' && <p className='text-red-600 text-sm'>Location is required</p>}
          </div>

          <div className="form-control mt-[4px] w-full">
            <label>Car Description</label>
            <textarea
              {...register("description", { required: true })}
              aria-invalid={errors.description ? "true" : "false"}
              type='text'
              className=" w-full inline-block py-[6px] border-[1px] border-accent pl-3 rounded-[10px]" placeholder="Write a description"></textarea>
            {errors.description?.type === 'required' && <p className='text-red-600 text-sm'>Description is required</p>}
          </div>

          <div>
            <div {...getRootProps({ className: 'border-dashed border-2 w-full py-2 mt-4 rounded-lg cursor-pointer' })}>
              <input {...getInputProps()} />
              <p className='text-base text-center text-base-300 mb-1' >Upload Your Photo</p>
              <div className='flex justify-center'>
                <img src={uploadImage} alt="uploadImageIcons" />
              </div>

            </div>

            <aside
              className='flex flex-wrap mt-4'
            >
              {thumbs}
            </aside>
          </div>
          <button
            className='w-full btn text-white btn-secondary mt-2'
            type='submit'>
            {processing ? <div className="w-10 h-10 border-4 border-dashed border-white rounded-full animate-spin"></div> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;