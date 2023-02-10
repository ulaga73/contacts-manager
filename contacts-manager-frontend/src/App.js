import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';


function App() {
 
  return (
    <div className='.bg-info.bg-gradient'>

      <BrowserRouter>
        <Navbar />

        <div className='container '>
          <Routes>
          {/* {localStorage.getItem('token') ? (
              <>
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/about' element={<About />} />
              </>
            ) : (
              <>
                <Route exact path='/' element={<Login onLogin={handleLogin} />} />
                <Route exact path='/signup' element={<Signup />} />
              </>
            )} */}
            
             <Route exact path='/home' element={<Home />}  />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} /> 
          </Routes> 
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
