import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";
import axios from "axios";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Url to be updated.
      axios.get('http://localhost:5000/api/contacts/fetchallcontacts', {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': '', // Put access token
        }
      })
        .then(response => {
          // handle success
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          // handle error
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {data.map(item => (
          <tr key={item.email}>
            <td>{item.name}</td>
            <td>{item.designation}</td>
            <td>{item.company}</td>
            <td>{item.industry}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.country}</td>
          </tr>
        ))}
      </ul>
    </div>
  );

};

export default Contacts;