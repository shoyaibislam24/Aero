import axios from 'axios';
import { useEffect, useState } from 'react';

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [isVerified, setIsVerified] = useState(false)
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}users/${email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Aero-Token')}`
      }
    })
      .then(res => {
        // console.log(res.data);
        setRole(res?.data?.role);
        console.log(res?.data?.verified);
        setIsVerified(res?.data?.verified);
        setIsRoleLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  }, [email])

  return [role, isRoleLoading, isVerified]
};

export default useRole;