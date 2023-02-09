
import React from 'react';
import Contacts from './contactpage/Contact'
import ImportNavBar from './navigation/ImportNavBar';
import Search from './search/Search';
const Home = () => {

  return (

    <div className='contacts-container '> 
    <Search/>
      <ImportNavBar />
      <Contacts />


   
    </div>

  )
}

export default Home
