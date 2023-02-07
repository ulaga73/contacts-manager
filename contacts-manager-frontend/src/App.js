import DeleteFile from "./components/delete/DeleteFile";
import ImportFile from "./components/import/ImportFile";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./components/navigation/NavBar";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar/>} />
          <Route path="/import" element={<ImportFile/>} />
          <Route path="/delete" element={<DeleteFile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
