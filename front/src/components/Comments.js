import React, { useEffect, useState } from "react";

function Comments() {
//const [commentaires, setCommentaires] = useState();
const commentaire = [];
const user  = JSON.parse(localStorage.getItem("user")) 
const token = user.token;
useEffect(()=> {
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
        
        commentaire.push(data);
        console.log("commentaire----->", commentaire)
      }
      
    }).catch((error) => console.log(error));
   
    
});

    return(
    <div>
        {commentaire.map((comment) => (
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
        ))}
        
   
</div>
)

} 

export default Comments;
