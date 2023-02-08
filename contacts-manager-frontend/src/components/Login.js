import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential,setcredential]=useState({email:"",password:""})
   let history=useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
            const response = await fetch("http://localhost:5000/api/auth/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({email:credential.email,password: credential.password })
            })
            const json=await response.json()
            console.log(json)
            console.log(json.success)
            if(json.success){
                //redirect
                console.log(json.success)
                localStorage.setItem("token",json.authToken)
               
               console.log("this is "+localStorage.getItem('token'))
               history("/home")
            }else{
                alert("invalid credentials")
            }
    }

    const onChange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
  }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credential.email}  className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credential.password} className="form-control" id="password" name="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
