import React from "react";
import '../styles/Profil.css'
import { useHistory } from "react-router-dom";

function Profil(){

    const data  = JSON.parse(localStorage.getItem("user")) ;
    const [photo, setPhoto] = React.useState("");
    
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
                    <div className="text_underline">Prénom: {data.results.results[0].prenom}</div>
                    
                </div>
                <div className="align">
                    <div className="text_underline">Nom: {data.results.results[0].nom} </div>
                    
                </div>
                <div className="align">
                    <div className="text_underline">Email: {data.results.results[0].email}</div>
                    
                </div>
                
            </div>
        </div>
            <button className="btnModif" onClick={()=> {history.push('/modification');}}>Mofifier profil</button>
    </form>


</div>
)

}

export default Profil;