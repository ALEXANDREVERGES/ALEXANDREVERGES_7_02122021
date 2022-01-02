import React from "react";
import '../styles/LogSign.css';
import{ Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//import { toast } from "react-toastify";
//const userRegistered = () => toast.success("Vous êtes bien enregistrés, vous pouvez vous connecter.");

export default function SignUp() {
  let history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [nom, setNom] = React.useState("");
  

  const signupHandler = (event) => {
    const regexName =/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexMail =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    if(regexName.test(prenom) === true){ 
    }else{ 
      
      alert("Veuillez remplir correctement votre prénom") 
    };
    if(regexName.test(nom) === true){ 
    }else{
      alert("Veuillez remplir correctement votre nom") 
    };
    if(regexMail.test(email) === true){ 
    }else{
      alert("Veuillez remplir correctement votre adresse Mail")
    };
    if (
      (regexMail.test(email) === true) &
      (regexName.test(prenom) === true) &
      (regexName.test(nom) === true)  
    ) {
      history.push("/login");

   
    console.log(`
      Email: ${email}
      Password: ${password}
      Prenom: ${prenom}
      Nom: ${nom}
      
    `);
    alert('Vous venez de créer votre compte ! Notez bien votre email et Mot de passe !');
    
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
    fetch("http://localhost:3000/auth/signup", requestOptions)
      .then((response) => {
        console.log(response.json());
        console.log(response)
        if (response.ok) {
      
     // window.location = '/home';
        }
      })
      .catch((error) => console.log(error));
      
  }else{
    alert('Veuillez remplir correctement le formulaire')
  }
}

  return (
      <div className="pos-form">
    <form className="formulaire" onSubmit={signupHandler}>
    <div className="choix">
    <Link to="/signup"  class="sins">S'inscrire</Link>
    <Link to="/login"  class="sec">Se connecter</Link>
  </div>
    <div className="espace-form"> Si vous n'avez pas de compte</div>
      <h1 className="white1">S'inscrire</h1>

      <label>
        <input
        id="prenom"
        placeholder="Prénom"
          name="prenom"
          type="prenom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          required />
      </label>

      <label>
        <input
        id="nom"
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


      <button className="btnSins">S'inscrire</button>
      <div class="white">Vous avez déjà un compte?</div>
     <Link to="/login"  class="white">Se connecter</Link>
    </form>
    </div>
  );
}