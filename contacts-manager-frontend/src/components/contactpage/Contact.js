import React, { useEffect, useState } from 'react';
// import Contacts from './contactpage/Contact'
import ImportNavBar from '../navigation/ImportNavBar';
import Search from '../search/Search';


const Contact = () => {
  //State Variables
  const [apiData, setApiData] = useState("");
  const [deleteData, setDeleteData] = useState([]); 
  const [select, setSelect] = useState(false);

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
    })
  }, [])
  //Server Response
  const data = apiData.result;
  console.log(deleteData);

  // To select individual checkbox
  function handleCheck(e){
    console.log(e.target.checked);
    if(e.target.checked) {
      setDeleteData([...deleteData, e.target.id]);
    }else{
      setDeleteData(deleteData.filter(val => val !== e.target.id))
    }
  }

  // To Select All checkboxes
  function handleCheckAll(e){
    setSelect(!select);
    if(e.target.checked){
      const valObj = apiData.result;
      let arr = [];
      for(let i = 0; i < valObj.length; i++){
        const valId = valObj[i]._id;
        arr.push(valId);
      }
      setDeleteData([...deleteData, ...arr]);
    }else{
      setDeleteData([]);
    }
  }
  // JSX
  return (
    <div className='contacts-container'>
      <Search/>
      <ImportNavBar value={deleteData} />
      <table className="table table-info">
        <thead>
          <tr>
            <th><input type="checkbox" name='del' onChange={handleCheckAll} /></th>
            <th>Name</th>
            <th>Designation</th>
            <th>Company</th>
            <th>Industry</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* To Render Server Response */}
          {
            data?.map((data, index) => {
              return(
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
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.country}</td>
                  <td>
                  <i class="fa-solid fa-pen-to-square mx-1"></i>
                  <i class="fa-solid fa-trash mx-1" style={{"cursor":"pointer"}}></i>
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