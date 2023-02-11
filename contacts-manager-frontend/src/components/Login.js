import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential, setcredential] = useState({ email: "", password: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://contacts-manager-tsfd.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })

        })
        const json = await response.json()
        console.log(json)
        console.log(json.success)
        if (json.success) {
            //redirect
            console.log(json.success)
            localStorage.setItem("token", json.authToken)


            console.log("this is token " + localStorage.getItem("token"))
            history("/home")
        } else {
            alert("invalid credentials")
        }
    }

    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    localStorage.setItem("username", credential.email.split("@")[0])

    return (
        <div id="login" className='position-absolute top-50 start-50 translate-middle' >

            <form onSubmit={handleSubmit} style={{"width":"50%"}}>
                <div className="mb-3" style={{"width":"450px"}}>

                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credential.email} className="form-control " id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="name@example.com"  />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3" style={{"width":"450px"}}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credential.password} className="form-control" id="password" name="password" onChange={onChange} />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 6 characters long
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
