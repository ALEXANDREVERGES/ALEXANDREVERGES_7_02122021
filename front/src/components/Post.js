import React from "react";
import axios from "axios";


function Post(){
    const user  = JSON.parse(localStorage.getItem("user")) 
    const token = user.token;
   const nom = user.results.results[0].nom;
   const prenom = user.results.results[0].prenom;
   console.log(nom)
    // const date = new Date().toString();
   
    // console.log("date--->", date)
    var d = new Date();
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date+' '+hours;

    const id = user.results.results[0].iduser;
      const [post, setPost] = React.useState("");
      const [photo, setPhoto] = React.useState("");
    
      const postSubmit = (event) => {
       event.preventDefault();
      
         const obj = {
        commentaire: post,
        iduser:id,
        images:photo,
        nom:nom,
        prenom:prenom,
        time:fullDate
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
       }). catch((error) => console.log(error));
      } 
        
        
     //*******************************************ENVOIE POST des commentaires TABLE post mysql */
     
      
      return(
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
          <form method="POST" action="/images" enctype="multipart/form-data">    
          <input type="file" accept="image/*" name="image" onChange={e =>setPhoto (e.target.value)} />
          </form>  
          <button className="btnPublier"><i class="far fa-paper-plane"></i> Publier</button>
        </form>
      </div> 
      )
}




export default Post