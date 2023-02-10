import React, { useState } from 'react'
// import './search.css';
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
      <nav class="navbar navbar-light bg-light">
      <div>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm}
          onChange={handleSearch} />
      </div>
      <ul >
        {searchResults.map((contact) => (
          <li key={contact.email} onClick={() => onRecommendationSelected(contact)}>{contact.email}</li>
        ))}
      </ul>

      <p>{localStorage.getItem("username")}</p>
      </nav>
    </div>
  )
}

export default Search
