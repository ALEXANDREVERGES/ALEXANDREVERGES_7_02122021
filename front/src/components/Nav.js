import React, { useReducer } from "react";
import '../styles/Nav.css'
import{ Link } from "react-router-dom";

function Nav() {
    const data  = JSON.parse(localStorage.getItem("user")) 
    console.log(data.results.results[0].prenom)
   console.log(data.results.prenom)
    return (
        <div className="container-nav">
        <div className="nav">
            <Link to="/home" className="title">Groupomania </Link>
            <Link to="/profil" className="title">{data.results.results[0].prenom} {data.results.results[0].nom}</Link>

        </div>
        </div>
    )
}
export default Nav