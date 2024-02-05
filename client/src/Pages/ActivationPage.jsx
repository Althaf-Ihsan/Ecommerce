import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { server } from "../server";
const ActivationPage = () => {
    const[Error,setError]=useState(false)
  const activation_token = useParams();
  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            setError(true)
          });
      };
      sendRequest();
    }
  },[]);
  return <div style={{

    width:"100%",
    hwight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }}>
    {
        Error ?(<p>Your Token is Expired</p>):(<p>Your account has been registered successfully</p>)
    }
  </div>;
};

export default ActivationPage;
