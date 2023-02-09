import React, { useState } from 'react'
import './search.css';
const Search = (props) => {
  const contacts = props.contacts;
  //console.log(contacts)
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    var searchTerm = event.target.value
    setSearchTerm(searchTerm)
    // search contacts starting with this value
    if (searchTerm == "") {
      setSearchResults([]);
      return;
    }

    const filteredContacts = contacts.filter(contact =>
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(null);
    setSearchResults(filteredContacts);

    // notify home that search has changed
    props.onSearchChange();
  };

  const onRecommendationSelected = (contact) => {
    setSearchTerm(contact.email)
    props.onDataFromChild(contact)
    setSearchResults([]);
  }

  return (
    <div>
      <div>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm}
          onChange={handleSearch} />
      </div>
      <ul>
        {searchResults.map((contact) => (
          <li key={contact.email} onClick={() => onRecommendationSelected(contact)}>{contact.email}</li>
        ))}
      </ul>
      {/* <div className='container justify-content-between my-2'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand disabled" href="#">Total contacts</a>
                        <button className="navbar-toggler" type="button" >
                        </button>

                        <div>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                    onChange={handleSearch} />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div> */}
    </div>
  )
}

export default Search
