import React, { useEffect, useState } from 'react';


const Contact = () => {
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
  return (
    <div>
      
      <table className="table table-primary table-striped">
        <thead className="table-primary">
          <tr className="table-primary">
            <th className="table-primary"><th><input type="checkbox" name='del' /></th></th>
            <th className="table-primary">Name</th>
            <th className="table-primary">Designation</th>
            <th className="table-primary">Company</th>
            <th className="table-primary">Industry</th>
            <th className="table-primary">Email</th>
            <th className="table-primary">Phone number</th>
            <th className="table-primary">Country</th>
            <th className="table-primary">Action</th>
          </tr>
        </thead>
        <tbody className="table-primary">
          {
            data?.map((data, index) => {
              return (
                <tr key={index} className="table-primary">
                  <td><input type="checkbox" /></td>
                  <td className="table-primary">{data.name}</td>
                  <td className="table-primary">{data.designation}</td>
                  <td className="table-primary">{data.company}</td>
                  <td className="table-primary">{data.industry}</td>
                  <td className="table-primary">{data.email}</td>
                  <td className="table-primary">{data.phone}</td>
                  <td className="table-primary">{data.country}</td>
                  <td className="table-primary">
                    <i className="fa-regular fa-pen-to-square mx-1"></i>
                    <i className="fa-solid fa-trash mx-1" style={{"cursor": "pointer"}}></i></td>
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