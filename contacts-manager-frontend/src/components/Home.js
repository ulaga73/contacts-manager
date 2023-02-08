import React from 'react'
import Contacts from './contactpage/Contact'
import ImportNavBar from "./navigation/ImportNavBar"
import Search from './Search'
const Home = () => {
  return (
    <div>
      <Search/>
      <ImportNavBar/>
      <Contacts/>
    </div>
  )
}

export default Home
