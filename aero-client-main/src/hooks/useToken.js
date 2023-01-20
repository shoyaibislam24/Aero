import axios from "axios"
import { useEffect, useState } from "react";

export const useToken = (email) => {
  const [token, setToken] = useState('');

  useEffect(() => {

    if (email) {
      axios.get(`${process.env.REACT_APP_API_URL}jwt?email=${email}`)
        .then(res => {
          if (res?.data?.success) {
            localStorage.setItem('Aero-Token', res?.data?.token)
            setToken(res?.data?.token)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [email])

  return [token];
}