import '../styles/LogSign.css';
import React from 'react';
import{ Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
   
  
    const loginSubmit = (event) => {
      console.log(`
        Email: ${email}
        Password: ${password}
       
      `);
      
      event.preventDefault();

      const Options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      };
      fetch("http://localhost:3000/api/auth/login", Options)
          .then(response => response.json())
          .then(function(res) {
                localStorage.setItem("user", JSON.stringify(res));
            })
          .catch((error) => console.log(error));
        }
    return (
        <div className="pos-form">
      <form className="formulaire" onSubmit={loginSubmit}>
      <div className="espace-form"> Si vous avez un compte</div>
        <h1 className="white1">Se connecter</h1>
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