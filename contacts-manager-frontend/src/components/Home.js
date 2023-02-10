import React from 'react';
import Contacts from './contactpage/Contact'
import ImportNavBar from './navigation/ImportNavBar';
import Search from './search/Search';
const Home = () => {

    const [contacts, setContacts] = useState([])
    const [allContacts, setAllContacts] = useState([]);
  
  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    fetch("http://localhost:5000/api/contacts", {
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      setContacts(data.result);
      setAllContacts(data.result);
    })
  }, [])

  
  const handleDataFromChild = (data) => {
    // Do something with the data passed back from the child
    // update data
    console.log("home callback function called")
    console.log(data)
    setContacts([data]);
  }
  // if search input has changed but nothing selected, display all contact. 
  const handleNewSearch = () => {
    // reset contacts to all contacts
    setContacts(allContacts);
  }

  return (

    <div className='contacts-container '> 
    {/* <Search/>
      <ImportNavBar /> */}
      <Contacts />
    </div>

  )
}

export default Home;
