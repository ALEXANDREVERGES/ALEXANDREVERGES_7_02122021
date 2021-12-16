

import React from "react";
import '../styles/Nav.css'
import{ Link } from "react-router-dom";


function Nav() {
 
   const data  = JSON.parse(localStorage.getItem("user")) 
   
   const id = data.results.results[0].iduser;
  

   const bdd = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    
  };
  fetch(`http://localhost:3000/auth/get/${id}`, bdd)
   .then ((res) => res.json())  
   .then ((data) => {
  
       
     
       
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
            <Link to="/home" className="navBtn" title="Acceuil"><i class="fas fa-home"></i></Link>
            <Link to="/profil" className="navBtn" title="profil"><i class="far fa-id-badge"></i></Link>
            <div className="navBtn" onClick={logoutHandler} title="déconnexion"><i class="fas fa-sign-out-alt"></i></div>
            
            </div>

        </div>
        </div>
    )
}
export default Nav