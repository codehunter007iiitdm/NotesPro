import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials,setCredentials]=useState({username:"",email:"",password:"",cpassword:""})
  const navigate=useNavigate(); //using the navigate to redirect to another component


  const handleSubmit=async (e)=>{
    setCredentials({username:"",email:"",password:"",cpassword:""})
    e.preventDefault();
    const response=await fetch("http://localhost:5000/auth/createuser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({name:credentials.username,email:credentials.email,password:credentials.password})
      })
      const json=await response.json()
      if(json.success){
        //save the auth token in the local storage and redirect the user 
        localStorage.setItem('token',json.token);
        console.log(json.token)
        navigate("/")
        props.showAlert("Account Created Successfully","success")
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="username" className="form-label">User Name</label>
    <input type="input" className="form-control" value={credentials.username} name="username" onChange={onChange}id="username" aria-describedby="emailHelp" />
  </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" value={credentials.email} name="email" onChange={onChange} id="email" aria-describedby="emailHelp" />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" value={credentials.password} name="password" onChange={onChange} id="password" />
    </div>
    <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" value={credentials.cpassword} name="cpassword" onChange={onChange} id="cpassword" />
  </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
    </div>
  )
}

export default Signup
