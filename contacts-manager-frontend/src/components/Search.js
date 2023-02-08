import React from 'react'

const Search = () => {
    return (
        <div className='container justify-content-between my-2'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand disabled" href="#">Total contacts</a>
                    <button className="navbar-toggler" type="button" >   
                    </button>

                    <div>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Search
