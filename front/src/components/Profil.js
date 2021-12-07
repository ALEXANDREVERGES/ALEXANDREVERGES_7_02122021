import React from "react";
import '../styles/Profil.css'

function Profil(){

    const data  = JSON.parse(localStorage.getItem("user")) ;
    const [photo, setPhoto] = React.useState("");
    console.log(photo)
    const photoSubmit = (event) =>{
        event.preventDefault();
        localStorage.setItem("photo", photo);
        
        
    }

   
return(
    <div className="container_profil">
    <form className="profil" >
        <div className="margin_profil">Votre profil</div>
        <label for="avatar">Choisir une photo de profil:</label>
        <input 
        className="btnModif" 
        type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg" onSubmit={photoSubmit} onChange={e => setPhoto(e.target.value)}/>
        <img src="photo" />
           
      

        <div>
            <div className="align">
                <div className="text_underline">Prénom</div>
                <div>: {data[0].prenom}</div>
            </div>
            <div className="align">
                <div className="text_underline">Nom </div>
                <div> : {data[0].nom}</div>
            </div>
            <div className="align">
                <div className="text_underline">Email </div>
                <div>: {data[0].email}</div>
            </div>
        </div>
        <button className="btnModif">Mofifier profil</button>
</form>


</div>
)

}

export default Profil;