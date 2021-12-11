import React from 'react';
import { useHistory } from "react-router-dom";

function Modification(){

    const data  = JSON.parse(localStorage.getItem("user")) ;
    const [photo1, setPhoto] = React.useState("");
    const [email1, setEmail1] = React.useState("");
    const [prenom1, setPrenom1] = React.useState("");
    const [nom1, setNom1] = React.useState("");
    
    const photoSubmit = (event) => {
        const regexName =/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
        const regexMail =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
        if(regexName.test(prenom1) === true){ 
        }else{ 
          
          alert("Veuillez remplir correctement votre prénom") 
        };
        if(regexName.test(nom1) === true){ 
        }else{
          alert("Veuillez remplir correctement votre nom") 
        };
        if(regexMail.test(email1) === true){ 
        }else{
          alert("Veuillez remplir correctement votre adresse Mail")
        };
        if (
          (regexMail.test(email1) === true) &
          (regexName.test(prenom1) === true) &
          (regexName.test(nom1) === true)  
        ) {
        event.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nom: nom1,
              prenom: prenom1,
              email: email1,
              photo: photo1,
            }),
          };
          fetch("http://localhost:3000/auth/modification", requestOptions)
            .then((response) => {
              console.log(response.json());
              if (response.ok) {
                localStorage.setItem("user", JSON.stringify());
              }
            })
            .catch((error) => console.log(error));
            
        }else{
          alert('Veuillez remplir correctement le formulaire')
        }
    
    }
    let history = useHistory();
   
return(
<div className="container_profil">
    <form className="profil1" onSubmit={photoSubmit} >
        <div className="container_desc1">
               
                <input type="file" id="avatar" name="avatar"accept="image/png, image/jpeg" onChange={e => setPhoto(e.target.value)} />
              
            <div className="container_info1">
                
                <div className="align">
                    <label>Prenom :</label>
                    <input className="text_underline1" placeholder= {data.results.results[0].prenom} onChange={e => setPrenom1(e.target.value)} />
                    
                </div>
                <div className="align">
                    <label>Nom :</label>
                    <input className="text_underline2" placeholder= {data.results.results[0].nom} onChange={e => setNom1(e.target.value)} />
                    
                </div>
                <div className="align">
                    <label>Email :</label>
                    <input className="text_underline2" placeholder= {data.results.results[0].email} onChange={e => setEmail1(e.target.value)} />
                    
                </div>
                
            </div>
        </div>
            <button className="btnModif" onClick={()=> {history.push('/profil');}}>Valider</button>
    </form>


</div>
)

}
export default Modification;