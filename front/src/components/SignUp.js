import '../styles/LogSign.css'
import React from 'react';

function SignUp(){
    return (
        <div className="pos-form">
        <div className='formulaire'>
            <div className="espace-form"> Si vous n'avez pas de compte</div>
                <div class="white1">S'inscrire</div>
                <div class="" id="">
                    <input  class="" type="text" placeholder="Nom" id="" name="nom" required /> 
                </div>
                <div class="" id="">
                    <input  class="" type="text" placeholder="Prénom" id="" name="prénom" required /> 
                </div>
                <div class="" id="">
                    <input  class="" type="text" placeholder="Email" id="" name="Email" required /> 
                </div>
                <div class="" id="">
                    <input  class="" type="password" placeholder="Votre Mot de passe" id="" name="password" required /> 
                </div>
                <div><button>S'inscrire</button></div>    
            </div>
            </div>
    )

}

export default SignUp