import React, { useState } from 'react'
// import Alert from './Alert';
import { useNavigate } from 'react-router-dom'
const Login = () => {
   const[credentials,setcredentials]=useState({email:"",password:""})
    let history=useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify({email: credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token',json.auth_token)
           history('/')
        }
        else{
            alert("Invalid credentials")
            // Alert("Invalid credentials")
        }
    }
    const onChange = (e) => {
        setcredentials({
            ...credentials,[e.target.name]:e.target.value
        })
    };
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
