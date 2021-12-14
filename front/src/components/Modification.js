import React from 'react';
import { useHistory } from "react-router-dom";

function Modification(){

    const data  = JSON.parse(localStorage.getItem("user")) ;
    const id = data.results.results[0].iduser;
    console.log("data---->",id)
   
    const [email1, setEmail1] = React.useState("");
    const [prenom1, setPrenom1] = React.useState("");
    const [nom1, setNom1] = React.useState("");
    

    let history = useHistory();
    const photoSubmit = (event) => {
      
      history.push('/profil');
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
       ) 
       {
        event.preventDefault();
        const formModify = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              iduser:id,
              nom: nom1,
              prenom: prenom1,
              email: email1,
              
            })
          };
         
          fetch(`http://localhost:3000/auth/modification/${id}`, formModify)
          
            .then((res) => {
            //  console.log("formModify--->",formModify.body)
           //   console.log("res--->" , res)
           //    localStorage.setItem("user", JSON.stringify(formModify.body));
          //    window.location.reload();
              
            })
            .catch((error) => console.log(error));
            
        }else{
          alert('Veuillez remplir correctement le formulaire')
        }
    
    }
    
    
return(
<div className="container_profil">
    <form className="profil1" onSubmit={photoSubmit} >
        <div className="container_desc1">
               
               
        
            <div className="container_info1">
            <div className='white'>Veuillez remplir tous les champs pour la mofification</div>
                <div className="align">
                    <label></label>
                    <input className="text_underline2" placeholder="Prenom" onChange={e => setPrenom1(e.target.value)} />
                    
                </div>
                <div className="align">
                    <label></label>
                    <input className="text_underline2" placeholder= "Nom" onChange={e => setNom1(e.target.value)} />
                    
                </div>
                <div className="align">
                    <label></label>
                    <input className="text_underline2" placeholder= "Email" onChange={e => setEmail1(e.target.value)} />
                    
                </div> 
               
                    
            </div>
        </div>
            <button className="btnModif" >Valider</button>
    </form>


</div>
)

}
export default Modification;