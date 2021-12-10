import React from "react";
import '../styles/Profil.css'

function Profil(){

    const data  = JSON.parse(localStorage.getItem("user")) ;
    const [photo, setPhoto] = React.useState("");
    
    const photoSubmit = (event) => {
        event.preventDefault();

    }

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
                    <div className="text_underline">Prénom:</div>
                    
                </div>
                <div className="align">
                    <div className="text_underline">Nom: </div>
                    
                </div>
                <div className="align">
                    <div className="text_underline">Email: </div>
                    
                </div>
                
            </div>
        </div>
            <button className="btnModif">Mofifier profil</button>
    </form>


</div>
)

}

export default Profil;