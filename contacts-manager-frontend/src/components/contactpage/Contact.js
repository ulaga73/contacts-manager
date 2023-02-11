import React, { useEffect, useState } from 'react';
import ImportNavBar from '../navigation/ImportNavBar';
import Search from '../search/Search';
// import contact from '../contactpage/contact.css'

const Contact = () => {
  //State Variables
  const [apiData, setApiData] = useState("");
  const [deleteData, setDeleteData] = useState([]);
  const [select, setSelect] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [contacts, setContacts] = useState([])
  //const [allContacts, setAllContacts] = useState([]);


  //API Call
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:5000/api/contacts", {
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      setApiData(data);
      setContacts(data.result)
    })
  }, [])
  //Server Response
  // eslint-disable-next-line
  const data = apiData.result;
  console.log(deleteData);

  // To select individual checkbox
  function handleCheck(e) {
    console.log(e.target.checked);
    if (e.target.checked) {
      setDeleteData([...deleteData, e.target.id]);
    } else {
      setDeleteData(deleteData.filter(val => val !== e.target.id))
    }
  }

  // To Select All checkboxes
  function handleCheckAll(e) {
    setSelect(!select);
    if (e.target.checked) {
      const valObj = apiData.result;
      let arr = [];
      for (let i = 0; i < valObj.length; i++) {
        const valId = valObj[i]._id;
        arr.push(valId);
      }
      setDeleteData([...deleteData, ...arr]);
    } else {
      setDeleteData([]);
    }
  }
  // refresh contact after delete
  const refreshContactListAfterDelete = (deletedContactIds) => {
    let newItems = [];
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      let found = false;
      for (let j = 0; j < deletedContactIds.length; j++) {
        if (contact._id === deletedContactIds[j]) {
          found = true;
        }
      }
      if (found === false) {
        newItems.push(contact);
      }
    }
    setContacts(newItems)
  }


  // *****************SEARCH************
  const handleRecommendedListSelection = (selectedContact) => {
    // Do something with the data passed back from the child
    // update data
    console.log("home callback function called")
    console.log(selectedContact)
    setContacts([selectedContact]);
  }
  const allContacts = apiData.result;
  // if search input has changed but nothing selected, display all contact. 
  const handleNewSearch = () => {    // contact list should show all contact if  user is typing  
    // reset contacts to all contacts
    setContacts(allContacts);


  }

  //****************TOOLTIP********/
  const handleMouseEnter = index => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };
  // JSX
  return (
    <div className='contacts-container'>
      <Search contacts={contacts} onRecommendedListSelection={handleRecommendedListSelection} onSearchChange={handleNewSearch} />

      <ImportNavBar value={deleteData} onContactDelete={refreshContactListAfterDelete} />
      <table className="table table-info">
        <thead>
          <tr>
            <th><input type="checkbox" name='del' onChange={handleCheckAll} /></th>
            <th>Name</th>
            <th>Designation</th>
            <th>Company</th>
            <th>Industry</th>
            <th >Email</th>
            <th>Phone number</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* To Render Server Response */}
          {
            contacts?.map((data, index) => {
              return (
                <tr key={index}>
                  {/* <td><input type="checkbox" name='del' id={data._id} onChange={handleCheck} checked={select} /></td> */}
                  <td><input type="checkbox" name='del' id={data._id} onChange={handleCheck} /></td>
                  <td>{data.name}</td>
                  <td>{data.designation}</td>
                  <td>{data.company}</td>
                  <td>{data.industry}</td>
                  <td  onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>{data.email}{hoverIndex === index && (
                      <span class="tooltip">
                    <span class="tooltiptext" >{data.email}</span>
                      </span>
                  )}
                  </td>
                  <td>{data.phone}</td>
                  <td>{data.country}</td>
                  <td>
                    <i class="fa-solid fa-pen-to-square mx-1"></i>
                    <i class="fa-solid fa-trash mx-1" style={{ "cursor": "pointer" }}></i>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Contact