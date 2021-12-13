import React from "react";
import '../styles/Profil.css'
import { useHistory } from "react-router-dom";

function Profil(){

    const data  = JSON.parse(localStorage.getItem("user")) ;
    const [photo, setPhoto] = React.useState("");
    //  console.log("result-nav.js->", result)
  
   
   const id = data.results.results[0].iduser;
  

   const bdd = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    
  };
  fetch(`http://localhost:3000/auth/get/${id}`, bdd)
   .then ((res) => res.json())  
   .then ((data) => {
    addBdd1(data);
   })
   function addBdd1(data){        
    const userBdd1 = document.getElementById("prenom");
    userBdd1.innerHTML = `
     
    <div className="align">
    <div id="prenom" className="text_underline">Prénom: ${data[0].prenom} </div>  
    </div>
    `;
    const userBdd2 = document.getElementById("nom");
    userBdd2.innerHTML = `
     
    <div className="align">
    <div id="prenom" className="text_underline">Prénom: ${data[0].nom} </div>  
    </div>
    `;
    const userBdd3 = document.getElementById("email");
    userBdd3.innerHTML = `
     
    <div className="align">
    <div id="prenom" className="text_underline">Prénom: ${data[0].email} </div>  
    </div>
    `;
      }


    const photoSubmit = (event) => {
        event.preventDefault();
    }
    let history = useHistory();
return(
<div className="container_profil">
    <form className="profil" >
        <div className="container_desc">
            <div className="container_photo">
                <div className="container_img">
                <img src=""></img>
                </div>
            </div>
            <div className="container_info">
                
                <div className="align">
                    <div id="prenom" className="text_underline"></div>
                    
                </div>
                <div className="align">
                    <div id="nom" className="text_underline"></div>
                    
                </div>
                <div className="align">
                    <div id="email" className="text_underline"></div>
                    
                </div>
                
            </div>
        </div>
            <button className="btnModif" onClick={()=> {history.push('/modification');}}>Mofifier profil</button>
    </form>


</div>
)

}

export default Profil;