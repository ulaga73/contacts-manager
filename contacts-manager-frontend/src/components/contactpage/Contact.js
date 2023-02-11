import React, { useEffect, useState } from 'react';
import ImportNavBar from '../navigation/ImportNavBar';
import Search from '../search/Search';
// import contact from '../contactpage/contact.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Contact = () => {
  //State Variables
  const [color, setColor] = useState('black');
  const [apiData, setApiData] = useState("");
  const [deleteData, setDeleteData] = useState([]);
  const [select, setSelect] = useState(false);
  // const [hoverIndex, setHoverIndex] = useState(-1);
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
    const response = await fetch("http://localhost:5000/api/contacts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({delId: [id]})
    })

    const res = await response.json();
    if(res.status){
      window.location.reload();
    }
  }

  //****************TOOLTIP********/
  // const handleMouseEnter = index => {
  //   setHoverIndex(index);
  // };

  // const handleMouseLeave = () => {
  //   setHoverIndex(-1);
  // };
  // JSX
  return (
    <div className='contacts-container'>
      <Search contacts={contacts} onRecommendedListSelection={handleRecommendedListSelection} onSearchChange={handleNewSearch} />

      <ImportNavBar value={deleteData} />
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
                  {/* <td  onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>{data.email}{hoverIndex === index && (
                      <span className="tooltip">
                    <span className="tooltiptext" >{data.email}</span>
                      </span>
                  )}
                  </td> */}
                  {/* <td data-bs-toggle="tooltip" data-bs-placement="bottom" title={data.email} hover={{"color":"#2DA5FC"}}>{data.email}</td> */}
                  <Tippy className="font-monospace text-decoration-underline" content={data.email} style={{ color: color }}
                      onMouseEnter={() => setColor('#2DA5FC')}
                      onMouseLeave={() => setColor('black')}>
                    <td >{data.email}</td>
                  </Tippy>
                  <td>{data.phone}</td>
                  <td>{data.country}</td>
                  <td>
                    <i class="fa-solid fa-pen-to-square mx-1"></i>
                    <i class="fa-solid fa-trash mx-1" style={{ "cursor": "pointer" }} onClick={() => {handleDelete(data._id)}}></i>
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