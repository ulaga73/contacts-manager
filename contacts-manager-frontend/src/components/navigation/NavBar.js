import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <div>
            <Link to={"/import"} style={{marginRight:"10px"}}>Import</Link>
            <Link to={"/delete"}>Delete</Link>
        </div>
    )
}

export default NavBar;