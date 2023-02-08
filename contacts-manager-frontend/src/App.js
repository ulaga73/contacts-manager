
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import ImportFile from "./components/import/ImportFile";
import DeleteFile from "./components/delete/DeleteFile";


function App() {
  return (
    <>
      
        <BrowserRouter>
          <Navbar />
         
          <div className='container'>
            <Routes>
              <Route exact path='/home' element={<Home />}  />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/import' element={<ImportFile />} />
              <Route exact path='/delete' element={<DeleteFile />} />
            </Routes>
          </div>
        </BrowserRouter>
     
    </>
  );
}

export default App;
