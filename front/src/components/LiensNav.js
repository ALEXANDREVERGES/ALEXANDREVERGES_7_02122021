import React, {useEffect, useState} from "react";
import{ Link } from "react-router-dom";
import '../styles/LiensNav.css'
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

      /****************************DATE HEURE*******************************************/
       function pause(ms) 
       {
         return new Promise(resolve => setTimeout(resolve, ms));
       }
      
       async function afficherDate() 
       {
         while(true) 
         {
           await pause(1000);
           var cejour = new Date();
           var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
           var date = cejour.toLocaleDateString("fr-FR", options);
           var heure = ("0" + cejour.getHours()).slice(-2) + ":" + ("0" + cejour.getMinutes()).slice(-2) + ":" + ("0" + cejour.getSeconds()).slice(-2);
           var dateheure = date + " " + heure;
           var dateheure = dateheure.replace(/(^\w{1})|(\s+\w{1})/g, lettre => lettre.toUpperCase());
           document.getElementById('dateheure').innerHTML = dateheure;
         }
       }
       afficherDate();
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
            <span className="spandate" id="dateheure"></span>  

        </div>
        </div>
            ))
        }
        
    </div>
)
}




export default LiensNav;