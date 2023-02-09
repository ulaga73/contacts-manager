import { Link } from "react-router-dom";
import ImportFile from "../import/ImportFile";


const ImportNavBar = (props) => {
    function handleClick(){
        if(props.value.length){
            fetch("http://localhost:5000/api/contacts", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({delId: props.value})
            })
        }
    }
    return (
        <div className="container d-flex justify-content-between my-2">

            <div>
                <button type="button" className="btn btn-secondary btn-sm mx-1 my-1">Seclect Date</button>

                
                <button type="button" className="btn btn-secondary btn-sm mx-1 my-1">Filter</button>
            </div>


            <div>
                <Link to={"/delete"}><button type="button" className="btn btn-primary  mx-1 btn-sm my-1" onClick={handleClick}>Delete</button></Link>


                <button type="button" className="btn btn-primary btn-sm mx-1 my-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Import
                </button>




                <button type="button" className="btn btn-primary  btn-sm my-1 mx-1">Export</button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Import File</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body container">
                                <ImportFile />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default ImportNavBar;

