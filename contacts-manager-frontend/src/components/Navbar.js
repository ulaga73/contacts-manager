import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Navbar=()=> {
  let homepath="/home"
  {!localStorage.getItem('token')?homepath="/":homepath="/home"}
  let location=useLocation();
  let history=useNavigate();
  // useEffect(()=>{
  //   console.log(location.pathname)
  // },[location])
  const handelLogout=()=>{
    localStorage.removeItem('token');
    history("/")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link  className="navbar-brand" to="/">Contacts Manager</Link>
    <button disabled className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to={homepath}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>

        {/* <li>
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/import">Import</Link>
        </li>
        <li>
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/delete">Delete</Link>
        </li> */}        
        
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-2" to="/" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      </form>:<div className='d-flex'><p className="text-uppercase text-light mx-2 my-2">{localStorage.getItem("username")}</p>
      <button onClick={handelLogout} className='btn btn-primary'>Logout</button></div>}
    </div>
  </div>
  
</nav>
    </div>
  )
}

export default Navbar
