import "./deleteFile.css";

const DeleteFile = () => {
    return(
        <div className="delete-container">
            <div className="text-contain">
                <p >Delete Contacts</p>
                <p>Sure you want delete this contacts?</p>
            </div>
            <div className="btn-contain">
                <button>Cancel</button>
                <button>Ok</button>
            </div>
        </div>
    )
}

export default DeleteFile;