import React from "react";
import '../styles/Home.css'




//import {Redirect} from "react-router-dom";
export default function Home() {
  const user  = JSON.parse(localStorage.getItem("user")) 
  console.log("user---home.js-->", user)
  const prenomLocal = user.results.results[0].prenom;
  const nomLocal = user.results.results[0].nom;
  const id = user.results.results[0].iduser;
    const [post, setPost] = React.useState("");
    const [photo, setPhoto] = React.useState("");
    console.log(id)
    const postSubmit = (event) => {
      console.log(`
           commentaire:${post}, 
           image:${photo},
           iduser:${id}
         

      `);
     
      event.preventDefault();
   //*******************************************ENVOIE POST des commentaires TABLE post mysql */
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         commentaire: post,
         iduser:id
       
        }),
      };
      fetch("http://localhost:3000/api/post", requestOptions)
        .then((response) => {
          console.log(response.json());
          if (response.ok) {
            window.location.reload(false);
          }
        })
        .catch((error) => console.log(error));
  
    }
/********************************récupération commentaires TABLE post mysql************************************************************** */

const token = user.token;
console.log("token---homeJS-->", token)
    fetch(`http://localhost:3000/api/get/commentaire`, 
    {
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then ((res) => res.json())  
    .then ((data) => {
   
        console.log("data----commentaire-->", data)
      
        
        addBddpost(data);
    })
  
    function addBddpost(data){ 
      
      let structurePost = [];       
      const userPostBdd = document.getElementById("postBdd");
      for(var k = 0; k < data.length; k++)
      structurePost = structurePost +`
      <div class="container_post">
      <div class="structureNom">${data[k].prenom} ${data[k].nom} </div>
      <div>
        <div class="structurePost">${data[k].commentaire}</div>
        <div>Commentaires / Like / Dislike </div>
        </div>
        <button class="btnModif1">Modifier</button>
      </div>
      `;
      if(k === data.length){
        userPostBdd.innerHTML = structurePost;
      }
        }

        
      
    return (
      <div className="container_home">
        <div className="pos-form1">
          <form className="formulaire1" onSubmit={postSubmit}>
      
            <label className="labelHome"> Hey ! 
            
              <textarea
              id="post"
              placeholder="Quoi de neuf ?"
              name="nom"
              type="text"
              onChange={e => setPost(e.target.value)}
              required  img id="output" src=""/>      
            
            </label> 
            
            <input type="file" accept="image/*"  onChange={e =>setPhoto (e.target.value)}/>
            <button className="btnPublier">Publier</button>
         

          </form>
        </div> 
        
      <div>
        <div id="nom"></div>
        <div id="postBdd"></div>
        </div>
        </div>
       
       )
  
 }
