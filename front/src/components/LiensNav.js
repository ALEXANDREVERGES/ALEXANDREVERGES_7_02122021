import React, {useEffect, useState} from "react";
import{ Link } from "react-router-dom";

function LiensNav(){
    const data  = JSON.parse(localStorage.getItem("user")) 
    const [liens, setLiens] = useState([]);
    const id = data.results.results[0].iduser;
   
 
    const bdd = {
     method: "GET",
     headers: { "Content-Type": "application/json" },
     
   };
   useEffect(()=> {
        fetch(`http://localhost:3000/auth/get/${id}`, bdd)
        .then ((res) => res.json())  
        .then ((data) => {
   
        
        setLiens(data);
    }).catch((error) => console.log(error));
   }, []);
      
 
   
 console.log("liens", liens)
    const logoutHandler = async () => {
        localStorage.clear();
        alert('Vous venez de vous déconnecter ! A bientôt !!')
        window.location.href = "/";
      };

return(
    <div>
        {
            liens.map((item)=>(
        <div className="container-nav">
            <div className="nav">
            <Link to="/home" className="title">Groupomania </Link>
            <Link to="/profil" id="userBdd">{item.prenom} {item.nom}</Link>
            <div className="container_nav">
            <Link to="/home" className="navBtn" title="Acceuil"><i class="fas fa-home"></i></Link>
            <Link to="/profil" className="navBtn" title="profil"><i class="far fa-id-badge"></i></Link>
            <div className="navBtn" onClick={logoutHandler} title="déconnexion"><i class="fas fa-sign-out-alt"></i></div>
            
            </div>

        </div>
        </div>
            ))
        }
        
    </div>
)
}




export default LiensNav;