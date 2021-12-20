import React, { useEffect, useState } from "react";
import CardComments from "./CardComments";



function Comments() {
const [commentaires, setCommentaires] = useState([]);
const [showComments, setShowComments] = useState(false);
//const [delete, setDelete] = useState(false);
//var commentaire;
//const commentaire=[];
const user  = JSON.parse(localStorage.getItem("user")) 
const token = user.token;
useEffect(() => {
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
    // console.log("data", data) 
     setCommentaires(data);
     
    }
    
  }).catch((error) => console.log(error));
 
}, [])
   
    

//console.log("commentaires----->", commentaires)
//console.log(commentaires, typeof(commentaires))


    return(
    <div>
{
  commentaires.map((item)=>(
    <div class="container_post">
      <div class="structureNom">{item.prenom} {item.nom}</div>
      <div class="container_structure_post">
        <div class="structurePost">{item.commentaire}</div>
        <img class="img_post" src="{item.images}"/>
        <div class="choice">
          <div className="cardCom">
            <div onClick={()=> setShowComments(!showComments)}><i class="far fa-comment"></i></div>
            {showComments && <CardComments/>}
          </div>
          <div><i class="far fa-thumbs-up"></i></div>
          <div><i class="far fa-thumbs-down"></i></div>   
        </div>
      </div>
      <div className="cardCom">
        <button  class="btnModif1"><i class="fas fa-pen"></i></button>
        <button  class="btnModif1"><i class="fa-regular fa-trash-can"></i></button> 
      </div>
    </div>
  ))}
</div>
)

} 

export default Comments;
