import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";


function Navbar(){
return <nav className="nav">
    <h4><Link className="link" to='/'>Home</Link></h4>
    <h4><Link className="link" to='/allCodes'>All Codes</Link></h4>
    <h4><Link className="link" to='/create'>Create Questionnaires</Link></h4>
    <h4><Link className="link" to='/code'>Code</Link></h4>
</nav>
}


export default Navbar;