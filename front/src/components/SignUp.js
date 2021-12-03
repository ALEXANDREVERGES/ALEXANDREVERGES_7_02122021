import React from "react";
import '../styles/LogSign.css';
import{ Link } from "react-router-dom";


export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [nom, setNom] = React.useState("");

  const handleSubmit = (event) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Prenom: ${prenom}
      Nom: ${nom}
    `);
    
    event.preventDefault();
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
      }),
    };
    fetch("http://localhost:4200/api/auth/signup", requestOptions)
      .then((response) => {
        console.log(response.json());
        if (response.ok) {
      window.location = '/home';
        }
      })
      .catch((error) => console.log(error));

  }

  return (
      <div className="pos-form">
    <form className="formulaire" onSubmit={handleSubmit}>
    <div className="espace-form"> Si vous n'avez pas de compte</div>
      <h1 className="white1">S'inscrire</h1>

      <label>
        <input
        placeholder="Prénom"
          name="prenom"
          type="prenom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          required />
      </label>

      <label>
        <input
        placeholder="Nom"
          name="nom"
          type="nom"
          onChange={e => setNom(e.target.value)}
          required />     
      </label>
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


      <button>S'inscrire</button>
      <div class="white">Vous avez déjà un compte?</div>
     <Link to="/login"  class="white">Se connecter</Link>
    </form>
    </div>
  );
}


