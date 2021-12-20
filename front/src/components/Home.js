import React from "react";
import '../styles/Home.css'
import axios from "axios";
import Comments from "./Comments";


//import {Redirect} from "react-router-dom";
export default function Home() {
  
  const user  = JSON.parse(localStorage.getItem("user")) 
  const token = user.token;
 
  
  const id = user.results.results[0].iduser;
    const [post, setPost] = React.useState("");
    const [photo, setPhoto] = React.useState("");
  
    const postSubmit = (event) => {
     
     
      event.preventDefault();
   //*******************************************ENVOIE POST des commentaires TABLE post mysql */
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
            <button className="btnPublier"><i class="far fa-paper-plane"></i> Publier</button>
          </form>
        </div> 

      <div>  
        <Comments />
        <h1>Home</h1>
        </div>
        </div>
       
       )
  
 }