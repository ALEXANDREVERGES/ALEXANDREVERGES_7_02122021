import React, { useEffect, useState } from "react";
import CardComments from "./CardComments";
import "../styles/CardComments.css"


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
  // console.log("commentaires--->", commentaires)
}, [])





//*****************BOUTON SUPPRIMER POST ******************/
let btnDeleteCom = document.getElementsByClassName('btnDeleteCom');
// console.log("btnDeleteCom", btnDeleteCom)
for(let l = 0; l < btnDeleteCom.length; l++){
  btnDeleteCom[l].addEventListener("click",(event) =>{
    event.preventDefault();
    let id = commentaires[l].id;
  //  const user  = JSON.parse(localStorage.getItem("user")) 
    
   
    const iduser= user.iduser;
    const idcom = commentaires[l].iduser;
    
    // console.log("iduser",iduser)
    // console.log("idcom",idcom)
    const delpost = {
      method: "DELETE",
     headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${token}`}
    }
  if(iduser === idcom){
    fetch(`http://localhost:3000/api/delete/${id}`,delpost, 
  )
   .then((res) => {
    //  console.log("res", res)
     window.location="/home"
   }) .catch((error) => console.log(error));

   } else {
     alert("Ce n'est pas votre publication ! Vous ne pouvez pas la supprimer")
   }
  

  })
}
//console.log("commentaires----->", commentaires)
//console.log(commentaires, typeof(commentaires))
    return(
    <div>
{
  commentaires.map((item)=>(
    <div className="container_post">
      <div className="structureNom">{item.prenom} {item.nom}</div>
      <div className="container_structure_post">
        <div className="structurePost">{item.commentaire}</div>
        <img className="img_post" src="{item.images}"/>
        <div className="choice">
          <div className="cardCom">
            <div className="btnCom" onClick={()=> setShowComments(!showComments)}><i class="far fa-comment"></i></div>
            {showComments && <CardComments/>}
          </div>
          <div><i className="far fa-thumbs-up"></i></div>
          <div><i className="far fa-thumbs-down"></i></div>   
        </div>
      </div>
      <div className="cardCom">
        <button  className="btnModif1"><i class="fas fa-pen"></i> - Modifier</button>
        <button  className="btnDeleteCom">Delete</button>
      </div>
    </div>
  ))}
</div>
)

} 

export default Comments;
