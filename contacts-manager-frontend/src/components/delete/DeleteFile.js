import { useState } from "react";
import "./deleteFile.css";

const DeleteFile = (props) => {
    // let navigate=useNavigate()
    const [status, setStatus] = useState(false);
    async function handleClick(){
        if(props.value.length){
            const response = await fetch("http://localhost:5000/api/contacts", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({delId: props.value})
            })
            const result = await response.json();
            setStatus(result.status);
        }
    }

   
    return(
        <div className="delete-container card">
            <div className="text-contain">
                <p style={{fontWeight:700}}>Delete Contacts</p>
                <p className="font-monospace">Sure you want delete this Contacts?</p>
            </div>
            <div className="btn-contain">
               <button onClick={() => window.location.reload()} className="btn btn-secondary" >Cancel</button>
                <button  className="btn btn-warning" onClick={handleClick}>Ok</button>
            </div>
            <div className="delete-done">
                {
                    status && <><h2>Deleted Contacts</h2>
                    {window.location.reload()}
                    </>
                }
            </div>
        </div>
    )
}

export default DeleteFile;