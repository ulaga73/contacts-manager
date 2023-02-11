import React, { useEffect, useState } from 'react';
import ImportNavBar from '../navigation/ImportNavBar';
import Search from '../search/Search';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import DeleteFile from '../delete/DeleteFile';

const Contact = () => {
  //State Variables
  const [apiData, setApiData] = useState("");
  const [deleteData, setDeleteData] = useState([]);
  const [select, setSelect] = useState(false);
  const [contacts, setContacts] = useState([])
  //const [allContacts, setAllContacts] = useState([]);
  const [isDelete, setIsDelete] = useState(false);


  //API Call
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    fetch("https://contacts-manager-tsfd.onrender.com/api/contacts", {
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

  async function handleDelete(id){
    setIsDelete(true);
    setDeleteData([...deleteData, id]);
  }

  //****************TOOLTIP********/
 
  // JSX
  return (
    <div className='contacts-container'>
      <Search contacts={contacts} onRecommendedListSelection={handleRecommendedListSelection} onSearchChange={handleNewSearch} />

      <ImportNavBar value={deleteData} />
      {
        isDelete && <DeleteFile value={deleteData} />
      }
      <table className="table table-info">
        <thead>
          <tr>
            <th><input type="checkbox" name='del' onChange={handleCheckAll} /></th>
            <th className="font-monospace">Name</th>
            <th className="font-monospace">Designation</th>
            <th className="font-monospace">Company</th>
            <th className="font-monospace">Industry</th>
            <th className="font-monospace" >Email</th>
            <th className="font-monospace">Phone number</th>
            <th className="font-monospace">Country</th>
            <th className="font-monospace">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* To Render Server Response */}
          {
            contacts?.map((data, index) => {
              return (
                <tr key={index}>
                  {
                    select ?
                      <td><input type="checkbox" name='del' id={data._id} onChange={handleCheck} checked={select} /></td> :
                      <td><input type="checkbox" name='del' id={data._id} onChange={handleCheck} /></td>
                  }
                  <td>{data.name}</td>
                  <td>{data.designation}</td>
                  <td>{data.company}</td>
                  <td>{data.industry}</td>
                  
                  <Tippy className="font-monospace text-decoration-underline" content={data.email}>
                    <td >{data.email}</td>
                  </Tippy>
                  <td>{data.phone}</td>
                  <td>{data.country}</td>
                  <td>
                    <i className="fa-solid fa-pen-to-square mx-1"></i>
                    <i className="fa-solid fa-trash mx-1" style={{ "cursor": "pointer" }} onClick={() => {handleDelete(data._id)}}></i>
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