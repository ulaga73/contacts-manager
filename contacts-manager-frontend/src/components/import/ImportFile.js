import "./importFile.css";
import { useEffect, useState } from "react";

const ImportFile = () => {
    const [file, setFile] = useState(null);
    const [apiData, setApiData] = useState(null);
    console.log(file);
    useEffect(() => {
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            fetch("http://localhost:5000/api/contacts", {
                method: "POST",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMjhhOTcwNzBjNTJmMGE5MmFkOGFlIn0sImlhdCI6MTY3NTc5MDk5OX0.PxqlvzBcHiUkeyf5w3sRal2y9WUm9pgRbYrYPsLbOKI"
                },
                body: formData
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                setApiData(data);
            })
        }
    }, [file])

    return(
        <div className="import-container">
            <div>
                <p style={{fontWeight: 700, marginTop: 5}}>Import File</p>
            </div>
            <div className="drag-zone">
                <p>Drag & Drop a CSV File to Upload</p>
                <div className="drop-zone">
                    <input type="file" onChange={(e) => {setFile(e.target.files[0])}} />
                </div>
            </div>
            <div className="cancel-button">
                <button>Cancel</button>
            </div>

            <div className="import-done">
                {apiData && 
                <>
                <h2>Import Complete</h2>
                <p>CSV File is Uploaded</p>
                </>}
            </div>
        </div>
    )
}

export default ImportFile;