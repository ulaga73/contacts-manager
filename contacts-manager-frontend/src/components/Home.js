
import React, { useEffect, useState } from 'react';
import "../styles/Home.css";
// import Contacts from './contactpage/Contact'
import ImportNavBar from "./navigation/ImportNavBar"
import Search from './search/Search';

const Home = () => {
  const [apiData, setApiData] = useState("");
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
  const data = apiData.result;

  const handleDataFromChild = (data) => {
    // Do something with the data passed back from the child
   
      // update data
    console.log("home callback function called")
    console.log(data)
    //setApiData(data)
  }

  return (
    <div>
      <Search contacts={data} onDataFromChild={handleDataFromChild}/>
      
      <div className='contacts-container'>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
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
            {
              data?.map((data, index) => {
                return(
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td>{data.name}</td>
                    <td>{data.designation}</td>
                    <td>{data.company}</td>
                    <td>{data.industry}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.country}</td>
                    <td>action</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div>
        <ImportNavBar/>
        {/* <Contacts/> */}
      </div>
    </div>
  )
}

export default Home
