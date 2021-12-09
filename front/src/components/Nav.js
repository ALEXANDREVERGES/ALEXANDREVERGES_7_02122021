import React from "react";
import '../styles/Nav.css'
import{ Link } from "react-router-dom";

function Nav() {
   // const data  = JSON.parse(localStorage.getItem("user")) 
    return (
        <div className="container-nav">
        <div className="nav">
            <Link to="/home" className="title">Groupomania </Link>
            <Link to="/profil" className="title">profil</Link>

        </div>
        </div>
    )
}
export default Nav