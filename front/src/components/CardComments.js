import React, { useEffect, useState } from "react";
import '../styles/CardComments.css'

function CardComments(){
    const user  = JSON.parse(localStorage.getItem("user")) 
    const token = user.token;
const commentairePost = JSON.parse(localStorage.getItem("com"));
console.log("commentairePost", commentairePost)
const idpost  = JSON.parse(localStorage.getItem("idcs")); 

  const [postCommentaires, setPostCommentaires] = useState([]);

//console.log("token--->",token)

useEffect(() => {
  fetch(`http://localhost:3000/api/get/post/com/${idpost}`, 
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
     setPostCommentaires(data);
    
    }
    
  }).catch((error) => console.log(error));
  // console.log("commentaires--->", commentaires)
}, []) 
//console.log("setPostCommentaires", setPostCommentaires)
console.log("postCommentaires", postCommentaires)

//*****************BOUTON SUPPRIMER CCOMMENTAIRE POST ******************/
function deleteComPost(){
  let btnDeleteComPost = document.getElementsByClassName('btnDeleteComPost');
 console.log("btnDeleteComPost", btnDeleteComPost)
for(let s = 0; s < btnDeleteComPost.length; s++){
  btnDeleteComPost[s].addEventListener("click",(event) =>{
    event.preventDefault();
    let id = postCommentaires[s].id ;
  //  const user  = JSON.parse(localStorage.getItem("user")) 
    
   
    const iduser= user.iduser;
    const idcom = postCommentaires[s].iduser;
    
    // console.log("iduser",iduser)
    // console.log("idcom",idcom)
    const delCompost = {
      method: "DELETE",
     headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${token}`}
    }
  if(iduser === idcom){
    fetch(`http://localhost:3000/api/delete/compost/${id}`,delCompost)
   .then((res) => {
     
    //  console.log("res", res)
     window.location="/commentaires"
   }) .catch((error) => console.log(error));

   } else {
     
     alert("Ce n'est pas votre publication ! Vous ne pouvez pas la supprimer")
   }
  

  })
}
}
console.log("commentairePost[0].images.data", commentairePost[0].images)
var maDate = new Date 
var now = maDate.toUTCString();
    return(
        <div className="container_cardCom">
          {
            postCommentaires.map((items)=>(
          <div className="cardCom1">
            <div className="container_cardCom1">
              <div>{items.prenom}:</div>
              <div className="dateheureucom">{now}</div>
            </div>          
            <div>{items.commentaires}</div>
            <button onClick={deleteComPost} id="btnDeleteComPost" className="btnDeleteComPost">Supprimer</button>

          </div>
    ))
          }
        </div>
      
       
    )
}


export default CardComments;