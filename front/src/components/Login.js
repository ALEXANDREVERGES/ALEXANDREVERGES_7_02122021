import '../styles/LogSign.css';
import React from 'react';
import{ Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
   
  
    const handleSubmit = (event) => {
      console.log(`
        Email: ${email}
        Password: ${password}
       
      `);
      
      event.preventDefault();
    }
  
    return (
        <div className="pos-form">
      <form className="formulaire" onSubmit={handleSubmit}>
      <div className="espace-form"> Si vous n'avez pas de compte</div>
        <h1 className="white1">S'inscrire</h1>
        <label>
          <input
          placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required />
        </label>
        
        <label>
          <input
          placeholder="Votre Mot de passe"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required />
        </label>
  
  
        <button>Connexion</button>
        <div class="white">Vous n'avez pas de compte?</div>
       <Link to="/signup"  class="white">S'inscrire</Link>
      </form>
      </div>
    );
  }