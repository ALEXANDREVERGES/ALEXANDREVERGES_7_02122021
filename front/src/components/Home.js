import React from "react";
import '../styles/Home.css'
import axios from "axios";



//import {Redirect} from "react-router-dom";
export default function Home() {
  
  const user  = JSON.parse(localStorage.getItem("user")) 
  
  console.log("user---home.js-->", user)
  
  const id = user.results.results[0].iduser;
    const [post, setPost] = React.useState("");
    const [photo, setPhoto] = React.useState("");
   
    const postSubmit = (event) => {
     
     
      event.preventDefault();
   //*******************************************ENVOIE POST des commentaires TABLE post mysql */
/*

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
         commentaire: post,
         iduser:id,
         images:photo

        }),
      };
      fetch("http://localhost:3000/api/post", requestOptions)
        .then((response) => {
         console.log("response--->", response)
          if (response.ok) {
            window.location.reload(false);
          }
        })
        .catch((error) => console.log(error));
  
    } */

    const params = {
      headers: {  
      'Authorization': `Bearer ${token}`
     }
    };
    const obj = {
      commentaire: post,
      iduser:id,
      images:photo
    };

    axios.post("http://localhost:3000/api/post",obj ,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    })
    .then((res) => {
      console.log("response--->", res);
       if (res.status === 200) {
         
         window.location = "/home"
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
      if (data) {
        console.log(data)
        addBddpost(data);
      }
      
    }).catch((error) => console.log(error));
  
    function addBddpost(data){ 
      
      let structurePost = [];       
      const userPostBdd = document.getElementById("postBdd");
      for(var k = 0; k < data.length; k++)
      structurePost = structurePost +`
      <div class="container_post">
        <div class="structureNom">${data[k].prenom} ${data[k].nom} </div>
        <div class="container_structure_post">
          <div class="structurePost">${data[k].commentaire}</div>
          <img class="img_post" src="data[k].images">
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
              onChange={e => setPost(e.target.value)}/>      
            
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