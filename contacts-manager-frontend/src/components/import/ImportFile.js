import "./importFile.css";
import { useEffect, useState } from "react";

const ImportFile = () => {
    const [file, setFile] = useState("");
    console.log(file);
    


    useEffect(() => {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        fetch("http://localhost:8080/api/v1/contacts", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
        })
    }, [file])

    return(
        <div className="import-container">
            <div>
                <p>Import File</p>
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
        </div>
    )
}

export default ImportFile;