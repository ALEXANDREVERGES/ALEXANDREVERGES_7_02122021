import '../styles/LogSign.css';
import React from 'react';
import{ Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Login() {

  let history = useHistory();
 
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
      fetch("http://localhost:3000/auth/login", Options)
          .then(response => response.json())
          .then(function(res) {
            if(res.token && res.results){
              localStorage.setItem("user", JSON.stringify(res));
              console.log("res---->" ,res )
              console.log("res.token--->",res.token)
              history.push("/home");
            } else{
          alert('Mauvais email ou mot de passe !')   
          history.push("/login");
        }     
            })
          
          }
    return (
        <div className="pos-form">
      <form className="formulaire" onSubmit={loginSubmit}>
      <div className="choix">
    <Link to="/signup"  class="sins1">S'inscrire</Link>
    <Link to="/login"  class="sec1">Se connecter</Link>
  </div>
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
  
  
        <button className="btnSins" /*</form>onClick={()=> {//history.push('/home');}}*/>Connexion</button>
        <div class="white">Vous n'avez pas de compte?</div>
       <Link to="/signup"  class="white">S'inscrire</Link>
      </form>
      </div>
    );
  }