import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  const [credentials,setCredentials]=useState({email:"",password:""})
  const navigate=useNavigate(); //using the navigate to redirect to another component


  const handleSubmit=async (e)=>{
    setCredentials({email:"",password:""})
    e.preventDefault();
    const response=await fetch("http://localhost:5000/auth/login",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      })
      const json=await response.json()
      if(json.success){
        //save the auth token in the local storage and redirect the user 
        localStorage.setItem('token',json.token);
        navigate("/")
        props.showAlert("Logged in successfully","success")
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }

  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div class="container">
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" value={credentials.email} onChange={onChange} className="form-control" name="email" id="email" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" value={credentials.password} onChange={onChange} className="form-control" name="password" id="password" />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
    </div>
  )
}

export default Login
