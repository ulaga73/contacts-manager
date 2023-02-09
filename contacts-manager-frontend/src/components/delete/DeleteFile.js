import "./deleteFile.css";

const DeleteFile = () => {
    return(
        <div className="delete-container">
            <div className="text-contain">
                <p style={{fontWeight: 700, marginTop: 5}}>Deleted</p>
                <p>The Selected Files are Deleted</p>
            </div>
            {/* <div className="btn-contain">
                <button>Cancel</button>
                <button>Ok</button>
            </div> */}
        </div>
    )
}

export default DeleteFile;