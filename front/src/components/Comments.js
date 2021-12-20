import React, { useEffect, useState } from "react";

function Comments() {
const [commentaires, setCommentaires] = useState([]);
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
     console.log("data", data) 
     setCommentaires(data);
     
    }
    
  }).catch((error) => console.log(error));
 
}, [])
   
    

console.log("commentaires----->", commentaires)
console.log(commentaires, typeof(commentaires))


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
      <div><i class="far fa-comment"></i></div>
      <div><i class="far fa-thumbs-up"></i></div>
      <div><i class="far fa-thumbs-down"></i></div>   
     </div>
    </div>
    <button class="btnModif1"><i class="fas fa-pen"></i></button>
  </div>
  ))}
    

        {/* {commentaire.map((comment) => (
            <div class="container_post">
        <div class="structureNom">${comment?.name} ${comment?.prenom}</div>
        <div class="container_structure_post">
          <div class="structurePost">${comment?.commentaire}</div>
          <img class="img_post" src=""/>
          <div class="choice">
          <div><i class="far fa-comment"></i></div>
          <div><i class="far fa-thumbs-up"></i></div>
          <div><i class="far fa-thumbs-down"></i></div>   
         </div>
        </div>
        <button class="btnModif1"><i class="fas fa-pen"></i></button>
      </div>
        ))} */}
        
   
</div>
)

} 

export default Comments;
