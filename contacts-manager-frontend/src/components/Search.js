import React from 'react'
import { Link } from 'react-router-dom'

const Search = (props) => {
   
    return (
        <div className='container justify-content-between my-2'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand disabled" to="/home" >Total contacts</Link>
                    <button className="navbar-toggler" type="button" disabled>   
                    </button>

                    <div>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className='d-flex'>
                    
                    
                    <p>{localStorage.getItem("username")}</p>
                    
                    
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Search
