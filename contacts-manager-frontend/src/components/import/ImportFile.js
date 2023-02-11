import "./importFile.css";
import { useEffect, useState } from "react";

const ImportFile = () => {
  const [file, setFile] = useState(null);
  const [apiData, setApiData] = useState(null);
  console.log(file);
  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fetch("https://contacts-manager-tsfd.onrender.com/api/contacts", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token')
        },
        body: formData
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        setApiData(data);
        window.location.reload();
      })
    }
  }, [file])

  return (
    <div>
      <div className="import-container">

        <div className="drag-zone">
          <p className="font-monospace">Drag & Drop a CSV File to Upload</p>
          <div className="drop-zone">
            <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
          </div>
        </div>
        <div className="import-done container">
          {apiData &&
            <>
              <h2 >Import Complete</h2>
              <p className="font-monospace">CSV File is Uploaded</p>
            </>}
        </div>
      </div>
      {/* <div className="cancel-button">
        <button>Cancel</button>
      </div> */}
    </div>
  );
};

export default ImportFile;
