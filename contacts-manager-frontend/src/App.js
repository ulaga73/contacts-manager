import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import ImportFile from "./components/import/ImportFile";
import DeleteFile from "./components/delete/DeleteFile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Login/><Signup/></>} />
          <Route path='/action' element={<NavBar/>} />
          <Route path='/import' element={<ImportFile/>} />
          <Route path='/delete' element={<DeleteFile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
