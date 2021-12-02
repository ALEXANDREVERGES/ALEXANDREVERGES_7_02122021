import '../styles/LogSign.css';
import React from 'react';
//import{ Link } from "react-router-dom";

function Login(){
    return(
        <div class="pos-form">
            
            <div className='formulaire'>
            <div className="espace-form"> Si vous avez un compte</div>
                <div class="white1">Se connecter</div>
                <div class="" id="">
                    <input  class="" type="text" placeholder="Email" id="" name="Email" required /> 
                </div>
                <div class="" id="">
                    <input  class="" type="password" placeholder="Votre Mot de passe" id="" name="password" required /> 
                </div>
                
                <div><button>Connexion</button></div>    
                <div class="white">Vous n'acez pas de compte ?</div>
                <div to="/signup"  class="white">S'inscrire</div>
            </div>
            
        </div>
        
      ) 
}

export default Login