

import React from "react";
import '../styles/Nav.css'
import{ Link } from "react-router-dom";


function Nav() {
  //  console.log("result-nav.js->", result)
   const data  = JSON.parse(localStorage.getItem("user")) 
   
   const id = data.results.results[0].iduser;
  

   const bdd = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    
  };
  fetch(`http://localhost:3000/auth/get/${id}`, bdd)
   .then ((res) => res.json())  
   .then ((data) => {
  
       console.log("data--->", data)
       console.log("data-password-->", data[0].password)
       
       addBdd(data);
   })

   function addBdd(data){        
 const userBdd = document.getElementById("userBdd");
 userBdd.innerHTML = `
 <Link to="/profil" id="userBdd" className="title"> ${data[0].prenom} ${data[0].nom}</Link>
 `;
   }

   const logoutHandler = async () => {
    localStorage.clear();
    alert('Vous venez de vous déconnecter ! A bientôt !!')
    window.location.href = "/";
  };
 

    return (
        <div className="container-nav">
        <div className="nav">
            <Link to="/home" className="title">Groupomania </Link>
            <Link to="/profil" id="userBdd"></Link>
            <div className="container_nav">
            <Link to="/home" className="navBtn" >Acceuil</Link>
            <Link to="/profil" className="navBtn">Profil</Link>
            <div className="navBtn" onClick={logoutHandler}>Déconnexion</div>
            
            </div>

        </div>
        </div>
    )
}
export default Nav